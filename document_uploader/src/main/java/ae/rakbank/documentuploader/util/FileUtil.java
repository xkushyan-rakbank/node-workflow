package ae.rakbank.documentuploader.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Slf4j
@Component
@RequiredArgsConstructor
public class FileUtil {

    private final ResourceLoader resourceLoader;
    private final EnvironmentUtil environmentUtil;

    private JsonNode docUploadConfig;

    @PostConstruct
    public void loadConfigFiles() {
        docUploadConfig = loadJSONFile("DocUploadConfig.json", true);
    }

    private JsonNode loadJSONFile(String filename, boolean fromConfigDirectory) {
        log.info("loading " + filename);
        ObjectMapper objectMapper = new ObjectMapper();
        String fileContent;
        File file = new File(environmentUtil.getConfigDir() + filename);
        try {
            if (fromConfigDirectory && file.exists()) {
                log.info("Read JSON file from {}{}", environmentUtil.getConfigDir(), filename);

                fileContent = FileUtils.readFileToString(new File(environmentUtil.getConfigDir() + filename),
                        StandardCharsets.UTF_8);
            } else {
                if (fromConfigDirectory) {
                    log.error(String.format("FileNotFoundException: Read JSON file from %s%s",
                            environmentUtil.getConfigDir(), filename));
                }
                log.info("Read JSON file from classpath:" + filename);

                Resource resource = resourceLoader.getResource("classpath:" + filename);
                fileContent = FileUtils.readFileToString(resource.getFile(), "UTF-8");
            }
            return objectMapper.readTree(fileContent);
        } catch (IOException e) {
            log.error("error loading " + filename, e);
        }
        return null;
    }

    public JsonNode getDocUploadConfigJson() {
        return docUploadConfig;
    }
}
