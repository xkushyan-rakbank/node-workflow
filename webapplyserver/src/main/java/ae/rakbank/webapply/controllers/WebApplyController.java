package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.CSRFTokenHelper;
import ae.rakbank.webapply.helpers.FileHelper;
import ae.rakbank.webapply.services.RecaptchaService;

import static ae.rakbank.webapply.constants.AuthConstants.JWT_TOKEN_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.RECAPTCHA_TOKEN_REQUEST_KEY;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class WebApplyController {

    private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

    @Value("${build.date}")
    private String buildDate;
    @Value("${app.name}")
    private String appName;

    private final FileHelper fileHelper;
    private final RecaptchaService captchaService;
    private final CSRFTokenHelper csrfTokenHelper;
    private final ServletContext servletContext;
    private final AuthorizationService authorizationService;
    private final DehClient dehClient;

    private JsonNode appConfigJSON = null;
    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;
    private JsonNode smeProspectJSON = null;
    private String[] roles = {"customer", "agent"};
    private String[] products = {"RAKStarter", "Current Account", "RAKelite"};
    private String[] segments = {"sme", "retail"};
    private String[] devices = {"desktop", "mobile", "tablet"};

    @PostConstruct
    public void init() {
        appConfigJSON = fileHelper.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();

        smeProspectJSON = fileHelper.getSMEProspectJSON();

        try {
            loadAppInitialState();
        } catch (Exception e) {
            logger.error("error in preparing the config json and put the values in ServletContext", e);

            //TODO check if this ok?
        }
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
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/config", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> getWebApplyConfig(@RequestParam String role,
                                                      @RequestParam(required = false, defaultValue = "") String segment,
                                                      @RequestParam(required = false, defaultValue = "") String product,
                                                      @RequestParam(required = false, defaultValue = "desktop") String device) {
        logger.info("Begin getWebApplyConfig() method");
        validateCriteriaParams(segment, product, role, device);

        ResponseEntity<JsonNode> datalistResponse = dehClient.getDatalistJSON(segment);
        JsonNode datalistJSON;
        if (datalistResponse.getStatusCode().is2xxSuccessful()) {
            datalistJSON = datalistResponse.getBody();
        } else {
            return datalistResponse;
        }

        JsonNode webApplyConfig = buildAppInitialState(segment, product, role, device, datalistJSON);
        HttpHeaders headers = new HttpHeaders();

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
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
                        buildAppInitialState(segment, product, role, device, datalistJSON);
                    }
                }
            }
        }
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("message", "reload configs successful");

        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/config/reduced", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> getWebApplyConfigReduced(HttpServletRequest httpRequest,
                                                             @RequestParam String role,
                                                             @RequestParam(required = false, defaultValue = "") String segment,
                                                             @RequestParam(required = false, defaultValue = "") String product,
                                                             @RequestParam(required = false, defaultValue = "desktop") String device) {
        logger.info("Begin getDatalist() method!");

        validateCriteriaParams(segment, product, role, device);

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createOrUpdateCsrfToken(httpRequest, headers);

        String cacheKey = getCacheKey(segment, product, role, device, "reduced");
        String cachedValue = getCache(cacheKey);
        if (StringUtils.isNotBlank(cachedValue)) {
            return getCachedData(headers, cacheKey, cachedValue);
        }

        ResponseEntity<JsonNode> datalistResponse = dehClient.getDatalistJSON(segment);
        JsonNode dataListJSON;
        if (datalistResponse != null && datalistResponse.getStatusCode().is2xxSuccessful()) {
            dataListJSON = datalistResponse.getBody();
        } else {
            return datalistResponse;
        }

        JsonNode webApplyConfig;
        webApplyConfig = buildAppInitialState(segment, product, role, device, dataListJSON);

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/usertypes/{segment}/prospects", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> createSMEProspect(HttpServletRequest httpRequest,
                                               @RequestBody JsonNode requestBodyJSON,
                                               @PathVariable String segment) {
        logger.info("Begin createSMEProspect() method");
        logger.info(String.format("createSMEProspect() method args, RequestBody=[%s], segment=[%s]", requestBodyJSON.toString(), segment));

        validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

        logger.info("Call createProspect endpoint: " + uriComponents.toString());

        ResponseEntity<?> createdProspectResponse = dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(),
                HttpMethod.POST, requestBodyJSON, "createSMEProspect()", MediaType.APPLICATION_JSON, null);

        if (!createdProspectResponse.getStatusCode().is2xxSuccessful()) {
            return createdProspectResponse;
        }

        String prospectId = ((JsonNode) createdProspectResponse.getBody()).get("prospectId").asText();

        logger.info("Send OTP for prospectId:" + prospectId);
        ObjectNode otpRequest = createOtpRequest(requestBodyJSON, prospectId);

        ResponseEntity<?> otpResponse = generateVerifyOTP(httpRequest, otpRequest, true);

        if (! otpResponse.getStatusCode().is2xxSuccessful()) {
            return otpResponse;
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createOrUpdateCsrfToken(httpRequest, headers);
        headers.putAll(otpResponse.getHeaders());
        headers.putAll(createdProspectResponse.getHeaders());

        return new ResponseEntity<>(createdProspectResponse.getBody(), headers, createdProspectResponse.getStatusCode());
    }

    private ObjectNode createOtpRequest(@RequestBody JsonNode requestBodyJSON, String prospectId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode otpRequest = objectMapper.createObjectNode();
        otpRequest.put("prospectId", prospectId);
        otpRequest.put("countryCode", requestBodyJSON.get("applicantInfo").get("countryCode").asText());
        otpRequest.put("mobileNo", requestBodyJSON.get("applicantInfo").get("mobileNo").asText());
        otpRequest.put("email", requestBodyJSON.get("applicantInfo").get("email").asText());
        otpRequest.put("action", "generate");
        return otpRequest;
    }

    @PostMapping(value = "/otp", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> generateVerifyOTP(HttpServletRequest httpRequest,
                                               @RequestBody JsonNode requestJSON,
                                               boolean captchaVerified) {
        boolean isRecaptchaTokenPresent = requestJSON.has(RECAPTCHA_TOKEN_REQUEST_KEY);
        if (isRecaptchaTokenPresent) {
            ((ObjectNode) requestJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
        }

        String action = requestJSON.get("action").asText();
        logger.info("Begin generateVerifyOTP() method, action=[{}], captchaVerified={}, hasRecaptchaToken={}",
                action, captchaVerified, isRecaptchaTokenPresent);
        logger.debug("generateVerifyOTP() method args, RequestBody=[{}], ", requestJSON);

        String url = dehBaseUrl + dehURIs.get("otpUri").asText();
        final ResponseEntity<?> result = dehClient.invokeApiEndpoint(httpRequest, url, HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null);

        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.status(HttpStatus.OK).headers(result.getHeaders());

        if ("verify".equalsIgnoreCase(action) && extractOtpVerificationResult(result)) {
            String jwtToken = authorizationService.createCustomerJwtToken(requestJSON.get("mobileNo").asText());
            responseBuilder.header(JWT_TOKEN_KEY, jwtToken);
        }

        return responseBuilder.body(result.getBody());
    }

    private boolean extractOtpVerificationResult(ResponseEntity<?> optValidationResponse) {
        final JsonNode body = (JsonNode) optValidationResponse.getBody();
        return body != null && body.has("verified") && body.get("verified").asBoolean();
    }

    @PutMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> updateSMEProspect(HttpServletRequest httpRequest,
                                               @RequestHeader String authorization,
                                               @RequestBody JsonNode jsonNode,
                                               @PathVariable String prospectId,
                                               @PathVariable String segment) {
        logger.info("Begin updateSMEProspect() method");
        logger.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
                jsonNode.toString(), segment, prospectId));

        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.PUT, jsonNode,
                "updateSMEProspect()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @PostMapping(value = "/usertypes/{segment}/prospects/search", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> searchProspect(HttpServletRequest httpRequest,
                                            @RequestHeader String authorization,
                                            @RequestBody JsonNode jsonNode,
                                            @PathVariable String segment) {
        logger.info("Begin searchProspect() method");
        logger.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
                segment));

        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.POST, jsonNode,
                "searchProspect()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @GetMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> getProspectById(HttpServletRequest httpRequest,
                                             @RequestHeader String authorization,
                                             @PathVariable String segment,
                                             @PathVariable String prospectId) {
        logger.info("Begin getProspectById() method");
        logger.debug(
                String.format("getProspectById() method args, prospectId=[%s], segment=[%s]", prospectId, segment));

        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.GET, null,
                "getProspectById()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @GetMapping(value = "/prospects/{prospectId}/documents/{documentId}")
    @ResponseBody
    public ResponseEntity<?> getProspectDocumentById(HttpServletRequest httpRequest,
                                                     @RequestHeader String authorization,
                                                     @PathVariable String prospectId,
                                                     @PathVariable String documentId) {
        logger.info("Begin getProspectDocumentById() method");
        logger.debug(String.format("getProspectDocumentById() method args, prospectId=[%s], documentId=[%s]",
                prospectId, documentId));

        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectDocumentByIdUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId, documentId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.GET, null,
                "getProspectDocumentById()", MediaType.APPLICATION_OCTET_STREAM, updatedJwtToken);
    }

    @GetMapping(value = "/prospects/{prospectId}/documents", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> getProspectDocuments(HttpServletRequest httpRequest,
                                                  @RequestHeader String authorization,
                                                  @PathVariable String prospectId) {
        logger.info("Begin getProspectDocuments() method");
        logger.debug(String.format("getProspectDocuments() method args, prospectId=[%s]", prospectId));

        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.GET, null,
                "getProspectDocuments()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> login(HttpServletRequest httpRequest,
                                   @RequestBody JsonNode requestBodyJSON) {

        logger.info("Begin login() method");
        logger.debug(String.format("login() method args, RequestBody=[%s]", requestBodyJSON.toString()));

        String newJwtToken = authorizationService.createAgentJwtToken(requestBodyJSON.get("username").asText(),
                        requestBodyJSON.get("password").asText());

        validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();

        return dehClient.invokeApiEndpoint(httpRequest, url, HttpMethod.POST, requestBodyJSON,
                "login()", MediaType.APPLICATION_JSON, newJwtToken);
    }

    private void validateReCaptcha(@RequestBody JsonNode requestBodyJSON, HttpServletRequest httpRequest) {

        if(EnvUtil.isRecaptchaEnable() && !requestBodyJSON.has(RECAPTCHA_TOKEN_REQUEST_KEY)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "reCAPTCHA Token is required",
                    "recaptchaToken is required");
            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        } else if (!EnvUtil.isRecaptchaEnable()) {
            ((ObjectNode) requestBodyJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
            return;
        }

        logger.info("Validate reCAPTCHA before saving applicant info.");

        String recaptchaInRequest = requestBodyJSON.get(RECAPTCHA_TOKEN_REQUEST_KEY).asText();
        String ip = httpRequest.getRemoteAddr();

        captchaService.verifyRecaptcha(ip, recaptchaInRequest);
        ((ObjectNode) requestBodyJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
    }


    // Utility section
    //====================================================================================

    private String getTokenFromAuthorizationHeader(String authorizationString) {
        return authorizationString.substring(7); // removes the "Bearer " prefix.
    }

    private JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist) {
        logger.info("Begin buildAppInitialState() method");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode initStateJSON = objectMapper.createObjectNode();

        setWebApplyEndpoints(objectMapper, initStateJSON, role);
        initStateJSON.set("prospect", getProspect(segment));

        boolean recaptchaEnable = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaEnable").asText("N").equals("Y");
        String recaptchaSiteKey = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSiteKey").asText();
        JsonNode baseUrls = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv());
        initStateJSON.put("reCaptchaSiteKey", recaptchaSiteKey);
//        initStateJSON.put("authorizationToken", jwtToken);
        initStateJSON.put("datalist", datalist);
        initStateJSON.put("recaptchaEnable", recaptchaEnable);
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

        String cacheKey = getCacheKey(segment, product, role, device);

        String configJSON = initStateJSON.toString();
        setCache(cacheKey, configJSON);

        logger.info("End buildAppInitialState() method");
        return initStateJSON;
    }

    private void setWebApplyEndpoints(ObjectMapper objectMapper, ObjectNode initStateJSON, String role) {
        logger.info("Begin setWebApplyEndpoints() method");
        ObjectNode endpointsJSON = objectMapper.createObjectNode();
        endpointsJSON.put("baseUrl", appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("WebApplyBaseUrl").asText());
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

    private boolean matchCriteria(JsonNode fieldConfig, String segment, String product, String role, String device) {
        if (!fieldConfig.has("criteria")) {
            return true;
        }

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

    private JsonNode getProspect(String segment) {
        if ("sme".equalsIgnoreCase(segment)) {
            return smeProspectJSON;
        }
        return null;
    }


    // Datalist section
    //====================================================================================
    private void validateCriteriaParams(String segment, String product, String role, String device) {
        String errorMessage = "";
        if (StringUtils.isNotBlank(segment) && !ArrayUtils.contains(segments, segment)) {
            errorMessage = errorMessage
                    + String.format("'%s' is invalid, allowed values [%s] ", segment, ArrayUtils.toString(segments));
        }
        if (StringUtils.isNotBlank(product) && !ArrayUtils.contains(products, product)) {
            errorMessage = errorMessage
                    + String.format("'%s' is invalid, allowed values [%s] ", product, ArrayUtils.toString(products));
        }
        if (StringUtils.isNotBlank(role) && !ArrayUtils.contains(roles, role)) {
            errorMessage = errorMessage
                    + String.format("'%s' is invalid, allowed values [%s] ", role, ArrayUtils.toString(roles));
        }
        if (StringUtils.isNotBlank(device) && !ArrayUtils.contains(devices, device)) {
            errorMessage = errorMessage
                    + String.format("'%s' is invalid, allowed values [%s] ", device, ArrayUtils.toString(devices));
        }

        if (StringUtils.isNotBlank(errorMessage)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, errorMessage, errorMessage);
            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
    }

    // Cache section
    //====================================================================================

    private ResponseEntity<JsonNode> getCachedData(HttpHeaders headers, String cacheKey, String cachedValue) {
        logger.info("cached data found for key - " + cacheKey);
        ObjectMapper mapper = new ObjectMapper();
        JsonNode cachedJson;
        try {
            cachedJson = mapper.readTree(cachedValue);
        } catch (IOException e) {
            throw new ApiException("Failed to parse cached data, the data: " + cachedValue, e);
        }
        return new ResponseEntity<>(cachedJson, headers, HttpStatus.OK);
    }

    private String getCacheKey(String segment, String product, String role, String device) {
        return getCacheKey(segment, product, role, device, null);
    }

    private String getCacheKey(String segment, String product, String role, String device, String suffix) {
        if (suffix != null) {
            return String.join("_", segment, product, role, device, suffix).toUpperCase().replace(" ", "_");
        } else {
            return String.join("_", segment, product, role, device).toUpperCase().replace(" ", "_");
        }
    }

    private String getCache(String key) {
        logger.info("retrieve data from cache for key - " + key);
        return (String) servletContext.getAttribute(key);
    }

    private void setCache(String key, String data) {
        logger.info("adding data to cache key - " + key);
        servletContext.setAttribute(key, data);
    }
}
