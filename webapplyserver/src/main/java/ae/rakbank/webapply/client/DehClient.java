package ae.rakbank.webapply.client;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.helpers.CSRFTokenHelper;
import ae.rakbank.webapply.helpers.FileHelper;
import ae.rakbank.webapply.services.AuthorizationService;
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
import java.util.List;

import static ae.rakbank.webapply.constants.AuthConstants.JWT_TOKEN_KEY;

@Component
@RequiredArgsConstructor
public class DehClient {
    private static final Logger logger = LoggerFactory.getLogger(DehClient.class);

    private final FileHelper fileHelper;
    private final CSRFTokenHelper csrfTokenHelper;
    private final AuthorizationService authorizationService;

    private ObjectNode defaultDatalist = null;
    private JsonNode appConfigJSON = null;

    @PostConstruct
    public void init() {
        appConfigJSON = fileHelper.getAppConfigJSON();
        defaultDatalist = new ObjectMapper().createObjectNode();
        defaultDatalist.setAll((ObjectNode) fileHelper.getDatalistJSON());
    }

    public ResponseEntity<?> invokeApiEndpoint(HttpServletRequest httpRequest, String url, HttpMethod httpMethod,
                                               JsonNode requestBodyJSON, String operationId, MediaType mediaType,
                                               String updatedJwtToken) {

        logger.info(String.format("Invoke API from %s method, Endpoint=[%s], requestBodyJSON:[%s]", operationId, url,
                requestBodyJSON.toString()));

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
            List<String> channelContext = e.getResponseHeaders().get("ChannelContext");

            String errorMessage;
            if (channelContext == null) {
                errorMessage = e.getResponseBodyAsString();
            } else {
                errorMessage = channelContext.get(0);
            }
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, errorMessage, e.getResponseBodyAsString(), e);
            throw new ApiException(error, responseHeaders, HttpStatus.BAD_REQUEST);
        } catch (HttpServerErrorException e) {
            logger.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                    e.getResponseBodyAsString(), e);
            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // ResponseEntity headers is immutable, so create new HttpHeaders object
        HttpHeaders headers = new HttpHeaders();
        headers.addAll(response.getHeaders());
        headers.remove("Content-Length");
        if (!StringUtils.isEmpty(updatedJwtToken)) {
            headers.add(JWT_TOKEN_KEY, updatedJwtToken);
        }

        logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s] Response=[%s]", operationId,
                url, response.getStatusCodeValue(), response.getBody()));

        logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
                operationId, url, response.getStatusCodeValue()));

        csrfTokenHelper.createOrUpdateCsrfToken(httpRequest, headers);

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

        logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", methodName, url));
        logger.info(String.format("Endpoint=[%s], request=%s", url, request.toString()));

        ResponseEntity<JsonNode> response;
        try {

            response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);

        } catch (HttpClientErrorException e) {
            logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                    e.getResponseBodyAsString()), e);
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getResponseBodyAsString(),
                    e.getResponseBodyAsString(), e);
            throw new ApiException(e, error, null, HttpStatus.BAD_REQUEST);
        } catch (HttpServerErrorException e) {
            logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                    e.getResponseBodyAsString()), e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                    e.getResponseBodyAsString(), e);
            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        ObjectNode datalist = (ObjectNode) response.getBody();
        datalist.setAll((ObjectNode) fileHelper.getDatalistJSON());
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
