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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timestampPattern);
        timestamp = LocalDateTime.now().format(formatter);
    }

    public ApiException(String errorMessage, Exception e) {
        super(errorMessage, e);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timestampPattern);
        timestamp = LocalDateTime.now().format(formatter);
    }

    public ApiException(Exception e, ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage(), e);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timestampPattern);
        timestamp = LocalDateTime.now().format(formatter);
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
    }
}
