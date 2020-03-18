package ae.rakbank.webapply.services.auth;

import javax.annotation.PostConstruct;

import ae.rakbank.webapply.dto.UserRole;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.http.HttpStatus;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.FileUtil;

import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
class JwtService {

    private final FileUtil fileUtil;

    private String secret;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        secret = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("JwtSecret").asText();
    }

    String encrypt(JwtPayload data) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);

            String role = null;
            if (data.getRole() != null) {
                role = data.getRole().toString();
            }

            return JWT.create()
                    .withClaim("OAuthToken", data.getOauthAccessToken())
                    .withClaim("OAuthRefreshToken", data.getOauthRefreshToken())
                    .withClaim("role", role)
                    .withClaim("phoneNumber", data.getPhoneNumber())
                    .withClaim("prospectId", data.getProspectId())
                    .withClaim("oauthTokenExpiryTime", data.getOauthTokenExpiryTime().toString())
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            log.error("Failed create jwt token", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "encrypt JWT token error", e.getMessage(), e);

            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
