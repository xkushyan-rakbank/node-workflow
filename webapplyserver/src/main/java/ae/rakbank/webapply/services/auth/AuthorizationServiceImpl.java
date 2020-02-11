package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.helpers.FileHelper;
import ae.rakbank.webapply.services.AuthorizationService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final FileHelper fileHelper;
    private final JwtService jwtService;
    private final OAuthService oAuthService;

    private JsonNode oAuthConfigs = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
        oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
    }

    @Override
    public void validateJwtToken(String jwtToken, Boolean force) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        oAuthService.validateAccessToken(jwtPayload.getOauthAccessToken(), jwtPayload.getOauthRefreshToken(), force);
    }

    @Override
    public String getJwtToken() {
        return getJwtToken(oAuthConfigs.get("OAuthUsername").asText(), oAuthConfigs.get("OAuthPassword").asText());
    }

    @Override
    public String getJwtToken(String username, String password) {
        ResponseEntity<JsonNode> oAuthToken = oAuthService.getOrUpdateOAuthToken(username, password);

        return jwtService.encrypt(JwtPayload.builder()
                .oauthAccessToken(oAuthToken.getBody().get("access_token").asText())
                .oauthRefreshToken(oAuthToken.getBody().get("refresh_token").asText())
                .build());
    }

    @Override
    public String createJwtToken(String phoneNumber) {
        return jwtService.encrypt(JwtPayload.builder()
                .phoneNumber(phoneNumber)
                .role(UserRole.VIRTUAL_USER)
                .build());
    }

    @Override
    public String getOauthAccessToken(String jwtToken) {
        return jwtService.decrypt(jwtToken).getOauthAccessToken();
    }

    @Override
    public HttpHeaders getOAuthHeaders(String oauthAccessToken, MediaType mediaType) {
        return oAuthService.getOAuthHeaders(oauthAccessToken, mediaType);
    }

    @Override
    public String getAndUpdateContextOauthToken() {
        return oAuthService.getAndUpdateContextOauthToken();
    }
}
