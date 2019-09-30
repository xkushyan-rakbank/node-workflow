package ae.rakbank.webapply.tasks;

import java.time.LocalDateTime;
import java.util.Iterator;

import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@Component
@EnableAsync
public class CSRFTokenTask {

	private static final Logger logger = LoggerFactory.getLogger(CSRFTokenTask.class);

	@Autowired
	ServletContext servletContext;

	@Async
	@Scheduled(cron = "0 0/5 * * * ?")
	public void scheduleFixedRateTaskAsync() throws InterruptedException {
		logger.info("Begin scheduleFixedRateTaskAsync(). Runs every 5min to remove expired CSRF tokens");
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode validTokens = objectMapper.createObjectNode();

		JsonNode csrfTokens = (JsonNode) servletContext.getAttribute("CSRFTokens");
		if (csrfTokens != null) {
			Iterator<String> tokensItr = csrfTokens.fieldNames();
			while (tokensItr.hasNext()) {
				String token = tokensItr.next();
				String expireDateTime = csrfTokens.get(token).asText();
				LocalDateTime expiry = LocalDateTime.parse(expireDateTime);
				if (LocalDateTime.now().isBefore(expiry)) {
					validTokens.put(token, expireDateTime);
				}
			}
			servletContext.setAttribute("CSRFTokens", validTokens);

		}
		logger.info(validTokens.size() + " CSRF tokens left in cache");
		logger.info("End scheduleFixedRateTaskAsync()");
	}

}
