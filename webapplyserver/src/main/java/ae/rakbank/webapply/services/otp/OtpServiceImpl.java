package ae.rakbank.webapply.services.otp;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.services.AuthorizationService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Service
class OtpServiceImpl implements OtpService {

    private final DehClient dehClient;
    private final AuthorizationService authorizationService;
    private final FileUtil fileUtil;

    private String url;
    private boolean optEnabled = true;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
        url = dehBaseUrl.concat(appConfigJSON.get("DehURIs").get("otpUri").asText());
        optEnabled = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("OtpEnabled").asText().equals("Y");
    }

    @Override
    public OtpVerifyGenerateResponse verifyOrGenerate(HttpServletRequest httpRequest, JsonNode requestJSON) {
        return optEnabled
                ? verifyOrGenerateIfOptEnabled(httpRequest, requestJSON)
                : verifyOrGenerateIfOptDisabled();
    }

    private OtpVerifyGenerateResponse verifyOrGenerateIfOptEnabled(HttpServletRequest httpRequest, JsonNode requestJSON) {
        final ResponseEntity<?> result = dehClient.invokeApiEndpoint(httpRequest, url, HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null);
        String action = requestJSON.get("action").asText();
        boolean verifyResult = "verify".equalsIgnoreCase(action) && extractOtpVerificationResult(result);

        return new OtpVerifyGenerateResponse(verifyResult, result);
    }

    private OtpVerifyGenerateResponse verifyOrGenerateIfOptDisabled() {
        return new OtpVerifyGenerateResponse(true, ResponseEntity.ok().build());
    }

    private boolean extractOtpVerificationResult(ResponseEntity<?> optValidationResponse) {
        final JsonNode body = (JsonNode) optValidationResponse.getBody();
        return body != null && body.has("verified") && body.get("verified").asBoolean();
    }

}
