package ae.rakbank.webapply.util;

import ae.rakbank.webapply.exception.StartUpException;
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

import static ae.rakbank.webapply.constants.MandatoryVariables.*;
import static ae.rakbank.webapply.util.FileUtil.APP_CONFIG_JSON;

@Slf4j
@Component
@RequiredArgsConstructor
public class StartUpValidator {

    private final FileUtil fileUtil;

    private ObjectMapper mapper;
    private String currentEnv = EnvUtil.getEnv();
    private List<String> errors;
    private Map<String, String> baseURLs;
    private Map<String, String> dehURIs;
    private Map<String, String> oAuthURIs;
    private Map<String, String> reCaptchaURIs;
    private Map<String, String> rsaPublicKeyURIs;
    private Map<String, String> otherConfigs;

    @PostConstruct
    public void init() {
        log.info("Current environment is {}", currentEnv);
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        mapper = new ObjectMapper();
        errors = new ArrayList<>();
        validateEnvAndSource(appConfigJSON);
        validateVariables(appConfigJSON);
        if (!errors.isEmpty()) {
            throw new StartUpException(String.join(", ", errors));
        }
    }

    private void validateEnvAndSource(JsonNode appConfigJSON) {
        if (StringUtils.isEmpty(currentEnv)) {
            errors.add("the environment is not defined");
        }
        if (appConfigJSON == null || appConfigJSON instanceof NullNode) {
            errors.add("the source file '" + APP_CONFIG_JSON + "' with mandatory variables is not defined");
        }
        if (!errors.isEmpty()) {
            throw new StartUpException(String.join(", ", errors));
        }
    }

    private void validateVariables(JsonNode appConfigJSON) {
        try {
            validateBaseURLs(appConfigJSON);
            validateDehURIs(appConfigJSON);
            validateOAuthURIs(appConfigJSON);
            validateReCaptchaURIs(appConfigJSON);
            validateRsaPublicKeyURIs(appConfigJSON);
            validateOtherConfigs(appConfigJSON);
        } catch (NullPointerException e) {
            throw new StartUpException("some of json root key is absent!");
        }
    }

    private void validateBaseURLs(JsonNode appConfigJSON) {
        baseURLs = mapper.convertValue(appConfigJSON.get("BaseURLs").get(currentEnv), Map.class);
        validateMap(BASE_URLS_LIST, baseURLs);
    }

    private void validateDehURIs(JsonNode appConfigJSON) {
        dehURIs = mapper.convertValue(appConfigJSON.get("DehURIs"), Map.class);
        validateMap(DEH_URIS_LIST, dehURIs);
    }

    private void validateOAuthURIs(JsonNode appConfigJSON) {
        oAuthURIs = mapper.convertValue(appConfigJSON.get("OAuthURIs"), Map.class);
        validateMap(OAUTH_URIS_LIST, oAuthURIs);
    }

    private void validateReCaptchaURIs(JsonNode appConfigJSON) {
        reCaptchaURIs = mapper.convertValue(appConfigJSON.get("ReCaptchaURIs"), Map.class);
        validateMap(RE_CAPTCHA_URIS_LIST, reCaptchaURIs);
    }

    private void validateRsaPublicKeyURIs(JsonNode appConfigJSON) {
        rsaPublicKeyURIs = mapper.convertValue(appConfigJSON.get("RSAPublicKeyURIs"), Map.class);
        validateMap(RSA_PUBLIC_KEY_URIS_LIST, rsaPublicKeyURIs);
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
