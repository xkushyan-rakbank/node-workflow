package ae.rakbank.documentuploader.stub.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;

public class FileUtilStub {

    public static JsonNode getAppConfigJSON() {
        InputStream inputStream = ClassLoader.getSystemResourceAsStream("DocUploadConfig.json");
        ObjectMapper mapper = new ObjectMapper();
        JsonNode appConfig = null;
        try {
            appConfig = mapper.readValue(inputStream, JsonNode.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return appConfig;
    }
}
