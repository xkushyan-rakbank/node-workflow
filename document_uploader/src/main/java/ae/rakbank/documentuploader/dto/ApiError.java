package ae.rakbank.documentuploader.dto;

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
public class ApiError {

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

	private ApiError() {
		initTimestamp();
	}

	public ApiError(HttpStatus status) {
		this();
		this.status = status;
		this.statusCode = status.value();
	}

	public ApiError(HttpStatus status, Throwable ex) {
		this();
		this.status = status;
		this.statusCode = status.value();
		this.message = "Unexpected error";
		setException(ex);
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
		this.stackTrace = ex.getStackTrace();
	}

	public String toJsonString() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			log.error("Failed to serialize ApiError object", e);
			return "Failed to serialize ApiError object " + e.getMessage();
		}
	}



	/*public ApiError(HttpStatus status) {
		this();
		this.status = status;
	}

	public ApiError(HttpStatus httpStatus, String message) {
		status = httpStatus;
		this.message = message;
	}

	public ApiError(HttpStatus status, Throwable ex) {
		this();
		this.status = status;
		this.message = "Unexpected error";
		setException(ex);
	}

	public ApiError(HttpStatus status, String message, String debugMessage) {
		this();
		this.status = status;
		this.message = message;
		this.debugMessage = debugMessage;
	}

	public ApiError(HttpStatus status, String message, String debugMessage, Throwable ex) {
		this();
		this.status = status;
		this.message = message;
		this.debugMessage = debugMessage;
		setException(ex);
	}

	private void setException(Throwable ex) {
		this.exception = ex.getMessage();
	}

	public JsonNode toJson() {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode errorResponse = objectMapper.createObjectNode();
		errorResponse.put("errorType", "Internal Server Error");
		ArrayNode errors = objectMapper.createArrayNode();
		ObjectNode error = objectMapper.createObjectNode();
		error.put("errorType", "Internal Server Error");
		error.put("message", message);
		error.put("developerText", debugMessage);
		error.put("exception", exception);
		errors.add(error);
		errorResponse.set("errors", errors);
		return errorResponse;
	}*/

}