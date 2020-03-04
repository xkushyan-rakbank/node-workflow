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
}
