package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_ACCESS_TOKEN_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_REFRESH_TOKEN_KEY;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private final FileUtil fileUtil;
    private final JwtService jwtService;
    private final OAuthService oAuthService;
    private final OauthClient oauthClient;

    @Override
    public String validateAndUpdateJwtToken(String jwtToken, boolean isRefresh) {
        JwtPayload jwtPayload = jwtService.decrypt(jwtToken);
        log.info("[getExpireTime] >> Parsed jwt token: {}", jwtToken);
        log.info("[validateAndUpdateJwtToken inside authServiceImpl] >> : {}",isRefresh);
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            validateAndUpdateAgentJwtPayload(jwtPayload,isRefresh);
        } else if (UserRole.CUSTOMER.equals(jwtPayload.getRole())) {
            validateAndUpdateCustomerJwtPayload(jwtPayload,isRefresh);
        } else {
            log.error("[getExpireTime] >> JwtToken is not valid, field role is required");
            throw new ApiException("[getExpireTime] >> JwtToken is not valid, field role is required", HttpStatus.UNAUTHORIZED);
        }
        return jwtService.encrypt(jwtPayload);
    }

    private void validateAndUpdateCustomerJwtPayload(JwtPayload jwtPayload,boolean isRefresh) {
        if (StringUtils.isEmpty(jwtPayload.getPhoneNumber())) {
            log.error("JwtToken is not valid, the fields phoneNumber and prospectId are required for the Customer");
            throw new ApiException("JwtToken is not valid, the fields phoneNumber and prospectId are required for the Customer",
                    HttpStatus.UNAUTHORIZED);
        }
        log.info("[validateAndUpdateCustomerJwtPayload inside authServiceImpl] >> : {}",isRefresh);
        oAuthService.validateAndUpdateOauthToken(jwtPayload,isRefresh);
    }

    private void validateAndUpdateAgentJwtPayload(JwtPayload jwtPayload,boolean isRefresh) {
    	log.info("[validateAndUpdateAgentJwtPayload inside authServiceImpl] >> : {}",isRefresh);
        oAuthService.validateAndUpdateOauthToken(jwtPayload,isRefresh);
    }

    @Override
    public String createAgentJwtToken(String username, String password) {
        ResponseEntity<JsonNode> oAuthObjectResponse = oauthClient.authorize(username, password);

        return jwtService.encrypt(JwtPayload.builder()
                .role(UserRole.AGENT)
                .oauthAccessToken(oAuthObjectResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText())
                .oauthRefreshToken(oAuthObjectResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText())
                .oauthTokenExpiryTime(oAuthService.getExpireTime(oAuthObjectResponse))
                .build());
    }

    @Override
    public String createCustomerJwtToken(String phoneNumber, String prospectId) {
        log.info("Get new Oauth token for Customer with VirtualUser: {}, prospectId: {}",
                fileUtil.getOauthUser(), prospectId);
        ResponseEntity<JsonNode> oAuthObjectResponse =
                oauthClient.authorize(fileUtil.getOauthUser(), fileUtil.getOauthPassword());

        return jwtService.encrypt(JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber(phoneNumber)
                .prospectId(prospectId)
                .oauthAccessToken(oAuthObjectResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText())
                .oauthRefreshToken(oAuthObjectResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText())
                .oauthTokenExpiryTime(oAuthService.getExpireTime(oAuthObjectResponse))
                .build());
    }

    @Override
    public HttpHeaders getOAuthHeaders(String oauthAccessToken) {
        return oAuthService.getOAuthHeaders(oauthAccessToken);
    }

    @Override
    public String getAndUpdateContextOauthToken() {
        return oAuthService.getAndUpdateContextOauthToken();
    }

    @Override
    public JwtPayload getPrincipal(String token) {
        return jwtService.decrypt(token);
    }

    @Override
    public String getTokenFromPrincipal(JwtPayload principal) {
        return jwtService.encrypt(principal);
    }
}
