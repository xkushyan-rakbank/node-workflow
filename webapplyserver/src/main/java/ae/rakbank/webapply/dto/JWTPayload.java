package ae.rakbank.webapply.dto;

public class JWTPayload {
    private String _oauthToken;
    private String _oauthRefreshToken;

    public void setOAuthToken(String oauthToken) {
        _oauthToken = oauthToken;
    }

    public String getOAuthToken() {
        return _oauthToken;
    }

    public void setOAuthRefreshToken(String oauthRefreshToken) {
        _oauthRefreshToken = oauthRefreshToken;
    }

    public String getOAuthRefreshToken() {
        return _oauthRefreshToken;
    }
}
