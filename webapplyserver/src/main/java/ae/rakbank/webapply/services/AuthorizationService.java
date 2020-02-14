package ae.rakbank.webapply.services;

import org.springframework.http.HttpHeaders;

public interface AuthorizationService {

    String validateAndUpdateJwtToken(String jwtToken, Boolean force);

    String createAgentJwtToken(String username, String password);

    String createCustomerJwtToken(String phoneNumber);

    HttpHeaders getOAuthHeaders(String oauthAccessToken);

    String getAndUpdateContextOauthToken();
}
