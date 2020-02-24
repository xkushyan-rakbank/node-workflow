package ae.rakbank.webapply.response;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class JWTResponse implements Serializable {

    private static final long serialVersionUID = -2263926489641534208L;

    private String error;
    private String status;
    private String message;
    private String path;

    public static JWTResponse getFailedResponse(String status, String message, String error, String path) {
        JWTResponse jwtResponse = new JWTResponse();
        jwtResponse.setError(error);
        jwtResponse.setMessage(message);
        jwtResponse.setStatus(status);
        jwtResponse.setPath(path);
        return jwtResponse;
    }
}
