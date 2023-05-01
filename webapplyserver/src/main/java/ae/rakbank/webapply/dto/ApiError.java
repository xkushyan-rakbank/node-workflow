package ae.rakbank.webapply.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Builder
@Getter
@Setter
@AllArgsConstructor
public class ApiError implements Serializable {

    private static final long serialVersionUID = 1L;
    public static final String TIMESTAMP_PATTERN = "yyyy-MM-dd HH:mm:ss,SSS";

    private HttpStatus status;
    private Integer statusCode;
    private String timestamp;
    private String message;
    private String debugMessage;
    private String errorType;

    @SuppressWarnings("java:S1948")
    private JsonNode errors;
    private String exceptionClassName;
    private StackTraceElement[] stackTrace;

    private ApiError() {
        initTimestamp();
    }
    
    public ApiError(String message, String debugMessage) {
        this();
        this.message = message;
        this.debugMessage = debugMessage;
    }

    public ApiError(HttpStatus status, String message, String debugMessage) {
        this();
        this.status = status;
        this.statusCode = status.value();
        this.message = message;
        this.debugMessage = debugMessage;
    }

    public ApiError(HttpStatus status, String message, String debugMessage, Throwable ex) {
        this();
        this.status = status;
        this.statusCode = status.value();
        this.message = message;
        this.debugMessage = debugMessage;
        setException(ex);
    }

    public void initTimestamp() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(TIMESTAMP_PATTERN);
        timestamp = LocalDateTime.now().format(formatter);
    }

    private void setException(Throwable ex) {
        this.exceptionClassName = ex.getClass().getSimpleName();
        this.message = ex.getMessage();
        this.stackTrace = getReducedStackTrace(ex.getStackTrace());
    }

    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize ApiError object", e);
            return "Failed to serialize ApiError object, " + e.getMessage();
        }
    }

    private StackTraceElement[] getReducedStackTrace(StackTraceElement[] stackTrace) {
        return new StackTraceElement[]{stackTrace[0], stackTrace[1], stackTrace[2], stackTrace[3], stackTrace[4]};
    }
}
