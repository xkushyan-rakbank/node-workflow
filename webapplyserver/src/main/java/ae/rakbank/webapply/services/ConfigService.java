package ae.rakbank.webapply.services;

import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import java.io.IOException;

@Slf4j
@Service
@RequiredArgsConstructor
public class ConfigService {

    private final FileUtil fileUtil;
    private final ServletContext servletContext;

    private JsonNode smeProspectJSON = null;
    private JsonNode appConfigJSON = null;

    @PostConstruct
    public void init() {
        appConfigJSON = fileUtil.getAppConfigJSON();
        smeProspectJSON = fileUtil.getSMEProspectJSON();
    }

    public JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist) {
        log.info("Begin buildAppInitialState() method");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode initStateJSON = objectMapper.createObjectNode();
        initStateJSON.set("prospect", getProspect(segment));

        boolean recaptchaEnable = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaEnable").asText("N").equals("Y");
        String recaptchaSiteKey = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSiteKey").asText();
        JsonNode baseUrls = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv());
        boolean lemniskEnable = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("LemniskEnable").asText("N").equals("Y");
        initStateJSON.put("reCaptchaSiteKey", recaptchaSiteKey);
        initStateJSON.set("datalist", datalist);
        initStateJSON.put("recaptchaEnable", recaptchaEnable);
        initStateJSON.put("termsConditionsUrl", baseUrls.get("TermsConditionsUrl").asText());
        initStateJSON.put("servicePricingGuideUrl", baseUrls.get("ServicePricingGuideUrl").asText());
        initStateJSON.put("rakValuePlusReadMoreUrl", baseUrls.get("RAKvaluePlusReadMoreUrl").asText());
        initStateJSON.put("rakValueMaxReadMoreUrl", baseUrls.get("RAKvalueMaxReadMoreUrl").asText());
        initStateJSON.put("rakValuePlusIslamicReadMoreUrl", baseUrls.get("RAKvaluePlusIslamicReadMoreUrl").asText());
        initStateJSON.put("rakValueMaxIslamicReadMoreUrl", baseUrls.get("RAKvalueMaxIslamicReadMoreUrl").asText());
        initStateJSON.put("lemniskEnable", lemniskEnable);

        String cacheKey = getCacheKey(segment, product, role, device);
        String configJSON = initStateJSON.toString();

        setCache(cacheKey, configJSON);

        log.info("End buildAppInitialState() method");
        return initStateJSON;
    }

    public ResponseEntity<JsonNode> getCachedData(HttpHeaders headers, String cacheKey, String cachedValue) {
        log.info("cached data found for key - " + cacheKey);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode cachedJson;
        try {
            cachedJson = mapper.readTree(cachedValue);
        } catch (IOException e) {
            throw new ApiException("Failed to parse cached data, the data: " + cachedValue, e);
        }
        return new ResponseEntity<>(cachedJson, headers, HttpStatus.OK);
    }

    public String getCacheKey(String segment, String product, String role, String device, String suffix) {
        if (suffix != null) {
            return String.join("_", segment, product, role, device, suffix).toUpperCase().replace(" ", "_");
        } else {
            return String.join("_", segment, product, role, device).toUpperCase().replace(" ", "_");
        }
    }

    public String getCache(String key) {
        log.info("retrieve data from cache for key - " + key);
        return (String) servletContext.getAttribute(key);
    }

    private void setCache(String key, String data) {
        log.info("adding data to cache key - " + key);
        servletContext.setAttribute(key, data);
    }

    private String getCacheKey(String segment, String product, String role, String device) {
        return getCacheKey(segment, product, role, device, null);
    }

    private JsonNode getProspect(String segment) {
        if ("sme".equalsIgnoreCase(segment)) {
            return smeProspectJSON;
        }
        return null;
    }
}
