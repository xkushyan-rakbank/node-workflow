package ae.rakbank.webapply.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;

import java.io.IOException;

@Slf4j
@Component
public class DehUtil {

    public String gerErrors(HttpStatusCodeException e) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(e.getResponseBodyAsString());
            return jsonNode.get("errors").asText();
        } catch (IOException e1) {
            log.warn("Can't parse errors from the response");
            return "";
        }
    }

    public String getErrorType(HttpStatusCodeException e) {
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
