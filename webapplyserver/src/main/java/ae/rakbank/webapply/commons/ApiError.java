package ae.rakbank.webapply.commons;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ApiError {

    public static final String timestampPattern = "yyyy-MM-dd HH:mm:ss,SSS";

	private HttpStatus status;
	private Integer statusCode;
	private String timestamp;
	private String message;
	private String debugMessage;
	private String errorType;
	private String errors;
	private String exceptionClassName;
	private StackTraceElement[] stackTrace;

	private ApiError() {
		initTimestamp();
	}

	public ApiError(HttpStatus status) {
		this();
		initTimestamp();
		this.status = status;
		this.statusCode = status.value();
	}

	public ApiError(HttpStatus status, Throwable ex) {
		this();
		initTimestamp();
		this.status = status;
		this.statusCode = status.value();
		this.message = "Unexpected error";
		setException(ex);
	}

	public ApiError(HttpStatus status, String message, String debugMessage) {
		this();
		initTimestamp();
		this.status = status;
		this.statusCode = status.value();
		this.message = message;
		this.debugMessage = debugMessage;
	}

	public ApiError(HttpStatus status, String message, String debugMessage, Throwable ex) {
		this();
		initTimestamp();
		this.status = status;
		this.statusCode = status.value();
		this.message = message;
		this.debugMessage = debugMessage;
		setException(ex);
	}

	public void initTimestamp() {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern(timestampPattern);
		timestamp = LocalDateTime.now().format(formatter);
	}

	private void setException(Throwable ex) {
		this.exceptionClassName = ex.getClass().getSimpleName();
		this.message = ex.getMessage();
		this.stackTrace = ex.getStackTrace();
	}

	public String toJsonString() throws JsonProcessingException {
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(this);
	}


	//Legacy implementation, not all the fields used
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
		error.put("exceptionClassName", exceptionClassName);
		errors.add(error);
		errorResponse.set("errors", errors);
		return errorResponse;
	}
}
