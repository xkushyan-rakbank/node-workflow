package ae.rakbank.webapply.exception;

import ae.rakbank.webapply.commons.ApiError;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@Getter
public class ApiException extends RuntimeException {

    private HttpHeaders headers;
    private HttpStatus status;
    private ApiError apiError;

    public ApiException(String errorMessage) {
        super(errorMessage);
    }

    public ApiException(String errorMessage, Exception e) {
        super(errorMessage, e);
    }

    public ApiException(Exception e, ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage(), e);
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
    }
}
