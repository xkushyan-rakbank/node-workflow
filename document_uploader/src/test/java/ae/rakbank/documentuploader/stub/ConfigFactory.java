package ae.rakbank.documentuploader.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ConfigFactory {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static JsonNode newOtherConfig() {
        return objectMapper.createObjectNode()
                .set("OtherConfigs", objectMapper.createObjectNode()
                        .set("local", objectMapper.createObjectNode()
                                .put("OAuthUsername", "testName1")
                                .put("OAuthPassword", "myPass")
                                .put("JwtSecret", "1234")));
    }
}
