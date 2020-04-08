package ae.rakbank.documentuploader.stub;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.dto.UserRole;

import java.time.LocalDateTime;

public class JwtPayloadStub {

    private JwtPayloadStub() {
    }

    public static JwtPayload getJwtPayload() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthRefreshToken("refresh-token")
                .oauthTokenExpiryTime(LocalDateTime.of(2020, 01, 01, 00, 00))
                .build();
    }

    public static JwtPayload getNotExpiredJwtPayload() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthRefreshToken("refresh-token")
                .oauthTokenExpiryTime(LocalDateTime.now().plusMinutes(15))
                .build();
    }

    public static JwtPayload getJwtPayloadForProspect(String prospectId) {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .prospectId(prospectId)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthRefreshToken("refresh-token")
                .oauthTokenExpiryTime(LocalDateTime.now().plusMinutes(15))
                .build();
    }
}
