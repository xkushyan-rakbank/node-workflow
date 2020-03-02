package ae.rakbank.documentuploader.exception;

import ae.rakbank.documentuploader.dto.ApiError;
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

    private final String timestamp;
    private final HttpHeaders headers;
    private final HttpStatus status;
    private final ApiError apiError;

    public ApiException(String errorMessage, HttpStatus status) {
        super(errorMessage);
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN));
        this.headers = null;
        this.status = status;
        this.apiError = null;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(String errorMessage, Exception e) {
        super(errorMessage, e);
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN));
        this.headers = null;
        this.status = null;
        this.apiError = null;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(ApiError apiError, HttpStatus status) {
        super(apiError.getMessage());
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN));
        this.headers = null;
        this.status = status;
        this.apiError = apiError;
        log.error(API_EXCEPTION_MESSAGE);
    }

    public ApiException(Exception e, ApiError apiError, HttpHeaders headers, HttpStatus status) {
        super(apiError.getMessage(), e);
        this.timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN));
        this.headers = headers;
        this.status = status;
        this.apiError = apiError;
        log.error(API_EXCEPTION_MESSAGE);
    }
}
