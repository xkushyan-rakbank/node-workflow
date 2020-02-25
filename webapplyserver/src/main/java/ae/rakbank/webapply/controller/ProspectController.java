package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.services.AuthorizationService;
import ae.rakbank.webapply.services.CSRFTokenService;
import ae.rakbank.webapply.services.RecaptchaService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/usertypes/{segment}/prospects")
@RequiredArgsConstructor
public class ProspectController {

    private final FileUtil fileUtil;
    private final DehClient dehClient;
    private final RecaptchaService captchaService;
    private final CSRFTokenService csrfTokenService;
    private final AuthorizationService authorizationService;
    private final WebApplyController applyController;

    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }

    @PostMapping(value = "", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> createSMEProspect(HttpServletRequest httpRequest,
                                               @RequestBody JsonNode requestBodyJSON,
                                               @PathVariable String segment) {
        log.info("Begin createSMEProspect() method");
        log.info(String.format("createSMEProspect() method args, RequestBody=[%s], segment=[%s]", requestBodyJSON.toString(), segment));

        captchaService.validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
        log.info("Call createProspect endpoint: " + uriComponents.toString());

        ResponseEntity<?> createdProspectResponse = dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(),
                HttpMethod.POST, requestBodyJSON, "createSMEProspect()", MediaType.APPLICATION_JSON, null);
        if (!createdProspectResponse.getStatusCode().is2xxSuccessful()) {
            return createdProspectResponse;
        }

        String prospectId = ((JsonNode) createdProspectResponse.getBody()).get("prospectId").asText();
        log.info("Send OTP for prospectId:" + prospectId);
        ObjectNode otpRequest = createOtpRequest(requestBodyJSON, prospectId);
        ResponseEntity<?> otpResponse = applyController.generateVerifyOTP(httpRequest, otpRequest, true);
        if (! otpResponse.getStatusCode().is2xxSuccessful()) {
            return otpResponse;
        }

        HttpHeaders headers = new HttpHeaders();
        csrfTokenService.createOrUpdateCsrfToken(httpRequest, headers);
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

    @GetMapping(value = "/{prospectId}", produces = "application/json")
    public ResponseEntity<?> getProspectById(HttpServletRequest httpRequest,
                                             @RequestHeader String authorization,
                                             @PathVariable String segment,
                                             @PathVariable String prospectId) {
        log.info("Begin getProspectById() method");
        log.debug(
                String.format("getProspectById() method args, prospectId=[%s], segment=[%s]", prospectId, segment));

        String jwtToken = authorizationService.getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.GET, null,
                "getProspectById()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @PutMapping(value = "/{prospectId}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> updateSMEProspect(HttpServletRequest httpRequest,
                                               @RequestHeader String authorization,
                                               @RequestBody JsonNode jsonNode,
                                               @PathVariable String prospectId,
                                               @PathVariable String segment) {
        log.info("Begin updateSMEProspect() method");
        log.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
                jsonNode.toString(), segment, prospectId));

        String jwtToken = authorizationService.getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.PUT, jsonNode,
                "updateSMEProspect()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }

    @PostMapping(value = "/search", produces = "application/json", consumes = "application/json")
    public ResponseEntity<?> searchProspect(HttpServletRequest httpRequest,
                                            @RequestHeader String authorization,
                                            @RequestBody JsonNode jsonNode,
                                            @PathVariable String segment) {
        log.info("Begin searchProspect() method");
        log.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
                segment));

        String jwtToken = authorizationService.getTokenFromAuthorizationHeader(authorization);
        String updatedJwtToken = authorizationService.validateAndUpdateJwtToken(jwtToken);

        String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

        return dehClient.invokeApiEndpoint(httpRequest, uriComponents.toString(), HttpMethod.POST, jsonNode,
                "searchProspect()", MediaType.APPLICATION_JSON, updatedJwtToken);
    }
}
