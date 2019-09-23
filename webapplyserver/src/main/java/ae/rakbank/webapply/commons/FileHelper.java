package ae.rakbank.webapply.commons;

import java.io.IOException;

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
public class FileHelper {

	private static final Logger logger = LoggerFactory.getLogger(FileHelper.class);

	@Autowired
	private ResourceLoader resourceLoader;

	public JsonNode loadJSONFile(String filename) {
		try {
			logger.info("loading " + filename);
			ObjectMapper objectMapper = new ObjectMapper();
			Resource resource = resourceLoader.getResource("classpath:" + filename);
			System.out.println(resource.getFile().toString());
			String fileContent = FileUtils.readFileToString(resource.getFile(), "UTF-8");
			return objectMapper.readTree(fileContent);
		} catch (IOException e) {
			logger.error("error loading " + filename, e);
		}
		return null;
	}

}
