package ae.rakbank.documentuploader.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class JwtPayload {

    private String oauthAccessToken;
    private String oauthRefreshToken;
    private LocalDateTime oauthTokenExpiryTime;
    private UserRole role;
    private String phoneNumber;
    private String prospectId;
}
