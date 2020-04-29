package ae.rakbank.webapply.util;

import ae.rakbank.webapply.dto.ApiError;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.List;

@Slf4j
@Component
public class DehUtil {

    private static final String CHANNEL_CONTEXT = "ChannelContext";

    public ApiError initApiError(HttpStatusCodeException e, HttpStatus status) {
        ApiError apiError = ApiError.builder()
                .status(status)
                .statusCode(status.value())
                .message("Error response from DEH Server")
                .debugMessage(e.getResponseBodyAsString())
                .exceptionClassName(e.getClass().getSimpleName())
                .stackTrace(e.getStackTrace())
                .errorType(getErrorType(e))
                .errors(gerErrors(e))
                .build();
        apiError.initTimestamp();

        return apiError;
    }

    @SuppressWarnings("all")
    private JsonNode gerErrors(HttpStatusCodeException e) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            if (e.getResponseHeaders() !=null && e.getResponseHeaders().get(CHANNEL_CONTEXT) != null) {
                List<String> channelContext = e.getResponseHeaders().get(CHANNEL_CONTEXT);
                return mapper.readTree(channelContext.get(0)).get("errors");
            } else {
                return mapper.readTree(e.getResponseBodyAsString()).get("errors");
            }
        } catch (Exception e1) {
            log.warn("Can't parse errors from the response", e1);
            return null;
        }
    }

    @SuppressWarnings("all")
    private String getErrorType(HttpStatusCodeException e) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            if (e.getResponseHeaders() !=null && e.getResponseHeaders().get(CHANNEL_CONTEXT) != null) {
                List<String> channelContext = e.getResponseHeaders().get(CHANNEL_CONTEXT);
                return mapper.readTree(channelContext.get(0)).get("errorType").asText();
            } else if (e.getResponseHeaders() != null){
                return mapper.readTree(e.getResponseBodyAsString()).get("errorType").asText();
            }
        } catch (Exception e1) {
            log.warn("Can't parse errorType from the response", e1);
        }
        return "";
    }
}
