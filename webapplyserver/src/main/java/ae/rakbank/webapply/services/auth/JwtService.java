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
import org.springframework.stereotype.Component;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.helpers.FileHelper;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Component
@RequiredArgsConstructor
class JwtService {
    private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

    private final FileHelper fileHelper;

    private String secret;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
        secret = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSecret").asText();
    }

    String encrypt(JwtPayload data) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            Instant instantExpiredAt = LocalDateTime.now().plusHours(3).toInstant(ZoneOffset.UTC);
            Date expiredAt = Date.from(instantExpiredAt);

            String role = null;
            if (data.getRole() != null) {
                role = data.getRole().toString();
            }

            return JWT.create()
                    .withClaim("OAuthToken", data.getOauthAccessToken())
                    .withClaim("OAuthRefreshToken", data.getOauthRefreshToken())
                    .withClaim("role", role)
                    .withClaim("phoneNumber", data.getPhoneNumber())
                    .withExpiresAt(expiredAt)
                    .sign(algorithm);
        } catch (JWTCreationException e) {
            logger.error("Failed create jwt token", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "encrypt JWT token error", e.getMessage(), e);

            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    JwtPayload decrypt(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                    .build();
            DecodedJWT jwt = verifier.verify(token);

            return JwtPayload.builder()
                    .oauthAccessToken(jwt.getClaim("OAuthToken").asString())
                    .oauthRefreshToken(jwt.getClaim("OAuthRefreshToken").asString())
                    .role(UserRole.valueOf(jwt.getClaim("role").asString()))
                    .phoneNumber(jwt.getClaim("phoneNumber").asString())
                    .build();
        } catch (JWTVerificationException e) {
            logger.error("Failed verify jwt token", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "decrypt JWT token error", e.getMessage(), e);

            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
