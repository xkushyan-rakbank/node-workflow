package ae.rakbank.webapply.commons;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Builder
@Getter
@AllArgsConstructor
public class ApiError {

	private HttpStatus status;
	private Integer statusCode;
	private String timestamp;
	private String message;
	private String debugMessage;
	private String exception;
	private StackTraceElement[] stackTrace;

	private ApiError() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
		timestamp = LocalDateTime.now().format(formatter);
	}

	public ApiError(HttpStatus status) {
		this();
		this.status = status;
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
		if (!EnvUtil.isProd()) {
			this.exception = ex.getMessage();
		}
	}

	ApiError(HttpStatus status, String message, Throwable ex) {
		this();
		this.status = status;
		this.message = message;
		setException(ex);
	}

	public String getDebugMessage() {
		if (!EnvUtil.isProd()) {
			return debugMessage;
		}
		return null;
	}

	public String getMessage() {
		return message;
	}
	public HttpStatus getStatus() {
		return status;
	}

	public void setStackTrace(StackTraceElement[] stackTrace) {
		this.stackTrace = stackTrace;
	}

	public String getException() {
		if (!EnvUtil.isProd()) {
			return exception;
		}
		return null;
	}

	public String toJsonString() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(this);
	}

	public JsonNode toJsonNode() {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode errorResponse = objectMapper.createObjectNode();
		errorResponse.put("errorType", status.name());
		errorResponse.put("httpStatus", status.toString());
		ArrayNode errors = objectMapper.createArrayNode();
		ObjectNode error = objectMapper.createObjectNode();
		error.put("errorType", "Internal Server Error");
		error.put("message", message);
		error.put("developerText", debugMessage);
		error.put("exception", exception);
		errors.add(error);
		errorResponse.set("errors", errors);
		return errorResponse;
	}
}