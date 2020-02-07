package ae.rakbank.webapply.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtPayload {

    private String oauthAccessToken;
    private String oauthRefreshToken;
    private String prospect;
}
