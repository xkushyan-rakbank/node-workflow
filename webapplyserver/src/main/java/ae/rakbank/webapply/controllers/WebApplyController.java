package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ae.rakbank.webapply.constants.AuthConstants;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.AuthorizationService;
import ae.rakbank.webapply.services.auth.OAuthService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
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




    //TODO  remove OAuthService  !!!
    private final OAuthService oAuthService;



    private JsonNode appConfigJSON = null;
    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;
    private JsonNode uiConfigJSON = null;
    private JsonNode smeProspectJSON = null;
    private String[] roles = {"customer", "agent"};
    private String[] products = {"RAKStarter", "Current Account", "RAKelite"};
    private String[] segments = {"sme", "retail"};
    private String[] devices = {"desktop", "mobile", "tablet"};
    private ObjectNode defaultDatalist = null;

    @PostConstruct
    public void init() {
        appConfigJSON = fileHelper.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();

        uiConfigJSON = fileHelper.getUIConfigJSON();
        smeProspectJSON = fileHelper.getSMEProspectJSON();
        defaultDatalist = new ObjectMapper().createObjectNode();
        defaultDatalist.setAll((ObjectNode) fileHelper.getDatalistJSON());

        try {
            loadAppInitialState();
        }
        catch (Exception e) {
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
            ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment);
            if (datalistResponse == null) {
                throw new ApiException("No segment value with key: " + segment);
            }
            JsonNode datalistJSON;
            if (datalistResponse.getStatusCode().is2xxSuccessful()) {
                datalistJSON = datalistResponse.getBody();
            }
            else {
                return datalistResponse;
            }

            for (String device : devices) {
                for (String product : products) {
                    for (String role : roles) {
                        buildAppInitialState(segment, product, role, device, datalistJSON, null);
                    }
                }
            }
        }

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("message", "reload configs successful");
        ResponseEntity<JsonNode> oauth = getOauthFromContext();
        response.set("oauth", oauth.getBody());
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }


    @GetMapping(value = "/config", produces = "application/json")
    @ResponseBody
    public ResponseEntity<JsonNode> getWebApplyConfig(HttpServletRequest httpRequest,
                                                      @RequestParam String role,
                                                      @RequestParam(required = false, defaultValue = "") String segment,
                                                      @RequestParam(required = false, defaultValue = "") String product,
                                                      @RequestParam(required = false, defaultValue = "desktop") String device) {

        logger.info("Begin getWebApplyConfig() method");
        String invalidCriteriaError = validateCriteriaParams(segment, product, role, device);
        if (StringUtils.isNotBlank(invalidCriteriaError)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "Invalid segment, product or role.",
                    invalidCriteriaError);
            throw new ApiException(error, null, HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createCSRFToken(httpRequest, headers);

        /*
        String cacheKey = getCacheKey(segment, product, role, device);
        String cachedValue = getCache(cacheKey);
        if (StringUtils.isNotBlank(cachedValue)) {
            logger.info("cached data found for key - " + cacheKey);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode cachedJson = mapper.readTree(cachedValue);
            return new ResponseEntity<JsonNode>(cachedJson, headers, HttpStatus.OK);
        }
        */

        String jwtToken = authorizationService.getJwtToken();
        String accessToken = authorizationService.getOauthAccessToken(jwtToken);

//        ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();
//        if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {
//          accessToken = oauthResponse.getBody().get("access_token").asText();
//        } else {
//          logger.error("Unable to call datalist API due to oauth error.");
//          return oauthResponse;
//        }

        ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment, accessToken);

        JsonNode datalistJSON;
        if (datalistResponse != null && datalistResponse.getStatusCode().is2xxSuccessful()) {
            datalistJSON = datalistResponse.getBody();
        }
        else {
            return datalistResponse;
        }

        JsonNode webApplyConfig;
        webApplyConfig = buildAppInitialState(segment, product, role, device, datalistJSON, accessToken);

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
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

        String invalidCriteriaError = validateCriteriaParams(segment, product, role, device);
        if (StringUtils.isNotBlank(invalidCriteriaError)) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "Invalid segment, product or role.",
                    invalidCriteriaError);
            throw new ApiException(error, null, HttpStatus.BAD_REQUEST);
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenHelper.createCSRFToken(httpRequest, headers);

        String cacheKey = getCacheKey(segment, product, role, device, "reduced");
        String cachedValue = getCache(cacheKey);
        if (StringUtils.isNotBlank(cachedValue)) {
            logger.info("cached data found for key - " + cacheKey);
            ObjectMapper mapper = new ObjectMapper();
            JsonNode cachedJson = mapper.readTree(cachedValue);
            return new ResponseEntity<>(cachedJson, headers, HttpStatus.OK);
        }

        ResponseEntity<JsonNode> datalistResponse = getDatalistJSON(segment, httpRequest.getHeader("Authorization"));

        JsonNode dataListJSON;
        if (datalistResponse != null && datalistResponse.getStatusCode().is2xxSuccessful()) {
            dataListJSON = datalistResponse.getBody();
        }
        else {
            return datalistResponse;
        }

        JsonNode webApplyConfig;
        webApplyConfig = buildAppInitialState(segment, product, role, device, dataListJSON,
                httpRequest.getHeader("Authorization"), false);

        return new ResponseEntity<>(webApplyConfig, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/usertypes/{segment}/prospects", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> createSMEProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                               @RequestHeader String authorization,
                                               @RequestBody JsonNode requestBodyJSON,
                                               @PathVariable String segment,
                                               HttpServletRequest servletRequest) {
        logger.info("Begin createSMEProspect() method");
        logger.info(String.format("createSMEProspect() method args, RequestBody=[%s], segment=[%s]", requestBodyJSON.toString(), segment));


        String token = getTokenFromAuthorizationHeader(authorization);

//        oauthClient.validateAccessToken(token, null, true);

        authorizationService.validateJwtToken(token, true);

        ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
        if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

            if (EnvUtil.isCheckRecaptcha() && requestBodyJSON.has("recaptchaToken")) {
                ResponseEntity<?> captchaResponse = validateReCaptcha(requestBodyJSON, servletRequest);
                if (captchaResponse != null) return captchaResponse;
            } else if (EnvUtil.isRecaptchaEnable()) {
                ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "recaptchaToken is required",
                        "recaptchaToken is required");
                return new ResponseEntity<>(error.toJsonNode(), null, HttpStatus.BAD_REQUEST);
            }

            HttpEntity<JsonNode> request = getHttpEntityRequest(
                    requestBodyJSON,
                    oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                    MediaType.APPLICATION_JSON);
            String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();
            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

            logger.info("Call createProspect endpoint: " + uriComponents.toString());

            ResponseEntity<?> createProspectResponse;
            createProspectResponse = invokeApiEndpoint(httpRequest, httpResponse,
                    uriComponents.toString(), HttpMethod.POST, request, "createSMEProspect()", "createProspectUri",
                    MediaType.APPLICATION_JSON, segment, null);

            if (createProspectResponse.getStatusCode().is2xxSuccessful()) {
                String prospectId = ((JsonNode) createProspectResponse.getBody()).get("prospectId").asText();
                logger.info("Send OTP for prospectId:" + prospectId);
                ObjectMapper objectMapper = new ObjectMapper();
                ObjectNode otpRequest = objectMapper.createObjectNode();
                otpRequest.put("prospectId", prospectId);
                otpRequest.put("countryCode", requestBodyJSON.get("applicantInfo").get("countryCode").asText());
                otpRequest.put("mobileNo", requestBodyJSON.get("applicantInfo").get("mobileNo").asText());
                otpRequest.put("email", requestBodyJSON.get("applicantInfo").get("email").asText());
                otpRequest.put("action", "generate");
                ResponseEntity<?> otpResponse = generateVerifyOTP(httpRequest, httpResponse, authorization, otpRequest,
                        servletRequest, true);

                if (otpResponse.getStatusCode().is2xxSuccessful()) {
                    return createProspectResponse;
                } else {
                    return otpResponse;
                }
            } else {
                return createProspectResponse;
            }
        } else {
            logger.error(String.format("OAuth Error in createSMEProspect() method , HttpStatus=[%s], message=[%s]",
                    oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                    "oauth error, check logs for more info.");
            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> updateSMEProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                               @RequestHeader String authorization,
                                               @RequestBody JsonNode jsonNode,
                                               @PathVariable String prospectId,
                                               @PathVariable String segment) {
        logger.info("Begin updateSMEProspect() method");
        logger.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
                jsonNode.toString(), segment, prospectId));

        String token = getTokenFromAuthorizationHeader(authorization);
//        if (oauthClient.validateAccessToken(token, null, false)) {

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

        ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
        if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {
            HttpEntity<JsonNode> request = getHttpEntityRequest(
                    jsonNode,
                    oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                    MediaType.APPLICATION_JSON);

            String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

            return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.PUT, request,
                    "updateSMEProspect()", "updateProspectUri", MediaType.APPLICATION_JSON, segment, prospectId);
        } else {
            logger.error(String.format("OAuth Error in updateSMEProspect() method , HttpStatus=[%s], message=[%s]",
                    oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                    "oauth error, check logs for more info.");

            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/usertypes/{segment}/prospects/search", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> searchProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                            @RequestHeader String authorization,
                                            @RequestBody JsonNode jsonNode,
                                            @PathVariable String segment) {
        logger.info("Begin searchProspect() method");
        logger.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
                segment));

        String token = getTokenFromAuthorizationHeader(authorization);

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

            ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
            if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

//                HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse, MediaType.APPLICATION_JSON);
                HttpEntity<JsonNode> request = getHttpEntityRequest(
                        jsonNode,
                        oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                        MediaType.APPLICATION_JSON);
                String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
                UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

                return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.POST, request,
                        "searchProspect()", "searchProspectUri", MediaType.APPLICATION_JSON, segment, null);
            }
            else {
                logger.error(String.format("OAuth Error in searchProspect() method , HttpStatus=[%s], message=[%s]",
                        oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        "oauth error, check logs for more info.");
                throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @GetMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> getProspectById(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                             @RequestHeader String authorization,
                                             @PathVariable String segment,
                                             @PathVariable String prospectId) {
        logger.info("Begin getProspectById() method");
        logger.debug(
                String.format("getProspectById() method args, prospectId=[%s], segment=[%s]", prospectId, segment));

        String token = getTokenFromAuthorizationHeader(authorization);
//        if (oauthClient.validateAccessToken(token, null, false)) {

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

          ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
          if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

//              HttpEntity<JsonNode> request = getHttpEntityRequest(null, oauthResponse, MediaType.APPLICATION_JSON);





              //TODO next line can produce NullPointer !!!!!!!!!





              HttpEntity<JsonNode> request = getHttpEntityRequest(
                      null,
                      oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                      MediaType.APPLICATION_JSON);
              String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
              UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

              return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
                      "getProspectById()", "getProspectUri", MediaType.APPLICATION_JSON, segment, prospectId);
          }
          else {
              logger.error(String.format("OAuth Error in getProspectById() method , HttpStatus=[%s], message=[%s]",
                      oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));
              ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                      "oauth error, check logs for more info.");
              throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        /*}
        else {
            String errorMessage = "OAuth token expired or invalid, "
                    + "Actual time: " + LocalDateTime.now()
                    + ", Token valid till: " + servletContext.getAttribute("OAuthTokenValidUntil");
            logger.error(errorMessage);
            ApiError error = new ApiError(HttpStatus.UNAUTHORIZED, errorMessage, errorMessage);
            throw new ApiException(error, null, HttpStatus.UNAUTHORIZED);
        }*/
    }

    @GetMapping(value = "/prospects/{prospectId}/documents/{documentId}")
    @ResponseBody
    public ResponseEntity<?> getProspectDocumentById(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                     @RequestHeader String authorization,
                                                     @PathVariable String prospectId,
                                                     @PathVariable String documentId) {
        logger.info("Begin getProspectDocumentById() method");
        logger.debug(String.format("getProspectDocumentById() method args, prospectId=[%s], documentId=[%s]",
                prospectId, documentId));

        String token = getTokenFromAuthorizationHeader(authorization);
//        if (oauthClient.validateAccessToken(token, null, false)) {

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

            ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
            if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {




                //TODO fix next line !!!!  NPE




                HttpEntity<JsonNode> request = getHttpEntityRequest(
                        null,
                        oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                        MediaType.APPLICATION_JSON);

//                HttpEntity<JsonNode> request = getHttpEntityRequest(null, oauthResponse, MediaType.APPLICATION_OCTET_STREAM);
                String url = dehBaseUrl + dehURIs.get("getProspectDocumentByIdUri").asText();
                UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId, documentId);

                return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
                        "getProspectDocumentById()", "getProspectDocumentByIdUri",
                        MediaType.APPLICATION_OCTET_STREAM, null, prospectId);
            }
            else {
                logger.error(String.format("OAuth Error in getDocumentById() method , HttpStatus=[%s], message=[%s]",
                        oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));
                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        "oauth error, check logs for more info.");
                throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @GetMapping(value = "/prospects/{prospectId}/documents", produces = "application/json")
    @ResponseBody
    public ResponseEntity<?> getProspectDocuments(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                  @RequestHeader String authorization,
                                                  @PathVariable String prospectId) {
        logger.info("Begin getProspectDocuments() method");
        logger.debug(String.format("getProspectDocuments() method args, prospectId=[%s]", prospectId));

        String token = getTokenFromAuthorizationHeader(authorization);

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

            ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
            if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

//                HttpEntity<JsonNode> request = getHttpEntityRequest(null, oauthResponse, MediaType.APPLICATION_JSON);




                //TODO NPE   !!!!!





                HttpEntity<JsonNode> request = getHttpEntityRequest(
                        null,
                        oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                        MediaType.APPLICATION_JSON);

                String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
                UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

                return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
                        "getProspectDocuments()", "getProspectDocumentsUri", MediaType.APPLICATION_JSON, null,
                        prospectId);
            }
            else {
                logger.error(String.format("OAuth Error in getProspectDocuments() method , HttpStatus=[%s], message=[%s]",
                        oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));
                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        "oauth error, check logs for more info.");
                throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

    @PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> login(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                   @RequestBody JsonNode requestBodyJSON) {

        logger.info("Begin login() method");
        logger.debug(String.format("login() method args, RequestBody=[%s]", requestBodyJSON.toString()));

        String jwtToken =
                authorizationService.getJwtToken(requestBodyJSON.get("username").asText(), requestBodyJSON.get("password").asText());
        String oauthToken = authorizationService.getOauthAccessToken(jwtToken);

        if (requestBodyJSON.has("recaptchaToken")) {
            ResponseEntity<?> captchaResponse = validateReCaptcha(requestBodyJSON, httpRequest);
            if (captchaResponse != null) return captchaResponse;
        } else if (EnvUtil.isRecaptchaEnable()) {
            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "reCAPTCHA Token is required",
                    "reCAPTCHA Token is required");
            throw new ApiException(error, null, HttpStatus.BAD_REQUEST);
        }

        HttpEntity<JsonNode> request = getHttpEntityRequest(requestBodyJSON, oauthToken, MediaType.APPLICATION_JSON);
        String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();
        ResponseEntity<?> loginResponse = invokeApiEndpoint(httpRequest, httpResponse, url, HttpMethod.POST, request, "login()",
                "authenticateUserUri", MediaType.APPLICATION_JSON, null, null);
        if (loginResponse.getBody() instanceof JsonNode) {
            ((ObjectNode) loginResponse.getBody()).put(AuthConstants.JWT_TOKEN_KEY, jwtToken);
        }
        return loginResponse;
    }

    @PostMapping(value = "/otp", produces = "application/json", consumes = "application/json")
    @ResponseBody
    public ResponseEntity<?> generateVerifyOTP(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                               @RequestHeader String authorization,
                                               @RequestBody JsonNode requestJSON,
                                               HttpServletRequest servletRequest,
                                               boolean captchaVerified) {
        String action = requestJSON.get("action").asText();
        Boolean recaptchaToken = requestJSON.has("recaptchaToken");
        logger.info(
                String.format("Begin generateVerifyOTP() method, action=[%s], captchaVerified=%s, hasRecaptchaToken=%s",
                        action, captchaVerified, recaptchaToken));

        logger.debug(String.format("generateVerifyOTP() method args, RequestBody=[%s], ", requestJSON.toString()));

        String token = getTokenFromAuthorizationHeader(authorization);

//            oauthClient.validateAccessToken(token, null, false);
        authorizationService.validateJwtToken(token, false);

            ResponseEntity<JsonNode> oauthResponse = getOauthFromContext();
            if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {
                if (requestJSON.has("recaptchaToken")) {
                    ((ObjectNode) requestJSON).remove("recaptchaToken");
                }
            /*
            if (!captchaVerified) {
                String action = requestJSON.get("action").asText();
                // verify captcha before sending OTP
                if (StringUtils.equalsIgnoreCase(action, "generate")) {
                    logger.info("begin verify recaptcha method");

                    if (requestJSON.has("recaptchaToken")) {

                        String recaptchaResponse = requestJSON.get("recaptchaToken").asText();
                        String ip = servletRequest.getRemoteAddr();
                        ResponseEntity<?> captchaResponse = captchaService.verifyRecaptcha(ip, recaptchaResponse);

                        if (captchaResponse.getStatusCode().is2xxSuccessful()) {
                            logger.debug("reCAPTCHA verify API response: " + captchaResponse.getBody());
                        } else {
                            logger.error(String.format("reCAPTCHA verify API response: HttpStatus=[%s], message=[%s]",
                                    captchaResponse.getStatusCodeValue(), captchaResponse.getBody()));
                        }

                        if (!captchaResponse.getStatusCode().is2xxSuccessful()) {
                            return captchaResponse;
                        }

                        ((ObjectNode) requestJSON).remove("recaptchaToken");
                    } else {
                        ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "recaptchaToken is required.",
                                "recaptchaToken is required.");

                        return new ResponseEntity<Object>(error.toJsonNode(), null, HttpStatus.BAD_REQUEST);
                    }
                }
            }
            */


//                HttpEntity<JsonNode> request = getHttpEntityRequest(requestJSON, oauthResponse, MediaType.APPLICATION_JSON);

                HttpEntity<JsonNode> request = getHttpEntityRequest(
                        requestJSON,
                        oauthResponse.getBody().get(AuthConstants.OAUTH_ACCESS_TOKEN_KEY).asText(),
                        MediaType.APPLICATION_JSON);
                String url = dehBaseUrl + dehURIs.get("otpUri").asText();

                return invokeApiEndpoint(httpRequest, httpResponse, url, HttpMethod.POST, request,
                        "generateVerifyOTP()", "otpUri", MediaType.APPLICATION_JSON, null, null);
            }
            else {
                logger.error(String.format("OAuth Error in generateVerifyOTP() method , HttpStatus=[%s], message=[%s]",
                        oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));
                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        "oauth error, check logs for more info.");
                throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }

//TODO move to recapcha service
    private ResponseEntity<?> validateReCaptcha(@RequestBody JsonNode requestBodyJSON, HttpServletRequest servletRequest) {
        logger.info("Validate reCAPTCHA before saving applicant info.");
        String recaptchaResponse = requestBodyJSON.get("recaptchaToken").asText();
        String ip = servletRequest.getRemoteAddr();
        ResponseEntity<?> captchaResponse = captchaService.verifyRecaptcha(ip, recaptchaResponse);

        if (captchaResponse.getStatusCode().is2xxSuccessful()) {
            logger.debug("reCAPTCHA verify API response: " + captchaResponse.getBody());
        } else {
            logger.error(String.format("reCAPTCHA verify API response: HttpStatus=[%s], message=[%s]",
                    captchaResponse.getStatusCodeValue(), captchaResponse.getBody()));
        }

        logger.info(String.format("reCAPTCHA response, HttpStatus=[%s], ip=[%s]",
                captchaResponse.getStatusCodeValue(), ip));

        if (!captchaResponse.getStatusCode().is2xxSuccessful()) {
            return captchaResponse;
        }

        ((ObjectNode) requestBodyJSON).remove("recaptchaToken");
        return null;
    }


    // Core API Forwarding
    //====================================================================================
    private HttpEntity<JsonNode> getHttpEntityRequest(JsonNode requestBodyJSON, String oauthAccessToken, MediaType mediaType) {
        /*
         * Enumeration<String> enumeration = httpRequest.getHeaderNames(); while
         * (enumeration.hasMoreElements()) { String headerName =
         * enumeration.nextElement(); String headerValue =
         * httpRequest.getHeader(headerName); headers.add(headerName, headerValue); }
         */
        HttpHeaders headers = authorizationService.getOAuthHeaders(oauthAccessToken, mediaType);
        return new HttpEntity<>(requestBodyJSON, headers);
    }

    private ResponseEntity<?> invokeApiEndpoint(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
                                                String url, HttpMethod httpMethod, HttpEntity<JsonNode> request, String operationId, String uriId,
                                                MediaType mediaType, String segment, String prospectId)  {

        logger.info(String.format("Invoke API from %s method, Endpoint=[%s], request:[%s]", operationId, url,
                request.toString()));

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<?> response;
        try {
            if (MediaType.APPLICATION_JSON.equals(mediaType)) {
                response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);
            }
            else {
                response = restTemplate.exchange(url, httpMethod, request, Resource.class);
            }
        }
        catch (HttpClientErrorException e) {
            logger.error(String.format("HttpClientErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            HttpHeaders responseHeaders = e.getResponseHeaders();
            List<String> channelContext = e.getResponseHeaders().get("ChannelContext");

            String errorMessage;
            if (channelContext == null) {
                errorMessage = e.getResponseBodyAsString();
            } else {
                errorMessage = channelContext.get(0);
            }

            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, errorMessage, e.getResponseBodyAsString(), e);
//            JsonNode badReqResponse = new ObjectMapper().readTree(errorJson);
            throw new ApiException(error, responseHeaders, HttpStatus.BAD_REQUEST);
        }
        catch (HttpServerErrorException e) {
            logger.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                    e.getResponseBodyAsString(), e);
            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        // ResponseEntity headers is immutable, so create new HttpHeaders object
        HttpHeaders headers = new HttpHeaders();
        headers.addAll(response.getHeaders());
        headers.remove("Content-Length");

        logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s] Response=[%s]", operationId,
                url, response.getStatusCodeValue(), response.getBody()));

        if (response.getStatusCode().is2xxSuccessful()) {
            logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
                    operationId, url, response.getStatusCodeValue()));

            csrfTokenHelper.createCSRFToken(httpRequest, headers);
        }
        else {
            logger.error(String.format("API call from %s method is UNSUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
                    operationId, url, response.getStatusCodeValue()));
        }

        return new ResponseEntity<>(response.getBody(), headers, response.getStatusCode());
    }



    // Utility section
    //====================================================================================
    private ResponseEntity<JsonNode> getOauthFromContext() {
        return (ResponseEntity<JsonNode>) servletContext.getAttribute("OAuthTokenResponse");
    }

    private String getTokenFromAuthorizationHeader(String authorizationString) {
        return authorizationString.substring(7); // removes the "Bearer " prefix.
    }

    private JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist,
                                          String authToken){
        return buildAppInitialState(segment, product, role, device, datalist, authToken, true);
    }

    private JsonNode buildAppInitialState(String segment, String product, String role, String device, JsonNode datalist,
                                          String authToken, boolean includeUiConfig) {
        logger.info("Begin buildAppInitialState() method");
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode initStateJSON = objectMapper.createObjectNode();

        setWebApplyEndpoints(objectMapper, initStateJSON, role);
        initStateJSON.set("prospect", getProspect(segment, product));

        boolean recaptchaEnable = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaEnable").asText("N").equals("Y");
        String recaptchaSiteKey = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSiteKey").asText();
        JsonNode baseUrls = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv());
        initStateJSON.put("reCaptchaSiteKey", recaptchaSiteKey);
        initStateJSON.put("authorizationToken", authToken);
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

        // deep clone the json nodes
        String uiConfig;
        try {
            uiConfig = objectMapper.writeValueAsString(uiConfigJSON);
        } catch (JsonProcessingException e) {
            String errorMessage = "Failed to process the uiConfigJSON";
            logger.error(errorMessage);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage, errorMessage, e);
            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        JsonNode uiConfigNode;
        try {
            uiConfigNode = objectMapper.readTree(uiConfig);
        } catch (IOException e) {
            String errorMessage = String.format(
                    "unable load/reload config for web apply for device=[%s] segment=[%s], product=[%s], role=[%s]",
                    device, segment, product, role);
            logger.error(errorMessage);
            ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, errorMessage, errorMessage, e);
            throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

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

    private ObjectNode filterUIConfigFieldsByCriteria(ObjectNode uiConfigNode, String segment, String product,
                                                      String role, String device, JsonNode datalist) {
        logger.info("Begin filterUIConfigFieldsByCriteria() method");

        Iterator<Map.Entry<String, JsonNode>> fields = uiConfigNode.fields();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode uiFields = objectMapper.createObjectNode();
        while (fields.hasNext()) {
            Map.Entry<String, JsonNode> entry = fields.next();
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
                        }
                        else if (datalist != null) {
                            String groupId = fieldConfig.get("datalistId").asText();

                            if (datalist.has(groupId)) {
                                fieldConfig.set("datalist", datalist.get(groupId));
                            }
                            else {
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
            }
            catch (Exception e) {
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

    private JsonNode getProspect(String segment, String product) {
        if ("sme".equalsIgnoreCase(segment)) {
            return smeProspectJSON;
        }
        return null;
    }


    // Datalist section
    //====================================================================================
    private String validateCriteriaParams(String segment, String product, String role, String device) {
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

    private ResponseEntity<JsonNode> getDatalistJSON(String segment) {
        return getDatalistJSON(segment, null);
    }

    private ResponseEntity<JsonNode> getDatalistJSON(String segment, String oauthToken) {
        logger.info("Begin getDatalistJSON() method, segment=" + segment);

        if (StringUtils.isBlank(segment)) {
            logger.info("segment is null, return defaultDatalist");
            return new ResponseEntity<JsonNode>(defaultDatalist, null, HttpStatus.OK);
        }
        String methodName = "getDatalistJSON()";

        ResponseEntity<JsonNode> oauthResponse = oAuthService.getOAuthToken();
        if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {
            RestTemplate restTemplate = new RestTemplate();

            String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
            JsonNode dehURIs = appConfigJSON.get("DehURIs");
            String url = dehBaseUrl + dehURIs.get("datalistUri").asText();

            UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
            url = uriComponents.toString();

            HttpHeaders headers = oAuthService.getOAuthHeaders(oauthResponse, MediaType.APPLICATION_JSON);
            HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);

            logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", methodName, url));
            logger.info(String.format("Endpoint=[%s], request=%s", url, request.toString()));

            ResponseEntity<JsonNode> response = null;

            try {
                response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);
            }
            catch (HttpClientErrorException e) {
                logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                        e.getResponseBodyAsString()), e);
                ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getResponseBodyAsString(),
                        e.getResponseBodyAsString(), e);
                throw new ApiException(e, error, null, HttpStatus.BAD_REQUEST);
            }
            catch (HttpServerErrorException e) {
                logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=", url, e.getRawStatusCode(),
                        e.getResponseBodyAsString()), e);
                ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
                        e.getResponseBodyAsString(), e);
                throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            ObjectNode datalist = (ObjectNode) response.getBody();
            datalist.setAll((ObjectNode) fileHelper.getDatalistJSON());
            populateDefaultDatalist(datalist);

            logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s]",
                    methodName, url, response.getStatusCodeValue()));

            return new ResponseEntity<>(datalist, null, HttpStatus.OK);
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


    // Cache section
    //====================================================================================
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

    private String getCache(String key) {
        logger.info("retrieve data from cache for key - " + key);
        return (String) servletContext.getAttribute(key);
    }

    private void setCache(String key, String data) {
        logger.info("adding data to cache key - " + key);
        servletContext.setAttribute(key, data);
    }
}
