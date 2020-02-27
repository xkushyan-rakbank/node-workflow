package ae.rakbank.documentuploader.services;

public interface AuthorizationService {

    void validateJwtToken(String jwtToken);
}
