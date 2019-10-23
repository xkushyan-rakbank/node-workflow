package ae.rakbank.webapply.commons;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ApiError {

	private HttpStatus status;
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;
	private String message;
	private String debugMessage;
	private String exception;

	private ApiError() {
		timestamp = LocalDateTime.now();
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

	public String getException() {
		if (!EnvUtil.isProd()) {
			return exception;
		}
		return null;
	}

	public JsonNode toJson() {
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