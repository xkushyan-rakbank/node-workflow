package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final JwtService jwtService;

    @Override
    public String validateAndUpdateJwtToken(String jwtToken) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            validateAndUpdateAgentJwtPayload(jwtPayload);
        } else if (UserRole.CUSTOMER.equals(jwtPayload.getRole())) {
            validateAndUpdateCustomerJwtPayload(jwtPayload);
        } else {
            log.error("JwtToken is not valid, field role is required");
            throw new ApiException("JwtToken is not valid, field role is required", HttpStatus.UNAUTHORIZED);
        }
        return jwtService.encrypt(jwtPayload);
    }

    private void validateAndUpdateCustomerJwtPayload(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getPhoneNumber())
                || StringUtils.isEmpty(jwtPayload.getOauthAccessToken())
                || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
            log.error("JwtToken is not valid, field phoneNumber and Oauth details are required for the Customer");
            throw new ApiException("JwtToken is not valid, field phoneNumber and Oauth details are required for the Customer",
                    HttpStatus.UNAUTHORIZED);
        }
    }

    private void validateAndUpdateAgentJwtPayload(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getOauthAccessToken())
                || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
            log.error("JwtToken is not valid, field phoneNumber is required for the Agent");
            throw new ApiException("JwtToken is not valid, Oauth details is required for the Agent",
                    HttpStatus.UNAUTHORIZED);
        }
    }
}
