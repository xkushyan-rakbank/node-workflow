package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
public class ProspectsResponseStub {

    private ProspectsResponseStub() {
    }

    private static final String PROSPECTS_FILE = "prospects-body-response.json";
    private static final String ONE_PROSPECT_FILE = "one-prospect-response.json";

    public static ResponseEntity<Object> getProspectsResponse() {
        JsonNode jsonNode = readTestFile(PROSPECTS_FILE);
        if (jsonNode != null) {
            return ResponseEntity.status(200).body(jsonNode);
        }
        return null;
    }

    public static ResponseEntity<Object> getProspectsEmptyResponse() {
        JsonNode jsonNode = new ObjectMapper().createObjectNode().set("searchResult", null);
        return ResponseEntity.status(200).body(jsonNode);
    }

    public static ResponseEntity<Object> getOneProspectResponse() {
        JsonNode jsonNode = readTestFile(ONE_PROSPECT_FILE);
        if (jsonNode != null) {
            return ResponseEntity.status(200).body(jsonNode);
        }
        return null;
    }

    private static JsonNode readTestFile(String fileName) {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream(fileName);
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(is, JsonNode.class);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return null;
    }
}
