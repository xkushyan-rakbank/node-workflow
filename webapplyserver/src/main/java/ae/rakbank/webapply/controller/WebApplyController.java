package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.services.RecaptchaService;
import ae.rakbank.webapply.services.otp.OtpService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import static ae.rakbank.webapply.constants.AuthConstants.JWT_TOKEN_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.RECAPTCHA_TOKEN_REQUEST_KEY;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@PreAuthorize("isAnonymous()")
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
    private final OtpService optService;

    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }

    @PreAuthorize("permitAll()")
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
    public ResponseEntity<Object> generateVerifyOTP(@RequestBody JsonNode requestJSON,
                                                    boolean captchaVerified) {
        boolean isRecaptchaTokenPresent = requestJSON.has(RECAPTCHA_TOKEN_REQUEST_KEY);
        if (isRecaptchaTokenPresent) {
            ((ObjectNode) requestJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
        }

        String action = requestJSON.get("action").asText();
        log.info("Begin generateVerifyOTP() method, action=[{}], captchaVerified={}, hasRecaptchaToken={}",
                action, captchaVerified, isRecaptchaTokenPresent);
        log.debug("generateVerifyOTP() method args, RequestBody=[{}], ", requestJSON);


        ResponseEntity.BodyBuilder responseBuilder = ResponseEntity.status(HttpStatus.OK);

        return optService.verifyOrGenerate(requestJSON)
                .ifVerifySuccessThen(() -> responseBuilder.header(JWT_TOKEN_KEY, issueJwtToken(requestJSON)))
                .execute(response -> responseBuilder.body(response.getBody()));
    }

    private String issueJwtToken(JsonNode requestJSON) {
        if (requestJSON.get("prospectId") != null) {
            return authorizationService.createCustomerJwtToken(requestJSON.get("mobileNo").asText(), requestJSON.get("prospectId").asText());
        } else {
            return authorizationService.createCustomerJwtToken(requestJSON.get("mobileNo").asText(), "");
        }
    }

    @PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> login(HttpServletRequest httpRequest,
                                        @RequestBody JsonNode requestBodyJSON) {

        log.info("Begin login() method");
        log.debug(String.format("login() method args, RequestBody=[%s]", requestBodyJSON.toString()));

        captchaService.validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();

        final ResponseEntity<?> dehResponse = dehClient.invokeApiEndpoint(url, HttpMethod.POST, requestBodyJSON,
                "login()", MediaType.APPLICATION_JSON, null);

        ResponseEntity.BodyBuilder response = ResponseEntity.status(dehResponse.getStatusCode());

        if (dehResponse.getStatusCode() == HttpStatus.OK) {
            response.header(JWT_TOKEN_KEY, authorizationService.createAgentJwtToken(requestBodyJSON.get("username").asText(),
                    requestBodyJSON.get("password").asText()));
        }

        return response.body(dehResponse.getBody());
    }
    
    //Added for ro-assist-brd1
    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/agent/createInvite", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> createInvite(@AuthenticationPrincipal JwtPayload jwtPayload,@RequestBody JsonNode jsonNode){
    	 log.info("Begin createInvite() method");
    	 log.debug(String.format("createInvite() method args, RequestBody=[%s]", jsonNode.toString()));

    	 String url = dehBaseUrl + dehURIs.get("createInviteUri").asText();
         //UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

         ResponseEntity<Object> responseEntity = dehClient.invokeApiEndpoint(url, HttpMethod.POST, jsonNode,
                 "createInvite()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());

         return responseEntity;
    }
}
