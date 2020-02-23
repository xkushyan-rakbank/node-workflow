package ae.rakbank.documentuploader.util;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
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

	@Autowired
	private EnvironmentUtil environmentUtil;

	private JsonNode docUploadConfig;

	public JsonNode loadJSONFile(String filename, boolean fromConfigDirectory) {
		try {
			logger.info("loading " + filename);
			ObjectMapper objectMapper = new ObjectMapper();

			String fileContent = null;

			File file = new File(environmentUtil.getConfigDir() + filename);
			if (fromConfigDirectory && file.exists()) {
				logger.info(String.format("Read JSON file from %s%s", environmentUtil.getConfigDir(), filename));

				fileContent = FileUtils.readFileToString(new File(environmentUtil.getConfigDir() + filename),
						StandardCharsets.UTF_8);
			} else {
				if (fromConfigDirectory) {
					logger.error(String.format("FileNotFoundException: Read JSON file from %s%s",
							environmentUtil.getConfigDir(), filename));
				}

				logger.info("Read JSON file from classpath:" + filename);

				Resource resource = resourceLoader.getResource("classpath:" + filename);
				fileContent = FileUtils.readFileToString(resource.getFile(), "UTF-8");
			}
			return objectMapper.readTree(fileContent);
		} catch (IOException e) {
			logger.error("error loading " + filename, e);
		}
		return null;
	}

	@PostConstruct
	public void loadConfigFiles() {
		docUploadConfig = loadJSONFile("DocUploadConfig.json", true);
	}

	public JsonNode getDocUploadConfigJson() {
		return docUploadConfig;
	}

}