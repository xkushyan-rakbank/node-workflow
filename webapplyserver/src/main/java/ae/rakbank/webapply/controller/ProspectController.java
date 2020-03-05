package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.RecaptchaService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import ae.rakbank.webapply.util.ProspectUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@PreAuthorize("isAuthenticated()")
@RequestMapping("/api/v1/usertypes/{segment}/prospects")
@RequiredArgsConstructor
public class ProspectController {

    private static final String APPLICANT_INFO = "applicantInfo";
    private final FileUtil fileUtil;
    private final DehClient dehClient;
    private final RecaptchaService captchaService;
    private final WebApplyController applyController;
    private final ProspectUtil prospectUtil;

    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping(value = "", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> createSMEProspect(HttpServletRequest httpRequest,
                                                    @RequestBody JsonNode requestBodyJSON,
                                                    @PathVariable String segment) {
        log.info("Begin createSMEProspect() method");
        log.info(String.format("createSMEProspect() method args, RequestBody=[%s], segment=[%s]", requestBodyJSON.toString(), segment));

        captchaService.validateReCaptcha(requestBodyJSON, httpRequest);

        String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);
        log.info("Call createProspect endpoint: " + uriComponents.toString());

        ResponseEntity<Object> createdProspectResponse = dehClient.invokeApiEndpoint(uriComponents.toString(),
                HttpMethod.POST, requestBodyJSON, "createSMEProspect()", MediaType.APPLICATION_JSON, null);
        if (!createdProspectResponse.getStatusCode().is2xxSuccessful()) {
            return createdProspectResponse;
        }

        String prospectId = ((JsonNode) createdProspectResponse.getBody()).get("prospectId").asText();
        log.info("Send OTP for prospectId:" + prospectId);
        ObjectNode otpRequest = createOtpRequest(requestBodyJSON, prospectId);
        ResponseEntity<Object> otpResponse = applyController.generateVerifyOTP(httpRequest, otpRequest, true);
        if (!otpResponse.getStatusCode().is2xxSuccessful()) {
            return otpResponse;
        }

        HttpHeaders headers = new HttpHeaders();
        headers.putAll(otpResponse.getHeaders());
        headers.putAll(createdProspectResponse.getHeaders());

        return new ResponseEntity<>(createdProspectResponse.getBody(), headers, createdProspectResponse.getStatusCode());
    }

    private ObjectNode createOtpRequest(@RequestBody JsonNode requestBodyJSON, String prospectId) {
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode otpRequest = objectMapper.createObjectNode();
        otpRequest.put("prospectId", prospectId);
        otpRequest.put("countryCode", requestBodyJSON.get(APPLICANT_INFO).get("countryCode").asText());
        otpRequest.put("mobileNo", requestBodyJSON.get(APPLICANT_INFO).get("mobileNo").asText());
        otpRequest.put("email", requestBodyJSON.get(APPLICANT_INFO).get("email").asText());
        otpRequest.put("action", "generate");
        return otpRequest;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{prospectId}", produces = "application/json")
    public ResponseEntity<Object> getProspectById(@AuthenticationPrincipal JwtPayload jwtPayload,
                                                  @PathVariable String segment,
                                                  @PathVariable String prospectId) {
        log.info("Begin getProspectById() method");
        log.debug(
                String.format("getProspectById() method args, prospectId=[%s], segment=[%s]", prospectId, segment));

        String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        ResponseEntity<Object> responseEntity = dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());

        prospectUtil.checkOneProspect(responseEntity, jwtPayload);
        return responseEntity;
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping(value = "/{prospectId}", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> updateSMEProspect(@AuthenticationPrincipal JwtPayload jwtPayload,
                                                    @RequestBody JsonNode jsonNode,
                                                    @PathVariable String prospectId,
                                                    @PathVariable String segment) {
        log.info("Begin updateSMEProspect() method");
        log.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
                jsonNode.toString(), segment, prospectId));

        String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

        return dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.PUT, jsonNode,
                "updateSMEProspect()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/search", produces = "application/json", consumes = "application/json")
    public ResponseEntity<Object> searchProspect(@AuthenticationPrincipal JwtPayload jwtPayload,
                                                 @RequestBody JsonNode jsonNode,
                                                 @PathVariable String segment) {
        log.info("Begin searchProspect() method");
        log.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
                segment));

        String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

        ResponseEntity<Object> responseEntity = dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.POST, jsonNode,
                "searchProspect()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());

        prospectUtil.filterAllowedProspects(responseEntity, jwtPayload);
        return responseEntity;
    }
}
