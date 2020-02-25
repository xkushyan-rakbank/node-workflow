package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.ConfigService;
import ae.rakbank.webapply.util.CriteriaParamsValidator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/config")
@RequiredArgsConstructor
public class ConfigController {

    private final DehClient dehClient;
    private final ConfigService configService;
    private final CriteriaParamsValidator paramsValidator;

    @Value("${build.date}")
    private String buildDate;
    @Value("${app.name}")
    private String appName;

    @PostConstruct
    public void init() {
        try {
            loadAppInitialState();
        } catch (Exception e) {
            log.error("error in preparing the config json and put the values in ServletContext", e);
        }
    }

    @GetMapping(value = "", produces = "application/json")
    public ResponseEntity<JsonNode> getWebApplyConfig(@RequestParam String role,
                                                      @RequestParam(required = false, defaultValue = "") String segment,
                                                      @RequestParam(required = false, defaultValue = "") String product,
                                                      @RequestParam(required = false, defaultValue = "desktop") String device) {
        log.info("Begin getWebApplyConfig() method");
        paramsValidator.validateCriteriaParams(segment, product, role, device);

        ResponseEntity<JsonNode> datalistResponse = dehClient.getDatalistJSON(segment);
        JsonNode datalistJSON;
        if (datalistResponse.getStatusCode().is2xxSuccessful()) {
            datalistJSON = datalistResponse.getBody();
        } else {
            return datalistResponse;
        }

        JsonNode webApplyConfig = configService.buildAppInitialState(segment, product, role, device, datalistJSON);
        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/reload", produces = "application/json")
    public ResponseEntity<JsonNode> loadAppInitialState() {
        log.info("reload config files and cache again");
        HttpHeaders headers = new HttpHeaders();

        // (Assumption) WebApply & MobileApply will have same set of fields otherwise
        // add "mobile" to devices array
        String[] devices = {"desktop"};
        String[] segments = {"sme"};
        String[] products = {"RAKstarter", "Current Account", "RAKelite"};
        String[] roles = {"customer", "agent"};
        for (String segment : segments) {
            ResponseEntity<JsonNode> datalistResponse = dehClient.getDatalistJSON(segment);
            if (datalistResponse == null) {
                throw new ApiException("No segment value with key: " + segment);
            }
            JsonNode datalistJSON;
            if (datalistResponse.getStatusCode().is2xxSuccessful()) {
                datalistJSON = datalistResponse.getBody();
            } else {
                return datalistResponse;
            }

            for (String device : devices) {
                for (String product : products) {
                    for (String role : roles) {
                        configService.buildAppInitialState(segment, product, role, device, datalistJSON);
                    }
                }
            }
        }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("message", "reload configs successful");

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/reduced", produces = "application/json")
    public ResponseEntity<JsonNode> getWebApplyConfigReduced(HttpServletRequest httpRequest,
                                                             @RequestParam String role,
                                                             @RequestParam(required = false, defaultValue = "") String segment,
                                                             @RequestParam(required = false, defaultValue = "") String product,
                                                             @RequestParam(required = false, defaultValue = "desktop") String device) {
        log.info("Begin getDatalist() method!");

        paramsValidator.validateCriteriaParams(segment, product, role, device);

        String cacheKey = configService.getCacheKey(segment, product, role, device, "reduced");
        String cachedValue = configService.getCache(cacheKey);
        HttpHeaders headers = new HttpHeaders();
        if (StringUtils.isNotBlank(cachedValue)) {
            return configService.getCachedData(headers, cacheKey, cachedValue);
        }

        ResponseEntity<JsonNode> datalistResponse = dehClient.getDatalistJSON(segment);
        JsonNode dataListJSON;
        if (datalistResponse != null && datalistResponse.getStatusCode().is2xxSuccessful()) {
            dataListJSON = datalistResponse.getBody();
        } else {
            return datalistResponse;
        }

        JsonNode webApplyConfig;
        webApplyConfig = configService.buildAppInitialState(segment, product, role, device, dataListJSON);

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
    }
}
