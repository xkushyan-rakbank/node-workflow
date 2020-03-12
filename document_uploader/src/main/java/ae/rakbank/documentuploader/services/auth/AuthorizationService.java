package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.JwtPayload;

public interface AuthorizationService {

    void validateJwtToken(String jwtToken);

    JwtPayload getPrincipal(String token);
}
