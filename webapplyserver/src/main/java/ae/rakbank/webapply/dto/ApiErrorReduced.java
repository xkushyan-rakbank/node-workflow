package ae.rakbank.webapply.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

import java.io.Serializable;

@Slf4j
@Data
@AllArgsConstructor
public class ApiErrorReduced implements Serializable {

    private static final long serialVersionUID = 1L;

    private HttpStatus status;
    private Integer statusCode;
    private String timestamp;
    private String message;
    private String errorType;

    @SuppressWarnings("java:S1948")
    private JsonNode errors;

    public ApiErrorReduced(ApiError apiError) {
        this.status = apiError.getStatus();
        this.statusCode = apiError.getStatusCode();
        this.timestamp = apiError.getTimestamp();
        this.message = apiError.getMessage();
        this.errorType = apiError.getErrorType();
        this.errors = apiError.getErrors();
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
}
