package ae.rakbank.webapply.util;

import ae.rakbank.webapply.commons.ApiError;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpStatusCodeException;

import java.io.IOException;

@Slf4j
@Component
public class DehUtil {

    public ApiError initApiError(HttpStatusCodeException e, HttpStatus status) {
        return initApiError(e, status, null);
    }

    public ApiError initApiError(HttpStatusCodeException e, HttpStatus status, String errorMessage) {
        String message;
        if (StringUtils.isEmpty(errorMessage)) {
            message = e.getMessage();
        } else {
            message = errorMessage;
        }
        ApiError apiError = ApiError.builder()
                .status(status)
                .statusCode(status.value())
                .message(message)
                .debugMessage(e.getResponseBodyAsString())
                .exceptionClassName(e.getClass().getSimpleName())
                .stackTrace(e.getStackTrace())
                .errorType(getErrorType(e))
                .errors(gerErrors(e))
                .build();
        apiError.initTimestamp();

        return apiError;
    }

    private String gerErrors(HttpStatusCodeException e) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(e.getResponseBodyAsString());
            return jsonNode.get("errors").toString();
        } catch (IOException e1) {
            log.warn("Can't parse errors from the response");
            return "";
        }
    }

    private String getErrorType(HttpStatusCodeException e) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(e.getResponseBodyAsString());
            return jsonNode.get("errorType").asText();
        } catch (IOException e1) {
            log.warn("Can't parse errorType from the response");
            return "";
        }
    }
}
