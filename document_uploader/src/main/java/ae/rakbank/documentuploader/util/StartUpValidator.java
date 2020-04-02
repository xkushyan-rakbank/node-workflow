package ae.rakbank.documentuploader.util;

import ae.rakbank.documentuploader.exception.StartUpException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.NullNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static ae.rakbank.documentuploader.constants.MandatoryVariables.BASE_URLS_LIST;
import static ae.rakbank.documentuploader.constants.MandatoryVariables.OTHER_CONFIGS_LIST;
import static ae.rakbank.documentuploader.util.FileUtil.APP_CONFIG_JSON;

@Slf4j
@Component
@RequiredArgsConstructor
public class StartUpValidator {

    private final FileUtil fileUtil;

    private ObjectMapper mapper;
    private String currentEnv;
    private List<String> errors;
    private Map<String, String> baseURLs;
    private Map<String, String> otherConfigs;

    @PostConstruct
    public void init() {
        currentEnv = EnvUtil.getEnv();
        log.info("Current environment is {}", currentEnv);
        JsonNode docUploadConfigJson = fileUtil.getAppConfigJSON();
        mapper = new ObjectMapper();
        errors = new ArrayList<>();
        validateEnvAndSource(docUploadConfigJson);
        validateVariables(docUploadConfigJson);
        if (!errors.isEmpty()) {
            throw new StartUpException(String.join(", ", errors));
        }
    }

    private void validateEnvAndSource(JsonNode docUploadConfigJson) {
        if (StringUtils.isEmpty(currentEnv)) {
            errors.add("the environment is not defined");
        }
        if (docUploadConfigJson == null || docUploadConfigJson instanceof NullNode) {
            errors.add("the source file '" + APP_CONFIG_JSON + "' with mandatory variables is not defined");
        }
        if (!errors.isEmpty()) {
            throw new StartUpException(String.join(", ", errors));
        }
    }

    private void validateVariables(JsonNode appConfigJSON) {
        try {
            validateBaseURLs(appConfigJSON);
            validateOtherConfigs(appConfigJSON);
        } catch (NullPointerException e) {
            throw new StartUpException("some of json root key is absent!");
        }
    }

    private void validateBaseURLs(JsonNode appConfigJSON) {
        baseURLs = mapper.convertValue(appConfigJSON.get("BaseURLs").get(currentEnv), Map.class);
        validateMap(BASE_URLS_LIST, baseURLs);
    }

    private void validateOtherConfigs(JsonNode appConfigJSON) {
        otherConfigs = mapper.convertValue(appConfigJSON.get("OtherConfigs").get(currentEnv), Map.class);
        validateMap(OTHER_CONFIGS_LIST, otherConfigs);
    }

    private void validateMap(List<String> mandatoryVariables, Map<String, String> actualVariables) {
        mandatoryVariables.forEach(e -> {
            if (StringUtils.isEmpty(actualVariables.get(e))) {
                errors.add(e);
            }
        });
    }
}
