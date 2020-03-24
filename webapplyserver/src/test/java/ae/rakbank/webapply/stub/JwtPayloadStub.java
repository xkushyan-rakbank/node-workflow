package ae.rakbank.webapply.stub;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;

public class JwtPayloadStub {

    private JwtPayloadStub() {
    }

    public static JwtPayload getJwtPayload() {
        return JwtPayload.builder()
                .role(UserRole.CUSTOMER)
                .phoneNumber("123412341")
                .build();
    }

    public static JwtPayload newNoRoleJwt() {
        return JwtPayload.builder()
                .phoneNumber("123412341")
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
