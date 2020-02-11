package ae.rakbank.webapply.services;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

public interface AuthorizationService {
    void validateJwtToken(String jwtToken, Boolean force);

    String getJwtToken();

    String getJwtToken(String username, String password);

    String createJwtToken(String phoneNumber);

    String getOauthAccessToken(String jwtToken);

    HttpHeaders getOAuthHeaders(String oauthAccessToken, MediaType mediaType);

    String getAndUpdateContextOauthToken();
}
