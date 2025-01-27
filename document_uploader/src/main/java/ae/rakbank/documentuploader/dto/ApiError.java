package ae.rakbank.documentuploader.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApiError implements ApiErrorInterface{

    public static final String TIMESTAMP_PATTERN = "yyyy-MM-dd HH:mm:ss,SSS";

    private HttpStatus status;
    private Integer statusCode;
    private String timestamp;
    private String message;
    private String debugMessage;
    private String errorType;
    private JsonNode errors;
    private String exceptionClassName;
    private StackTraceElement[] stackTrace;

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

    @Override
    public String toJsonString() {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            log.error("Failed to serialize ApiError object", e);
            return "Failed to serialize ApiError object " + e.getMessage();
        }
    }

    private StackTraceElement[] getReducedStackTrace(StackTraceElement[] stackTrace) {
        return new StackTraceElement[]{stackTrace[0], stackTrace[1], stackTrace[2], stackTrace[3], stackTrace[4]};
    }
}
