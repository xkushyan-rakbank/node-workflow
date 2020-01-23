package ae.rakbank.webapply.controllers;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.CSRFTokenHelper;
import ae.rakbank.webapply.helpers.FileHelper;
import ae.rakbank.webapply.services.LogFileService;
import ae.rakbank.webapply.services.OAuthService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class WebApplyController {

    private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

    @Value("${build.date}")
    private String buildDate;

    @Value("${app.name}")
    private String appName;

    @Autowired
    ServletContext servletContext;

    @Autowired
    FileHelper fileHelper;

    @Autowired
    OAuthService oauthClient;

    @Autowired
    CSRFTokenHelper csrfTokenHelper;

    @Autowired
    LogFileService logFileService;

    private JsonNode uiConfigJSON = null;

    private JsonNode appConfigJSON = null;

    private JsonNode smeProspectJSON = null;

    private String[] roles = {"customer", "agent"};

    private String[] products = {"RAKStarter", "Current Account", "RAKelite"};

    private String[] segments = {"sme", "retail"};

    private String[] devices = {"desktop", "mobile", "tablet"};

    private ObjectNode defaultDatalist = null;

    @PostConstruct
    public void initAppState() {
        uiConfigJSON = fileHelper.getUIConfigJSON();
        appConfigJSON = fileHelper.getAppConfigJSON();
        smeProspectJSON = fileHelper.getSMEProspectJSON();
        defaultDatalist = new ObjectMapper().createObjectNode();
        defaultDatalist.setAll((ObjectNode) fileHelper.getDatalistJSON());

        try {
            loadAppInitialState();
        } catch (Exception e) {
            logger.error("error in preparing the config json and put the values in ServletContext", e);
        }
    }

    private String validCriteriaParams(String segment, String product, String role, String device) {
        if (StringUtils.isNotBlank(segment) && !ArrayUtils.contains(segments, segment)) {
            return String.format("'%s' is invalid, allowed values [%s]", segment, ArrayUtils.toString(segments));
        }
        if (StringUtils.isNotBlank(product) && !ArrayUtils.contains(products, product)) {
            return String.format("'%s' is invalid, allowed values [%s]", product, ArrayUtils.toString(products));
        }
        if (StringUtils.isNotBlank(role) && !ArrayUtils.contains(roles, role)) {
            return String.format("'%s' is invalid, allowed values [%s]", role, ArrayUtils.toString(roles));
        }
        if (StringUtils.isNotBlank(device) && !ArrayUtils.contains(devices, device)) {
            return String.format("'%s' is invalid, allowed values [%s]", device, ArrayUtils.toString(devices));
        }

        return null;
    }

    @GetMapping(value = "/health", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> health() {
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("buildDate", buildDate);
        if (!EnvUtil.isProd()) {
            response.put("project", appName);
        }
        return new ResponseEntity<Object>(response, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/config", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> getWebApplyConfig(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                      @RequestParam String role,
                                                      @RequestParam(required = false, defaultValue = "") String segment,
                                                      @RequestParam(required = false, defaultValue = "") String product,
                                                      @RequestParam(required = false, defaultValue = "desktop") String device)
    throws Exception {
        logger.info("Begin getWebApplyConfig() method");

        String invalidCriteriaError = validCriteriaParams(segment, product, role, device);
        if (StringUtils.isNotBlank(invalidCriteriaError)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "Invalid segment, product or role.",
                    invalidCriteriaError);
            return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createCSRFToken(httpRequest, headers);

        String cacheKey = getCacheKey(segment, product, role, device);
        String cachedValue = getCache(cacheKey);
        if (StringUtils.isNotBlank(cachedValue)) {
            logger.info("cached data found for key - " + cacheKey);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode cachedJson = mapper.readTree(cachedValue);
            return new ResponseEntity<JsonNode>(cachedJson, headers, HttpStatus.OK);
        }

        ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment);
        JsonNode datalistJSON = null;
        if (datalistResponse.getStatusCode().is2xxSuccessful()) {
            datalistJSON = datalistResponse.getBody();
        }
        else {
            return datalistResponse;
        }

        JsonNode webApplyConfig = null;
        try {
            webApplyConfig = buildAppInitialState(segment, product, role, device, datalistJSON, httpRequest.getAttribute("authorizationToken"));
        }
        catch (IOException e) {
            logger.error("error occured while loading config files", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
            return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<JsonNode>(webApplyConfig, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/config/reduced", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> getWebApplyConfigReduced(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                @RequestParam String role,
                                                @RequestParam(required = false, defaultValue = "") String segment,
                                                @RequestParam(required = false, defaultValue = "") String product,
                                                @RequestParam(required = false, defaultValue = "desktop") String device)
    throws Exception {
        logger.info("Begin getDatalist() method!");

        String invalidCriteriaError = validCriteriaParams(segment, product, role, device);
        if (StringUtils.isNotBlank(invalidCriteriaError)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "Invalid segment, product or role.",
                    invalidCriteriaError);
            return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createCSRFToken(httpRequest, headers);

        String cacheKey = getCacheKey(segment, product, role, device, "reduced");
        String cachedValue = getCache(cacheKey);
        if (StringUtils.isNotBlank(cachedValue)) {
            logger.info("cached data found for key - " + cacheKey);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode cachedJson = mapper.readTree(cachedValue);
            return new ResponseEntity<JsonNode>(cachedJson, headers, HttpStatus.OK);
        }

        ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment);

        JsonNode datalistJSON = null;
        if (datalistResponse.getStatusCode().is2xxSuccessful()) {
            datalistJSON = datalistResponse.getBody();
        }
        else {
            return datalistResponse;
        }

        JsonNode webApplyConfig = null;
        try {
            webApplyConfig = buildAppInitialState(segment, product, role, device, datalistJSON,
                    httpRequest.getAttribute("authorizationToken"), false);
        }
        catch (IOException e) {
            logger.error("error occured while loading config files", e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
            return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<JsonNode>(webApplyConfig, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/config/reload", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> loadAppInitialState() {
        logger.info("reload config files and cache again");
        HttpHeaders headers = new HttpHeaders();
        // (Assumption) WebApply & MobileApply will have same set of fields otherwise
        // add "mobile" to devices array
        String[] devices = {"desktop"};
        String[] segments = {"sme"};
        String[] products = {"RAKStarter", "Current Account", "RAKelite"};
        String[] roles = {"customer", "agent"};
        for (String segment : segments) {
            ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment);
            JsonNode datalistJSON = null;
            if (datalistResponse.getStatusCode().is2xxSuccessful()) {
                datalistJSON = datalistResponse.getBody();
            } else {
                return datalistResponse;
            }

            for (String device : devices) {
                for (String product : products) {
                    for (String role : roles) {
                        try {
                            buildAppInitialState(segment, product, role, device, datalistJSON, null);

                        } catch (Exception e) {
                            logger.error(String.format(
                                    "unable load/reload config for web apply for device=[%s] segment=[%s], product=[%s], role=[%s]",
                                    device, segment, product, role));
                            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
                            return new ResponseEntity<JsonNode>(error.toJson(), headers,
                                    HttpStatus.INTERNAL_SERVER_ERROR);
                        }
                    }
                }
            }
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("message", "reload configs successful");
        return new ResponseEntity<JsonNode>(response, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/datalist", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> proxiDatalist(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                  @RequestParam(required = false, defaultValue = "") String segment) {
        return getDatalistJSON(segment);
    }

    @GetMapping(value = "/logfile/names")
    public ResponseEntity loadLogs() {
        List<String> logFileNameList = logFileService.getLogFileNameList();
        return new ResponseEntity<List>(logFileNameList, null, HttpStatus.OK);
    }

    @GetMapping(value = "/logfile/download")
    public ResponseEntity loadLogs(@RequestParam(required = false) String fileName) {
        File fileServerLogs = logFileService.getLogFile(fileName);
        FileInputStream fileInputStream = null;
        try {
            fileInputStream = new FileInputStream(fileServerLogs);
        } catch (IOException ioe) {
            logger.error("Error download log file {}: ", fileName, ioe.getMessage());
            ObjectNode objectNode = new ObjectMapper().createObjectNode();
            objectNode.put("error", ioe.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(objectNode);
        }
        return ResponseEntity.ok().contentLength(fileServerLogs.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(new InputStreamResource(fileInputStream));
    }

    private JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist,
                                          Object authToken) throws Exception {
        return buildAppInitialState(segment, product, role, device, datalist, authToken, true);
    }

    private JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist,
                                          Object authToken, boolean includeUiConfig) throws Exception {
        logger.info("Begin buildAppInitialState() method");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode initStateJSON = objectMapper.createObjectNode();

        setWebApplyEndpoints(objectMapper, initStateJSON, role);
        initStateJSON.set("prospect", getProspect(segment, product));

        String recaptchaSiteKey = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSiteKey").asText();
        JsonNode baseUrls = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv());
        initStateJSON.put("reCaptchaSiteKey", recaptchaSiteKey);
        initStateJSON.put("termsConditionsUrl", baseUrls.get("TermsConditionsUrl").asText());
        initStateJSON.put("servicePricingGuideUrl", baseUrls.get("ServicePricingGuideUrl").asText());
        initStateJSON.put("rakValuePlusReadMoreUrl", baseUrls.get("RAKvaluePlusReadMoreUrl").asText());
        initStateJSON.put("rakValueMaxReadMoreUrl", baseUrls.get("RAKvalueMaxReadMoreUrl").asText());
        initStateJSON.put("rakValuePlusIslamicReadMoreUrl", baseUrls.get("RAKvaluePlusIslamicReadMoreUrl").asText());
        initStateJSON.put("rakValueMaxIslamicReadMoreUrl", baseUrls.get("RAKvalueMaxIslamicReadMoreUrl").asText());

        String publicKey = fileHelper.getRSAPublicKey();

        if (publicKey != null) {
            initStateJSON.put("rsaPublicKey", publicKey);
        }

        if (authToken != null && authToken != "") {
            initStateJSON.put("authorizationToken", authToken.toString());
        }

        // deep clone the json nodes
        String uiConfig = objectMapper.writeValueAsString(uiConfigJSON);
        JsonNode uiConfigNode = objectMapper.readTree(uiConfig);

        String cacheKey = getCacheKey(segment, product, role, device);
        if (includeUiConfig) {
            ObjectNode uiFieldsObjNode = filterUIConfigFieldsByCriteria((ObjectNode) uiConfigNode, segment, product,
                    role, device, datalist);
            initStateJSON.set("uiConfig", uiFieldsObjNode);
        }
        else {
            cacheKey = cacheKey + "_REDUCED";
        }

        String configJSON = initStateJSON.toString();
        setCache(cacheKey, configJSON);

        logger.info("End buildAppInitialState() method");

        return initStateJSON;
    }

    private void setWebApplyEndpoints(ObjectMapper objectMapper, ObjectNode initStateJSON, String role) {

        logger.info("Begin setWebApplyEndpoints() method");
        ObjectNode endpointsJSON = objectMapper.createObjectNode();
        endpointsJSON.put("baseUrl",
                appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("WebApplyBaseUrl").asText());
        JsonNode webApplyURIs = appConfigJSON.get("WebApplyURIs");
        Iterator<String> uris = webApplyURIs.fieldNames();
        while (uris.hasNext()) {
            String uriName = uris.next();
            endpointsJSON.set(uriName, webApplyURIs.get(uriName));
        }

        // remove agent specific URIs
        String[] agentURIs = {"authenticateUserUri"};
        if (StringUtils.isBlank(role) || StringUtils.equalsIgnoreCase("customer", role)) {
            for (String uri : agentURIs) {
                endpointsJSON.remove(uri);
            }
        }
        initStateJSON.set("endpoints", endpointsJSON);
        logger.info("End setWebApplyEndpoints() method");
    }

    private ObjectNode filterUIConfigFieldsByCriteria(ObjectNode uiConfigNode, String segment, String product,
                                                      String role, String device, JsonNode datalist) {
        logger.info("Begin filterUIConfigFieldsByCriteria() method");

        Iterator<Entry<String, JsonNode>> fields = uiConfigNode.fields();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode uiFields = objectMapper.createObjectNode();
        while (fields.hasNext()) {
            Entry<String, JsonNode> entry = fields.next();
            String uid = entry.getKey();

            try {

                ObjectNode fieldConfig = (ObjectNode) entry.getValue();
                boolean applicable = fieldConfig.has("label") && !fieldConfig.get("label").isNull()
                        && matchCriteria(fieldConfig, segment, product, role, device);
                if (applicable) {
                    fieldConfig.put("applicable", true);
                    fieldConfig.remove("criteria");
                    uiFields.set(uid, fieldConfig);

                    if (fieldConfig.has("datalistId")) {
                        if (fieldConfig.get("datalistId").isNull()) {
                            fieldConfig.remove("datalistId");
                        } else if (datalist != null) {
                            String groupId = fieldConfig.get("datalistId").asText();

                            if (datalist.has(groupId)) {
                                fieldConfig.set("datalist", datalist.get(groupId));
                            } else {
                                String label = fieldConfig.get("label").asText();
                                logger.error(String.format(
                                        "LOVs not found in getDatalist API response for datalistId=[%s], label=[%s]",
                                        groupId, label));
//								throw new Exception(String.format(
//										"LOVs not found in getDatalist API response for datalistId=[%s], label=[%s]",
//										groupId, label));
                            }

                        }

                    }

                    if (fieldConfig.has("readonlyFor") && (fieldConfig.get("readonlyFor").isNull()
                            || fieldConfig.get("readonlyFor").size() == 0)) {
                        fieldConfig.remove("readonlyFor");
                    }

                    if (fieldConfig.has("shortKeyNames")) {
                        fieldConfig.remove("shortKeyNames");
                    }

                    if (fieldConfig.has("description")) {
                        fieldConfig.remove("description");
                    }
                }
            } catch (Exception e) {
                logger.error("Error while processing UID= " + uid, e);
            }

        }

        logger.info("End filterUIConfigFieldsByCriteria() method");

        return uiFields;

    }

    private boolean matchCriteria(JsonNode fieldConfig, String segment, String product, String role, String device) {
        if (fieldConfig.has("criteria")) {
            JsonNode criteria = fieldConfig.get("criteria");
            boolean roleMatched = true;
            boolean segmentMatched = true;
            boolean productMatched = true;
            boolean deviceMatched = true;

            if (criteria.has("roles")) {
                List<String> roles = new ArrayList<>();
                criteria.get("roles").forEach(node -> roles.add(node.asText()));
				roleMatched = roles.isEmpty() || (StringUtils.isNotBlank(role) && roles.contains(role));
            }

            if (criteria.has("segments")) {
                List<String> segments = new ArrayList<>();
                criteria.get("segments").forEach(node -> segments.add(node.asText()));
				segmentMatched = segments.isEmpty() || (StringUtils.isNotBlank(segment) && segments.contains(segment));
            }

            if (criteria.has("products")) {
                List<String> products = new ArrayList<>();
                criteria.get("products").forEach(node -> products.add(node.asText()));
				productMatched = products.isEmpty() || (StringUtils.isNotBlank(product) && products.contains(product));
            }

            if (criteria.has("devices")) {
                List<String> devices = new ArrayList<>();
                criteria.get("devices").forEach(node -> devices.add(node.asText()));
				deviceMatched = devices.isEmpty() || (StringUtils.isNotBlank(device) && devices.contains(device));
            }
            return roleMatched && segmentMatched && productMatched && deviceMatched;

        }

        return true;
    }

    private String getCache(String key) {
        logger.info("retrieve data from cache for key - " + key);
        return (String) servletContext.getAttribute(key);
    }

    private void setCache(String key, String data) {
        logger.info("adding data to cache key - " + key);
        servletContext.setAttribute(key, data);

    }

    private JsonNode getProspect(String segment, String product) {
        if ("sme".equalsIgnoreCase(segment)) {
            return smeProspectJSON;
        }
        return null;
    }

    private ResponseEntity<JsonNode> getDatalistJSON(String segment) {
        logger.info("Begin getDatalistJSON() method, segment=" + segment);

        if (StringUtils.isBlank(segment)) {
            logger.info("segment is null, return defaultDatalist");
            return new ResponseEntity<JsonNode>(defaultDatalist, null, HttpStatus.OK);
        }

        String methodName = "getDatalistJSON()";

        ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

        if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

            RestTemplate restTemplate = new RestTemplate();

            String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
            JsonNode dehURIs = appConfigJSON.get("DehURIs");
            String url = dehBaseUrl + dehURIs.get("datalistUri").asText();

            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
            url = uriComponents.toString();

            HttpHeaders headers = oauthClient.getOAuthHeaders(oauthResponse, MediaType.APPLICATION_JSON);
            HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);

            logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", methodName, url));
            logger.info(String.format("Endpoint=[%s], request=%s", url, request.toString()));

            ResponseEntity<JsonNode> response = null;

            try {
                response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);
            } catch (HttpClientErrorException e) {
                logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                        e.getResponseBodyAsString()), e);
                ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getResponseBodyAsString(),
                        e.getResponseBodyAsString(), e);
                return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.BAD_REQUEST);
            } catch (HttpServerErrorException e) {
                logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                        e.getResponseBodyAsString()), e);
                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        e.getResponseBodyAsString(), e);
                return new ResponseEntity<JsonNode>(error.toJson(), null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            ObjectNode datalist = (ObjectNode) response.getBody();
            datalist.setAll((ObjectNode) fileHelper.getDatalistJSON());
            populateDefaultDatalist(datalist);

            logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s]",
                    methodName, url, response.getStatusCodeValue()));

            return new ResponseEntity<JsonNode>(datalist, null, HttpStatus.OK);
        }
        else {
            logger.error("Unable to call datalist API due to oauth error.");
            return oauthResponse;
        }
    }

    private void populateDefaultDatalist(JsonNode datalist) {
        if (datalist != null) {
            defaultDatalist.set("countryCode", datalist.get("countryCode"));
        }
        logger.info("defaultDatalist size = " + defaultDatalist.size());
    }

    private String getCacheKey(String segment, String product, String role, String device) {
        return getCacheKey(segment, product, role, device, null);
    }

    private String getCacheKey(String segment, String product, String role, String device, String suffix) {
        if (suffix != null) {
            return String.join("_", segment, product, role, device, suffix).toUpperCase().replace(" ", "_");
        }
        else {
            return String.join("_", segment, product, role, device).toUpperCase().replace(" ", "_");
        }
    }
}
