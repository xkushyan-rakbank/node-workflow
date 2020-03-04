package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.io.InputStream;

@Slf4j
public class ProspectsResponseStub {

    private ProspectsResponseStub() {
    }

    private static final String TEST_DATA_FILE = "prospects-body-responce.json";

    public static ResponseEntity<Object> getProspectsResponse() {

        JsonNode jsonNode = readTestFile();
        if (jsonNode != null) {
            return ResponseEntity.status(200).body(jsonNode);
        }
        return null;
    }

    private static JsonNode readTestFile() {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream(TEST_DATA_FILE);
        ObjectMapper mapper = new ObjectMapper();

        try {
            return mapper.readValue(is, JsonNode.class);
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return null;
    }
}
