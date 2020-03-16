package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.util.EnvironmentUtil;
import ae.rakbank.documentuploader.util.FileUtil;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
class JwtService {

    private final FileUtil fileUtil;
    private final EnvironmentUtil environmentUtil;

    private String secret;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getDocUploadConfigJson();
        secret = appConfigJSON.get("OtherConfigs").get(environmentUtil.getWebApplyEnv()).get("JwtSecret").asText();
    }

    @SuppressWarnings("Duplicates")
    JwtPayload decrypt(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(token);

            if (jwt.getClaim("role").asString() == null) {
                log.error("JwtToken is not valid, field role is required");
                throw new ApiException("JwtToken is not valid, field role is required", HttpStatus.UNAUTHORIZED);
            }

            return JwtPayload.builder()
                    .oauthAccessToken(jwt.getClaim("OAuthToken").asString())
                    .oauthRefreshToken(jwt.getClaim("OAuthRefreshToken").asString())
                    .role(UserRole.valueOf(jwt.getClaim("role").asString()))
                    .phoneNumber(jwt.getClaim("phoneNumber").asString())
                    .prospectId(jwt.getClaim("prospectId").asString())
                    .oauthTokenExpiryTime(LocalDateTime.parse(jwt.getClaim("oauthTokenExpiryTime").asString()))
                    .build();
        } catch (JWTVerificationException e) {
            log.error("Failed verify jwt token", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "decrypt JWT token error", e.getMessage(), e);

            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
