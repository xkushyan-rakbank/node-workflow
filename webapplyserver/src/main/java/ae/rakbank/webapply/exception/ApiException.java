package ae.rakbank.webapply.exception;

import ae.rakbank.webapply.commons.ApiError;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Getter
public class ApiException extends RuntimeException {

    private static final String TIMESTAMP_PATTERN = "yyyy-MM-dd HH:mm:ss,SSS";
    private static final String API_EXCEPTION_MESSAGE = "ApiException was occurred ";

    private HttpHeaders headers;
    private HttpStatus status;
    private ApiError apiError;
    private String timestamp;

    public ApiException(String errorMessage) {
        super(errorMessage);
        initTimestamp();
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(String errorMessage, Exception e) {
        super(errorMessage, e);
        initTimestamp();
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(String errorMessage, HttpStatus status) {
        super(errorMessage);
        initTimestamp();
        this.status = status;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage());
        initTimestamp();
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(ApiError apiError, HttpStatus status) {
        super(apiError.getMessage());
        initTimestamp();
        this.status = status;
        this.apiError = apiError;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(Exception e, ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage(), e);
        initTimestamp();
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
        log.error(API_EXCEPTION_MESSAGE);
    }

    private void initTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN);
        timestamp = LocalDateTime.now().format(formatter);
    }
}
