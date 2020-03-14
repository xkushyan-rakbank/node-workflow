package ae.rakbank.documentuploader.stub.util;

import ae.rakbank.documentuploader.dto.JwtPayload;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtTestUtil {

    private static final String secret = "M8ZJaKCCNCnxRKni3r2mzrQR2wLhvIs1";

    public static String encrypt(JwtPayload data) {
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
            throw new RuntimeException();
        }
    }
}
