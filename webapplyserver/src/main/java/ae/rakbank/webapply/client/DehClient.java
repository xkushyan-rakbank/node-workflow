package ae.rakbank.webapply.client;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.CSRFTokenService;
import ae.rakbank.webapply.util.FileUtil;
import ae.rakbank.webapply.services.AuthorizationService;
import ae.rakbank.webapply.util.DehUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import static ae.rakbank.webapply.constants.AuthConstants.JWT_TOKEN_KEY;

@Component
@RequiredArgsConstructor
public class DehClient {
    private static final Logger logger = LoggerFactory.getLogger(DehClient.class);

    private final FileUtil fileUtil;
    private final CSRFTokenService csrfTokenService;
    private final AuthorizationService authorizationService;
    private final DehUtil dehUtil;

    private ObjectNode defaultDatalist = null;
    private JsonNode appConfigJSON = null;

    @PostConstruct
    public void init() {
        appConfigJSON = fileUtil.getAppConfigJSON();
        defaultDatalist = new ObjectMapper().createObjectNode();
        defaultDatalist.setAll((ObjectNode) fileUtil.getDatalistJSON());
    }

    public ResponseEntity<?> invokeApiEndpoint(HttpServletRequest httpRequest, String url, HttpMethod httpMethod,
                                               JsonNode requestBodyJSON, String operationId, MediaType mediaType,
                                               String updatedJwtToken) {
        if (requestBodyJSON != null) {
            logger.info(String.format("Invoke API from %s method, Endpoint=[%s], requestBodyJSON:[%s]", operationId, url,
                    requestBodyJSON.toString()));
        } else {
            logger.info(String.format("Invoke API from %s method, Endpoint=[%s]", operationId, url));
        }

        HttpEntity<JsonNode> request;
        if (StringUtils.isEmpty(updatedJwtToken)) {
            request = getHttpEntityRequest(requestBodyJSON, authorizationService.getAndUpdateContextOauthToken());
        } else {
            request = getHttpEntityRequest(requestBodyJSON, authorizationService.getOauthTokenFromJwt(updatedJwtToken));
        }

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> response;
        try {
            if (MediaType.APPLICATION_JSON.equals(mediaType)) {
                response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);
            } else {
                response = restTemplate.exchange(url, httpMethod, request, Resource.class);
            }
        } catch (HttpClientErrorException e) {
            logger.error(String.format("HttpClientErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpHeaders responseHeaders = e.getResponseHeaders();

            /*List<String> channelContext = e.getResponseHeaders().get("ChannelContext");
            String errorMessage;
            if (channelContext == null) {
                errorMessage = e.getResponseBodyAsString();
            } else {
                errorMessage = channelContext.get(0);
            }*/

            HttpStatus status = HttpStatus.BAD_REQUEST;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(apiError, responseHeaders, status);
        } catch (HttpServerErrorException e) {
            logger.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpHeaders responseHeaders = e.getResponseHeaders();
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(apiError, responseHeaders, status);
        }

        // ResponseEntity headers is immutable, so create new HttpHeaders object
        HttpHeaders headers = new HttpHeaders();
        headers.addAll(response.getHeaders());
        headers.remove(HttpHeaders.CONTENT_LENGTH);

        if (!StringUtils.isEmpty(updatedJwtToken)) {
            headers.add(JWT_TOKEN_KEY, updatedJwtToken);
        }

        logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s] Response=[%s]", operationId,
                url, response.getStatusCodeValue(), response.getBody()));

        csrfTokenService.createOrUpdateCsrfToken(httpRequest, headers);

        return new ResponseEntity<>(response.getBody(), headers, response.getStatusCode());
    }

    public ResponseEntity<JsonNode> getDatalistJSON(String segment) {
        logger.info("Begin getDatalistJSON() method, segment=" + segment);

        if (StringUtils.isEmpty(segment)) {
            logger.info("segment is null, return defaultDatalist");
            return new ResponseEntity<>(defaultDatalist, null, HttpStatus.OK);
        }
        String methodName = "getDatalistJSON()";

        RestTemplate restTemplate = new RestTemplate();

        String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
        JsonNode dehURIs = appConfigJSON.get("DehURIs");
        String url = dehBaseUrl + dehURIs.get("datalistUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
        url = uriComponents.toString();
        HttpHeaders headers = authorizationService.getOAuthHeaders(authorizationService.getAndUpdateContextOauthToken());

        HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);

        logger.info(String.format("Invoke API from %s method, Endpoint=[%s], request=%s", methodName, url, request.toString()));

        ResponseEntity<JsonNode> response;
        try {

            response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);

        } catch (HttpClientErrorException e) {
            logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                    e.getResponseBodyAsString()), e);
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        } catch (HttpServerErrorException e) {
            logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                    e.getResponseBodyAsString()), e);
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        }

        ObjectNode datalist = (ObjectNode) response.getBody();
        datalist.setAll((ObjectNode) fileUtil.getDatalistJSON());
        populateDefaultDatalist(datalist);
        logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s]",
                methodName, url, response.getStatusCodeValue()));

        return new ResponseEntity<>(datalist, null, HttpStatus.OK);
    }

    private void populateDefaultDatalist(JsonNode datalist) {
        if (datalist != null) {
            defaultDatalist.set("countryCode", datalist.get("countryCode"));
        }
        logger.info("defaultDatalist size = " + defaultDatalist.size());
    }

    private HttpEntity<JsonNode> getHttpEntityRequest(JsonNode requestBodyJSON, String oauthAccessToken) {
        HttpHeaders headers = authorizationService.getOAuthHeaders(oauthAccessToken);
        return new HttpEntity<>(requestBodyJSON, headers);
    }
}
