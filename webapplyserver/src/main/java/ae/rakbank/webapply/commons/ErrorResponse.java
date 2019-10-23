package ae.rakbank.webapply.commons;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class ErrorResponse {

	public static JsonNode createJsonResponse(HttpStatus status, String errorType, String message, String developerText,
			Exception exception) {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode errorResponse = objectMapper.createObjectNode();
		errorResponse.put("httpStatus", status.toString());
		errorResponse.put("errorType", StringUtils.defaultIfBlank(errorType, status.name()));
		ArrayNode errors = objectMapper.createArrayNode();
		ObjectNode error = objectMapper.createObjectNode();
		error.put("errorType", StringUtils.defaultIfBlank(errorType, status.name()));
		error.put("message", message);
		error.put("developerText", developerText);
		if (exception != null) {
			error.put("exception", exception.getMessage());
		}

		errors.add(error);
		errorResponse.set("errors", errors);
		return errorResponse;
	}
}
