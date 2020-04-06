package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;

import java.time.LocalDateTime;

import static ae.rakbank.webapply.constants.AuthConstants.*;
import static ae.rakbank.webapply.services.auth.OAuthService.TIME_SHIFT_FOR_REQUEST;

@Slf4j
@Service
@RequiredArgsConstructor
public class ContextOAuthService {

    private final OauthClient oauthClient;
    private final ServletContext servletContext;
    private final FileUtil fileUtil;

    synchronized ResponseEntity<JsonNode> refreshAndGet() {

        ResponseEntity<JsonNode> oauthResponse;
        try {
            oauthResponse = oauthClient.refreshAccessToken(getContextRefreshToken());
        } catch (ApiException e) {
            if (HttpStatus.BAD_REQUEST.equals(e.getApiError().getStatus())) {
                log.warn("[Oauth refreshAndGet] the refresh request was not succeeded, " +
                        "try to get new with Oauth token with VirtualUser: {}", fileUtil.getOauthUser());
                oauthResponse = oauthClient.authorize(fileUtil.getOauthUser(), fileUtil.getOauthPassword());
            } else {
                throw e;
            }
        }

        setContextOauth(oauthResponse);
        return oauthResponse;
    }

    synchronized void setContextOauth(ResponseEntity<JsonNode> oAuthContextTokenResponse) {
        servletContext.setAttribute(OAUTH_CONTEXT_OBJECT_KEY, oAuthContextTokenResponse);
        servletContext.setAttribute(OAUTH_CONTEXT_EXPIRED_TIME_KEY, getExpireTime(oAuthContextTokenResponse));
        log.info("Context OAuth details is updated");
    }

    private String getContextRefreshToken() {
        ResponseEntity<JsonNode> oAuthContextTokenResponse =
                (ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);
        return oAuthContextTokenResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText();
    }

    @SuppressWarnings("Duplicates")
    private LocalDateTime getExpireTime(ResponseEntity<JsonNode> oAuthObjectResponse) {
        int expiresIn = oAuthObjectResponse.getBody().get(EXPIRES_IN).asInt();
        LocalDateTime now = LocalDateTime.now();
        int seconds = expiresIn - TIME_SHIFT_FOR_REQUEST;
        LocalDateTime jwtExpireTime = now.plusSeconds(seconds);
        log.info("[getExpireTime] Expire in variable: {}, Local date time now: {}, JWT token exp time: {}",
                expiresIn, now, jwtExpireTime);
        return jwtExpireTime;
    }
}
