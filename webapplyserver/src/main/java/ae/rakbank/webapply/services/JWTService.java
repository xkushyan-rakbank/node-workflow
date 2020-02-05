package ae.rakbank.webapply.services;

import javax.annotation.PostConstruct;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.dto.JWTPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.helpers.FileHelper;

@Component
public class JWTService {
    private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

    @Autowired
    FileHelper fileHelper;
    
    protected String secret;

    @PostConstruct
    public void init() {
      JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
      secret = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSecret").asText();
    }
    
    public String encrypt(JWTPayload data) {
        try {
          Algorithm algorithm = Algorithm.HMAC256(secret);
          String token = JWT.create()
            .withClaim("OAuthToken", data.getOAuthToken())
            .withClaim("OAuthRefreshToken", data.getOAuthRefreshToken())
            .sign(algorithm);
      
          return token;  
        } catch (JWTCreationException e) {
          logger.error("Failed create jwt token", e);
          ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "encrypt JWT token error", e.getMessage(), e);

          throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public JWTPayload decrypt(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            JWTVerifier verifier = JWT.require(algorithm)
                .build();
            DecodedJWT jwt = verifier.verify(token);
            JWTPayload payload = new JWTPayload();
            payload.setOAuthToken(jwt.getClaim("OAuthToken").asString());
            payload.setOAuthRefreshToken(jwt.getClaim("OAuthRefreshToken").asString());

            return payload;
        } catch (JWTVerificationException e){
            logger.error("Failed verify jwt token", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "decrypt JWT token error", e.getMessage(), e);

            throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}