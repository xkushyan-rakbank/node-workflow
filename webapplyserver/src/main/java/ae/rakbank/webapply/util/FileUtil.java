package ae.rakbank.webapply.util;

import java.io.File;
import java.nio.charset.StandardCharsets;

import org.apache.commons.io.FileUtils;
import org.springframework.util.StreamUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class FileUtil {

    private static final Logger logger = LoggerFactory.getLogger(FileUtil.class);

    @Autowired
    private ResourceLoader resourceLoader;

    public JsonNode getAppConfigJSON() {
        return loadJSONFile("appConfig.json", !EnvUtil.getEnv().equals("local"));
    }

    public JsonNode getSMEProspectJSON() {
        return loadJSONFile("smeProspect.json", false);
    }

    public JsonNode getDatalistJSON() {
        return loadJSONFile("datalist.json", false);
    }

    public String getRSAPublicKey() {
        return loadFileContents("public.key", !EnvUtil.getEnv().equals("local"));
    }

    public String getRSAPrivateKey() {
        return loadFileContents("private.key", !EnvUtil.getEnv().equals("local"));
    }

    private JsonNode loadJSONFile(String filename, boolean fromConfigDirectory) {
        String fileContent = loadFileContents(filename, fromConfigDirectory);

        if (fileContent == null) {
            return null;
        }
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readTree(fileContent);
        } catch (Exception e) {
            logger.error("error loading " + filename, e);
        }
        return null;
    }

    private String loadFileContents(String filename, boolean fromConfigDirectory) {
        try {
            if (fromConfigDirectory) {
                File file = new File(EnvUtil.getConfigDir() + filename);

                return FileUtils.readFileToString(file, StandardCharsets.UTF_8);
            } else {
                Resource resource = resourceLoader.getResource("classpath:" + filename);

                return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            }
        } catch (Exception e) {
            logger.error("error loading " + filename, e);
        }
        return null;
    }
}
