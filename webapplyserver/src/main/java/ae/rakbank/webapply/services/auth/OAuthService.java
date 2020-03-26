package ae.rakbank.webapply.services.auth;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;

import static ae.rakbank.webapply.constants.AuthConstants.*;

@Slf4j
@Component
@RequiredArgsConstructor
class OAuthService {

    private final FileUtil fileUtil;
    private final ServletContext servletContext;
    private final OauthClient oauthClient;

    private JsonNode oAuthConfigs;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
    }

    String getAndUpdateContextOauthToken() {
        ResponseEntity<JsonNode> oAuthContextTokenResponse =
                (ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);

        if (oAuthContextTokenResponse == null || !oAuthContextTokenResponse.getStatusCode().is2xxSuccessful()
                || isContextAccessTokenExpired()) {
            oAuthContextTokenResponse = getNewVirtualUserOauthObject();
            servletContext.setAttribute(OAUTH_CONTEXT_OBJECT_KEY, oAuthContextTokenResponse);
            servletContext.setAttribute(OAUTH_CONTEXT_EXPIRED_TIME_KEY, getExpireTime(oAuthContextTokenResponse));
        }
        return oAuthContextTokenResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText();
    }


    void validateAndUpdateOauthToken(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getOauthAccessToken()) || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
            log.error("Jwt token is invalid, not all OAuth details are present");
            throw new ApiException("Jwt token is invalid, not all OAuth details are present", HttpStatus.UNAUTHORIZED);
        }
        if (LocalDateTime.now().isAfter(jwtPayload.getOauthTokenExpiryTime())) {
            log.warn("Access token is invalid, try to get new one with valid refresh token..");
            ResponseEntity<JsonNode> oauthResponse = oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken());
            jwtPayload.setOauthAccessToken(oauthResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText());
            jwtPayload.setOauthRefreshToken(oauthResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText());
            jwtPayload.setOauthTokenExpiryTime(getExpireTime(oauthResponse));
        }
    }

    LocalDateTime getExpireTime(ResponseEntity<JsonNode> oAuthObjectResponse) {
        // minus 10 seconds to prevent access_token expire error while calling the API
        int expiresIn = oAuthObjectResponse.getBody().get("expires_in").asInt();
        LocalDateTime now = LocalDateTime.now();
        int seconds = expiresIn - 10;
        LocalDateTime jwtExpireTime = now.plusSeconds(seconds);
        log.info("[getExpireTime] >> Expire in variable: {}, Local date time now: {}, JWT token exp time: {} <<", expiresIn, now, jwtExpireTime);
        return jwtExpireTime;
    }

    private ResponseEntity<JsonNode> getNewVirtualUserOauthObject() {
        String virtualUserName = oAuthConfigs.get("OAuthUsername").asText();
        String virtualUserPassword = oAuthConfigs.get("OAuthPassword").asText();

        return oauthClient.authorize(virtualUserName, virtualUserPassword);
    }

    private boolean isContextAccessTokenExpired() {
        return LocalDateTime.now()
                .isAfter(LocalDateTime.parse(servletContext.getAttribute(OAUTH_CONTEXT_EXPIRED_TIME_KEY).toString()));
    }

    HttpHeaders getOAuthHeaders(String oauthAccessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", oauthAccessToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.setContentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode channelContext = objectMapper.createObjectNode();
        ObjectNode authorizationDetails = objectMapper.createObjectNode();
        authorizationDetails.put("primaryAccessCode", oAuthConfigs.get("OAuthPassword").asText());
        authorizationDetails.put("secondaryAccessCode", "");
        authorizationDetails.put("userId", oAuthConfigs.get("OAuthUsername").asText());

        channelContext.set("authorizationDetails", authorizationDetails);
        headers.set("ChannelContext", channelContext.toString());
        return headers;
    }
}
