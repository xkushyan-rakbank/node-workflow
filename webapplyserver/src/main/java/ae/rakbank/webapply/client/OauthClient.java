package ae.rakbank.webapply.client;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.FileUtil;
import ae.rakbank.webapply.util.DehUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;
import java.util.Collections;

@Slf4j
@Component
@RequiredArgsConstructor
public class OauthClient {

    private final FileUtil fileUtil;
    private final DehUtil dehUtil;

    private JsonNode oAuthUri;
    private String oAuthBaseUrl;
    private JsonNode oAuthConfigs;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        oAuthUri = appConfigJSON.get("OAuthURIs");
        oAuthBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("OAuthBaseUrl").asText();
        oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
    }

    public ResponseEntity<JsonNode> authorize(String userName, String password) {
        MultiValueMap<String, String> requestMap = buildOAuthRequest(userName, password);
        log.debug("Start oauth authorize request..");
        return sendOauthRequest(requestMap);
    }

    public ResponseEntity<JsonNode> refreshAccessToken(String refreshToken) {
        MultiValueMap<String, String> requestMap = buildOAuthRefreshRequest(refreshToken);
        log.debug("Start refresh token request..");
        return sendOauthRequest(requestMap);
    }

    private ResponseEntity<JsonNode> sendOauthRequest(MultiValueMap<String, String> requestMap) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestMap, headers);
        String url = oAuthBaseUrl + oAuthUri.get("generateTokenUri").asText();
        log.info(String.format("Invoke API: Endpoint=[%s], request=[%s] ", url, request.getBody().toString()));

        RestTemplate restTemplate = new RestTemplate();
        try {

            return restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);

        } catch (HttpClientErrorException e) {
            log.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpStatus status = HttpStatus.BAD_REQUEST;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        } catch (HttpServerErrorException e) {
            log.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
            ApiError apiError = dehUtil.initApiError(e, status);

            throw new ApiException(e, apiError, e.getResponseHeaders(), status);
        }
    }

    private MultiValueMap<String, String> buildOAuthRequest(String username, String password) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", oAuthConfigs.get("OAuthGrantType").asText());
        map.add("client_id", oAuthConfigs.get("OAuthClientId").asText());
        map.add("client_secret", oAuthConfigs.get("OAuthClientSecret").asText());
        map.add("bank_id", oAuthConfigs.get("OAuthBankId").asText());
        map.add("channel_id", oAuthConfigs.get("OAuthChannelId").asText());
        map.add("username", username);
        map.add("password", password);
        map.add("language_id", oAuthConfigs.get("OAuthLangId").asText());
        map.add("login_flag", oAuthConfigs.get("OAuthLoginFlag").asText());
        map.add("login_type", oAuthConfigs.get("OAuthLoginType").asText());
        map.add("statemode", oAuthConfigs.get("OAuthStateMode").asText());
        return map;
    }

    private MultiValueMap<String, String> buildOAuthRefreshRequest(String refreshToken) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.add("grant_type", oAuthConfigs.get("OAuthRefreshGrantType").asText());
        map.add("client_id", oAuthConfigs.get("OAuthClientId").asText());
        map.add("client_secret", oAuthConfigs.get("OAuthClientSecret").asText());
        map.add("bank_id", oAuthConfigs.get("OAuthBankId").asText());
        map.add("channel_id", oAuthConfigs.get("OAuthChannelId").asText());
        map.add("language_id", oAuthConfigs.get("OAuthLangId").asText());
        map.add("login_flag", oAuthConfigs.get("OAuthLoginFlag").asText());
        map.add("login_type", oAuthConfigs.get("OAuthLoginType").asText());
        map.add("statemode", oAuthConfigs.get("OAuthStateMode").asText());
        map.add("refresh_token", refreshToken);
        return map;
    }
}
