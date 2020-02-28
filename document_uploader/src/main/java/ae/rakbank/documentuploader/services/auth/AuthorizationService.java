package ae.rakbank.documentuploader.services.auth;

public interface AuthorizationService {

    void validateJwtToken(String jwtToken);
}
