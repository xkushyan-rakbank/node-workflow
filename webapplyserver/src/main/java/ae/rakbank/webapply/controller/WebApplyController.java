package ae.rakbank.webapply.controller;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.services.AuthorizationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import ae.rakbank.webapply.services.RecaptchaService;

import static ae.rakbank.webapply.constants.AuthConstants.JWT_TOKEN_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.RECAPTCHA_TOKEN_REQUEST_KEY;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class WebApplyController {

    @Value("${build.date}")
    private String buildDate;
    @Value("${app.name}")
    private String appName;

    private final FileUtil fileUtil;
    private final DehClient dehClient;
    private final RecaptchaService captchaService;
    private final AuthorizationService authorizationService;

    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }

    @GetMapping(value = "/health", produces = "application/json")
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

    @PostMapping(value = "/otp", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> generateVerifyOTP(HttpServletRequest httpRequest,
                                               @RequestBody JsonNode requestJSON,
                                               boolean captchaVerified) {
        boolean isRecaptchaTokenPresent = requestJSON.has(RECAPTCHA_TOKEN_REQUEST_KEY);
        if (isRecaptchaTokenPresent) {
            ((ObjectNode) requestJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
        }

        String action = requestJSON.get("action").asText();
        log.info("Begin generateVerifyOTP() method, action=[{}], captchaVerified={}, hasRecaptchaToken={}",
                action, captchaVerified, isRecaptchaTokenPresent);
        log.debug("generateVerifyOTP() method args, RequestBody=[{}], ", requestJSON);

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

    @PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> login(HttpServletRequest httpRequest,
                                   @RequestBody JsonNode requestBodyJSON) {

        log.info("Begin login() method");
        log.debug(String.format("login() method args, RequestBody=[%s]", requestBodyJSON.toString()));

        String newJwtToken = authorizationService.createAgentJwtToken(requestBodyJSON.get("username").asText(),
                        requestBodyJSON.get("password").asText());

        captchaService.validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();

        return dehClient.invokeApiEndpoint(httpRequest, url, HttpMethod.POST, requestBodyJSON,
                "login()", MediaType.APPLICATION_JSON, newJwtToken);
    }
}
