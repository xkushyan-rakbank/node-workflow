package ae.rakbank.webapply.exception;

import ae.rakbank.webapply.commons.ApiError;
import lombok.Getter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
public class ApiException extends RuntimeException {

    public static final String timestampPattern = "yyyy-MM-dd HH:mm:ss,SSS";

    private HttpHeaders headers;
    private HttpStatus status;
    private ApiError apiError;
    private String timestamp;

    public ApiException(String errorMessage) {
        super(errorMessage);
        initTimestamp();
    }

    public ApiException(String errorMessage, Exception e) {
        super(errorMessage, e);
        initTimestamp();
    }

    public ApiException(Exception e, ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage(), e);
        initTimestamp();
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
    }

    private void initTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timestampPattern);
        timestamp = LocalDateTime.now().format(formatter);
    }
}
