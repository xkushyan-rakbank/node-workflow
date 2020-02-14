package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.services.AuthorizationService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final JwtService jwtService;
    private final OAuthService oAuthService;

    @Override
    public String validateAndUpdateJwtToken(String jwtToken, Boolean force) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        oAuthService.validateAccessToken(jwtPayload.getOauthAccessToken(), jwtPayload.getOauthRefreshToken(), force);
        return jwtToken;
    }

    @Override
    public String createAgentJwtToken(String username, String password) {
        ResponseEntity<JsonNode> oAuthToken = oAuthService.getOrUpdateOAuthToken(username, password);

        return jwtService.encrypt(JwtPayload.builder()
                .oauthAccessToken(oAuthToken.getBody().get("access_token").asText())
                .oauthRefreshToken(oAuthToken.getBody().get("refresh_token").asText())
                .build());
    }

    @Override
    public String createCustomerJwtToken(String phoneNumber) {
        return jwtService.encrypt(JwtPayload.builder()
                .phoneNumber(phoneNumber)
                .role(UserRole.CUSTOMER)
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
}
