package ae.rakbank.webapply.commons;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class FileHelper {

	private static final Logger logger = LoggerFactory.getLogger(FileHelper.class);

	@Autowired
	private ResourceLoader resourceLoader;

	public JsonNode loadJSONFile(String filename) {
		try {
			logger.info("loading " + filename);
			ObjectMapper objectMapper = new ObjectMapper();

			String fileContent = null;
			if (StringUtils.isNotBlank(EnvUtil.getConfigDir())) {
				logger.info("Read JSON file from classpath:" + EnvUtil.getConfigDir() + "/" + filename);
				fileContent = FileUtils.readFileToString(new File(EnvUtil.getConfigDir() + "/" + filename),
						StandardCharsets.UTF_8);
			} else {
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

	public JsonNode getUIConfigJSON() {
		return loadJSONFile("uiConfig.json");
	}

	public JsonNode getAppConfigJSON() {
		return loadJSONFile("appConfig.json");
	}

	public JsonNode getSMEProspectJSON() {
		return loadJSONFile("smeProspect.json");
	}

}
