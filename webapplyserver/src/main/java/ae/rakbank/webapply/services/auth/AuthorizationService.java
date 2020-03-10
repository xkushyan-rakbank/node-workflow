package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.dto.JwtPayload;
import org.springframework.http.HttpHeaders;

import javax.servlet.http.HttpServletResponse;

public interface AuthorizationService {

    String validateAndUpdateJwtToken(String jwtToken);

    String createAgentJwtToken(String username, String password);

    String createCustomerJwtToken(String phoneNumber, String prospectId);

    HttpHeaders getOAuthHeaders(String oauthAccessToken);

    String getAndUpdateContextOauthToken();

    JwtPayload getPrincipal(String token);

    String getTokenFromPrincipal(JwtPayload principal);
}
