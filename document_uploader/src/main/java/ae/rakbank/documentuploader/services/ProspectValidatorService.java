package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.services.auth.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ProspectValidatorService {

    private AuthorizationService authorizationService;

    public void validate(String jwtToken, String prospectId) {
        JwtPayload principal = authorizationService.getPrincipal(jwtToken);
        if (UserRole.AGENT.equals(principal.getRole())) {
            return;
        }
        if (!prospectId.equals(principal.getProspectId())) {
            throw new ApiException("The prospect is not allowed for current Customer", HttpStatus.BAD_REQUEST);
        }
    }
}
