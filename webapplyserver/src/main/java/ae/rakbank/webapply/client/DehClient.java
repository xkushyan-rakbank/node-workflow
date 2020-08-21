package ae.rakbank.webapply.client;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.util.DehUtil;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;

@Slf4j
@Component
@RequiredArgsConstructor
public class DehClient {

    private final FileUtil fileUtil;
    private final AuthorizationService authorizationService;
    private final DehUtil dehUtil;
    private final RestTemplate restTemplate;

    private ObjectNode defaultDatalist = null;
    private JsonNode appConfigJSON = null;


    @PostConstruct
    public void init() {
        appConfigJSON = fileUtil.getAppConfigJSON();
        defaultDatalist = new ObjectMapper().createObjectNode();
        defaultDatalist.setAll((ObjectNode) fileUtil.getDatalistJSON());
    }

    public ResponseEntity<Object> invokeApiEndpoint(String url, HttpMethod httpMethod, JsonNode requestBodyJSON,
                                                    String operationId, MediaType mediaType, String oauthAccessToken) {
        if (requestBodyJSON != null) {
            log.info(String.format(">>Invoke API from %s method, Endpoint=[%s], requestBodyJSON:[%s]",
                    operationId, url, ReflectionToStringBuilder.toString(requestBodyJSON)));
            log.info(String.format(">>>>Invoke API from %s method, Endpoint=[%s], requestBodyJSON:[%s]",
                    operationId, url, ReflectionToStringBuilder.toString(requestBodyJSON.toString())));
        } else {
            log.info(String.format("Invoke API from %s method, Endpoint=[%s]", operationId, url));
        }

        HttpEntity<JsonNode> request;
        if (StringUtils.isEmpty(oauthAccessToken)) {
            request = getHttpEntityRequest(requestBodyJSON, authorizationService.getAndUpdateContextOauthToken());
        } else {
            request = getHttpEntityRequest(requestBodyJSON, oauthAccessToken);
        }

        ResponseEntity<?> response;
        try {
            if (MediaType.APPLICATION_JSON.equals(mediaType)) {
                response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);
            } else {
                response = restTemplate.exchange(url, httpMethod, request, Resource.class);
            }
        } catch (HttpClientErrorException e) {
            log.error(String.format("HttpClientErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpStatus status = e.getStatusCode();
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(apiError, new HttpHeaders(), status);
        } catch (HttpServerErrorException e) {
            log.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(apiError, new HttpHeaders(), status);
        }

        log.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s] Response=[%s]",
                operationId, url, response.getStatusCodeValue(), response.getBody()));

        return new ResponseEntity<>(response.getBody(), new HttpHeaders(), response.getStatusCode());
    }

    public ResponseEntity<JsonNode> getDatalistJSON(String segment) {
        log.info("Begin getDatalistJSON() method, segment=" + segment);

        if (StringUtils.isEmpty(segment)) {
            log.info("segment is null, return defaultDatalist");
            return new ResponseEntity<>(defaultDatalist, null, HttpStatus.OK);
        }
        String methodName = "getDatalistJSON()";

        String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
        JsonNode dehURIs = appConfigJSON.get("DehURIs");
        String url = dehBaseUrl + dehURIs.get("datalistUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
        url = uriComponents.toString();
        HttpHeaders headers = authorizationService.getOAuthHeaders(authorizationService.getAndUpdateContextOauthToken());

        HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);

        log.info(String.format("Invoke API from %s method, Endpoint=[%s], request=%s", methodName, url, request.toString()));

        ResponseEntity<JsonNode> response;
        try {

            response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);

        } catch (HttpClientErrorException e) {
            log.error("Endpoint={}, HttpStatus={}, response={}", url, e.getRawStatusCode(), e.getResponseBodyAsString(), e);
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        } catch (HttpServerErrorException e) {
            log.error("Endpoint={}, HttpStatus={}, response={}", url, e.getRawStatusCode(), e.getResponseBodyAsString(), e);
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        }

        ObjectNode datalist = (ObjectNode) response.getBody();
        datalist.setAll((ObjectNode) fileUtil.getDatalistJSON());
        populateDefaultDatalist(datalist);
        log.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s]",
                methodName, url, response.getStatusCodeValue()));

        return new ResponseEntity<>(datalist, null, HttpStatus.OK);
    }

    private void populateDefaultDatalist(JsonNode datalist) {
        if (datalist != null) {
            defaultDatalist.set("countryCode", datalist.get("countryCode"));
        }
        log.info("defaultDatalist size = " + defaultDatalist.size());
    }

    private HttpEntity<JsonNode> getHttpEntityRequest(JsonNode requestBodyJSON, String oauthAccessToken) {
        HttpHeaders headers = authorizationService.getOAuthHeaders(oauthAccessToken);
        return new HttpEntity<>(requestBodyJSON, headers);
    }
}
