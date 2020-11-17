package ae.rakbank.webapply.services.auth;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.servlet.ServletContext;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.util.FileUtil;

import static ae.rakbank.webapply.constants.AuthConstants.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthService {

    // 30 seconds shift to prevent access_token expire error while calling the API
    static final int TIME_SHIFT_FOR_REQUEST = 30;
    private static final Integer TIME_WINDOW_FOR_UPLOAD_SEC = 1020;//17 mins to stop the session. Front end is 15mins .so adding 2 min extra

    private final FileUtil fileUtil;
    private final ServletContext servletContext;
    private final OauthClient oauthClient;
    private final ContextOAuthService contextOAuthService;

    public String getAndUpdateContextOauthToken() {
        ResponseEntity<JsonNode> oAuthContextResponse =
                (ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);

        log.info("[Context Oauth validateAndUpdate] validate Context Oauth token..");
        if (oAuthContextResponse == null) {
            log.info("[Context Oauth validateAndUpdate] The Context Oauth token is null, " +
                    "try to get new one with virtual user: {}", fileUtil.getOauthUser());

            oAuthContextResponse = oauthClient.authorize(fileUtil.getOauthUser(), fileUtil.getOauthPassword());

            contextOAuthService.setContextOauth(oAuthContextResponse);
            log.info("[Context Oauth validateAndUpdate] Got new Oauth object with details: {}, " +
                    "Context is updated with OAuth object", oAuthContextResponse.getBody());
        } else if (isContextAccessTokenExpired()) {
            log.info("[Context Oauth validateAndUpdate] The Context Oauth token is expired, try to refresh with refresh token..");

            oAuthContextResponse = contextOAuthService.refreshAndGet();

            log.info("[Context Oauth validateAndUpdate] Refreshing Context Oauth token is succeeded, context is updated");
        }
        log.info("[Context Oauth validateAndUpdate] validate Context Oauth token was successful with details: {}",
                oAuthContextResponse.getBody());
        return oAuthContextResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText();
    }

    void validateAndUpdateOauthToken(JwtPayload jwtPayload) {

        validateOauthDetails(jwtPayload);
        LocalDateTime now = LocalDateTime.now();
        boolean isExpired = now.isAfter(jwtPayload.getOauthTokenExpiryTime());
        log.info("[Oauth validateAndUpdate] Checking expiration: now is {}, oauthToken expire time: {}, isExpired: {}",
                now, jwtPayload.getOauthTokenExpiryTime(), isExpired);
        validateExpirationTime(jwtPayload);
       if (isExpired) {
    	   ResponseEntity<JsonNode> oauthResponse = refreshAndGetOauthObject(jwtPayload);
           updateJwtToken(jwtPayload, oauthResponse);
        }

        log.info("[Oauth validateAndUpdate] Jwt payload now is: {}", jwtPayload);
    }

    private void validateOauthDetails(JwtPayload jwtPayload) {
        log.info("[Oauth validateAndUpdate] Start validation Oath, jwt: {}", jwtPayload);

        if (StringUtils.isEmpty(jwtPayload.getOauthAccessToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())
                || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())) {

            log.error("[Oauth validateAndUpdate] Jwt token is invalid, not all OAuth details are present, details: {}",
                    jwtPayload);
            throw new ApiException("[Oauth validateAndUpdate] Jwt token is invalid, not all OAuth details are present," +
                    " details: " + jwtPayload,
                    HttpStatus.UNAUTHORIZED);
        }
        log.info("[getExpireTime] >> Jwt payload now is: {}", jwtPayload);
    }

    private void updateJwtToken(JwtPayload jwtPayload, ResponseEntity<JsonNode> oauthResponse) {
        jwtPayload.setOauthRefreshToken(oauthResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText());
        jwtPayload.setOauthAccessToken(oauthResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText());
        jwtPayload.setOauthTokenExpiryTime(getExpireTime(oauthResponse));
    }

    private ResponseEntity<JsonNode> refreshAndGetOauthObject(JwtPayload jwtPayload) {
        ResponseEntity<JsonNode> oauthResponse;

        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            log.warn("[Oauth validateAndUpdate] Access token is expired, try to get new one with Agent refresh token..");
            oauthResponse = oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken());
            log.info("[Oauth validateAndUpdate] Agent Oauth token was successfully refreshed with details: {}",
                    oauthResponse.getBody());

        } else if (UserRole.CUSTOMER.equals(jwtPayload.getRole())) {
            log.warn("[Oauth validateAndUpdate] Access token is expired, try to get new one with Customer personal refresh token..");

            try {
                oauthResponse = oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken());
            } catch (ApiException e) {
                if (HttpStatus.BAD_REQUEST.equals(e.getApiError().getStatus())) {
                    log.warn("[Oauth refreshAndGet] the Customer refresh request was not succeeded, " +
                            "try to get new one with VirtualUser: {}", fileUtil.getOauthUser());
                    oauthResponse = oauthClient.authorize(fileUtil.getOauthUser(), fileUtil.getOauthPassword());
                } else {
                    throw e;
                }
            }
            log.info("[Oauth validateAndUpdate] Customer Oauth token was successfully updated with details: {}",
                    oauthResponse.getBody());
        } else {
            throw new ApiException("Unexpected user role!");
        }
        return oauthResponse;
    }

    @SuppressWarnings("Duplicates")
    LocalDateTime getExpireTime(ResponseEntity<JsonNode> oAuthObjectResponse) {
        int expiresIn = oAuthObjectResponse.getBody().get(EXPIRES_IN).asInt();
        LocalDateTime now = LocalDateTime.now();
        int seconds = expiresIn - TIME_SHIFT_FOR_REQUEST;
        LocalDateTime jwtExpireTime = now.plusSeconds(seconds);
        log.info("[getExpireTime] >> Expire in variable: {}, Local date time now: {}, JWT token exp time: {} <<", expiresIn, now, jwtExpireTime);
        return jwtExpireTime;
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
        authorizationDetails.put("primaryAccessCode", fileUtil.getOauthPassword());
        authorizationDetails.put("secondaryAccessCode", "");
        authorizationDetails.put("userId", fileUtil.getOauthUser());

        channelContext.set("authorizationDetails", authorizationDetails);
        headers.set("ChannelContext", channelContext.toString());
        return headers;
    }
    
    private void validateExpirationTime(JwtPayload jwtPayload) {
        if (jwtPayload.getOauthTokenExpiryTime().plusSeconds(TIME_WINDOW_FOR_UPLOAD_SEC)
                .isBefore(LocalDateTime.now())) {
            log.error("JwtToken is expired for api calls");
            throw new ApiException(JWT_EXPIRED);
        }
    }
}
