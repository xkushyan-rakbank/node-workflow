package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.dto.JwtPayload;
import org.springframework.http.HttpHeaders;

public interface AuthorizationService {

    String validateAndUpdateJwtToken(String jwtToken);

    String createAgentJwtToken(String username, String password);

    String createCustomerJwtToken(String phoneNumber);

    HttpHeaders getOAuthHeaders(String oauthAccessToken);

    String getAndUpdateContextOauthToken();

    JwtPayload getPrincipal(String token);
}
