package ae.rakbank.webapply.stub;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;

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

    public static JwtPayload getJwtPayloadExpTomorrow() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthRefreshToken("refresh-token")
                .oauthTokenExpiryTime(LocalDateTime.now().plusDays(1))
                .build();
    }

    public static JwtPayload getJwtPayloadWithNoAccessToken() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthRefreshToken("refresh-token")
                .oauthTokenExpiryTime(LocalDateTime.of(2020, 01, 01, 00, 00))
                .build();
    }

    public static JwtPayload getJwtPayloadWithNoExpiryTime() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthRefreshToken("refresh-token")
                .build();
    }

    public static JwtPayload getJwtPayloadWithNoRefreshToken() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .oauthAccessToken("access-token")
                .oauthTokenExpiryTime(LocalDateTime.of(2020, 01, 01, 00, 00))
                .build();
    }

    public static JwtPayload newNoRoleJwt() {
        return JwtPayload.builder()
                .phoneNumber("123412341")
                .oauthTokenExpiryTime(LocalDateTime.of(2020, 01, 01, 00, 00))
                .build();
    }

    public static JwtPayload newCustomerJwt(String prospectId) {
        return JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .phoneNumber("+37847563456")
                .prospectId(prospectId)
                .build();
    }

    public static JwtPayload newCustomerJwtWithNoPhoneNumber() {
        return JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .build();
    }

    public static JwtPayload newAgentJwt() {
        return JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.AGENT)
                .build();
    }

}
