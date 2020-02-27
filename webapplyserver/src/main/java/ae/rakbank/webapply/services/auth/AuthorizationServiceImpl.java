package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final FileUtil fileUtil;
    private final JwtService jwtService;
    private final OAuthService oAuthService;
    private final OauthClient oauthClient;

    private JsonNode oAuthConfigs;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
    }

    @Override
    public String validateAndUpdateJwtToken(String jwtToken) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            validateAndUpdateAgentJwtPayload(jwtPayload);
        } else if (UserRole.CUSTOMER.equals(jwtPayload.getRole())) {
            validateAndUpdateCustomerJwtPayload(jwtPayload);
        } else {
            log.error("JwtToken is not valid, field role is required");
            throw new ApiException("JwtToken is not valid, field role is required", HttpStatus.UNAUTHORIZED);
        }
        return jwtService.encrypt(jwtPayload);
    }

    private void validateAndUpdateCustomerJwtPayload(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getPhoneNumber())) {
            log.error("JwtToken is not valid, field phoneNumber is required for the Customer");
            throw new ApiException("JwtToken is not valid, field phoneNumber is required for the Customer", HttpStatus.UNAUTHORIZED);
        }
        oAuthService.validateAndUpdateOauthToken(jwtPayload);
    }

    private void validateAndUpdateAgentJwtPayload(JwtPayload jwtPayload) {
        oAuthService.validateAndUpdateOauthToken(jwtPayload);
    }

    @Override
    public String createAgentJwtToken(String username, String password) {
        ResponseEntity<JsonNode> oAuthObjectResponse = oauthClient.authorize(username, password);

        return jwtService.encrypt(JwtPayload.builder()
                .role(UserRole.AGENT)
                .oauthAccessToken(oAuthObjectResponse.getBody().get("access_token").asText())
                .oauthRefreshToken(oAuthObjectResponse.getBody().get("refresh_token").asText())
                .oauthTokenExpiryTime(oAuthService.getExpireTime(oAuthObjectResponse))
                .build());
    }

    @Override
    public String createCustomerJwtToken(String phoneNumber) {
        ResponseEntity<JsonNode> oAuthObjectResponse =
                oauthClient.authorize(oAuthConfigs.get("OAuthUsername").asText(), oAuthConfigs.get("OAuthPassword").asText());

        return jwtService.encrypt(JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber(phoneNumber)
                .oauthAccessToken(oAuthObjectResponse.getBody().get("access_token").asText())
                .oauthRefreshToken(oAuthObjectResponse.getBody().get("refresh_token").asText())
                .oauthTokenExpiryTime(oAuthService.getExpireTime(oAuthObjectResponse))
                .build());
    }

    @Override
    public HttpHeaders getOAuthHeaders(String oauthAccessToken) {
        return oAuthService.getOAuthHeaders(oauthAccessToken);
    }

    @Override
    public String getAndUpdateContextOauthToken() {
        return oAuthService.getAndUpdateContextOauthToken();
    }

    @Override
    public JwtPayload getPrincipal(String token) {
        return jwtService.decrypt(token);
    }
}
