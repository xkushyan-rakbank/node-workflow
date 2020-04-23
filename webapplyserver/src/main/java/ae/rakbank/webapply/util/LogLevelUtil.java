package ae.rakbank.webapply.util;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

import static ae.rakbank.webapply.constants.ConfigurationKeys.APPLICATION_LOGGING_LEVEL;
import static ae.rakbank.webapply.constants.ConfigurationKeys.OTHER_CONFIGS;


@Slf4j
@Component
@RequiredArgsConstructor
public class LogLevelUtil {

    private final FileUtil fileUtil;

    @SuppressWarnings("Duplicates")
    @PostConstruct
    public void init() {

        Level loggingLevel = Level.INFO;

        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        JsonNode jsonNode = appConfigJSON.get(OTHER_CONFIGS)
                .get(EnvUtil.getEnv()).get(APPLICATION_LOGGING_LEVEL);
        if (jsonNode != null) {
            loggingLevel = Level.valueOf(jsonNode.asText());
        }

        String logDestination = "ae.rakbank.documentuploader";

        Logger applicationLevel = ((Logger)LoggerFactory.getLogger(logDestination));
        applicationLevel.setLevel(loggingLevel);

        log.info("Current Application log level is {}", loggingLevel);
    }
}
