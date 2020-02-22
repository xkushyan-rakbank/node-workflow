package ae.rakbank.documentuploader.services;

public interface AuthorizationService {

    String validateAndUpdateJwtToken(String jwtToken);
}
