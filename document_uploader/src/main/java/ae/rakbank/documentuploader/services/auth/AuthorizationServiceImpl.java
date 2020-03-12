package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.exception.ApiException;
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
    public void validateJwtToken(String jwtToken) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            validateAgentJwtPayload(jwtPayload);
        } else if (UserRole.CUSTOMER.equals(jwtPayload.getRole())) {
            validateCustomerJwtPayload(jwtPayload);
        } else {
            log.error("JwtToken is not valid, field role is required");
            throw new ApiException("JwtToken is not valid, field role is required", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public JwtPayload getPrincipal(String token) {
        return jwtService.decrypt(token);
    }

    private void validateCustomerJwtPayload(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getPhoneNumber())
                || StringUtils.isEmpty(jwtPayload.getOauthAccessToken())
                || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
            log.error("JwtToken is not valid, field phoneNumber and Oauth details are required for the Customer");
            throw new ApiException("JwtToken is not valid, field phoneNumber and Oauth details are required for the Customer",
                    HttpStatus.UNAUTHORIZED);
        }
    }

    private void validateAgentJwtPayload(JwtPayload jwtPayload) {
        if (StringUtils.isEmpty(jwtPayload.getOauthAccessToken())
                || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
                || StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
            log.error("JwtToken is not valid, field phoneNumber is required for the Agent");
            throw new ApiException("JwtToken is not valid, Oauth details is required for the Agent",
                    HttpStatus.UNAUTHORIZED);
        }
    }
}
