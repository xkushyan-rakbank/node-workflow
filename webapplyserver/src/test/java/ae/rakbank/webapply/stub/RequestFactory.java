package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class RequestFactory {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static JsonNode newCreateProspectRequest() {
        return objectMapper.createObjectNode().set("applicantInfo", objectMapper.createObjectNode()
                .put("countryCode", "UAE")
                .put("mobileNo", "+37847563456")
                .put("email", "email@localhost"));
    }

    public static JsonNode newSearchProspectRequest() {
        return objectMapper.createObjectNode()
                .put("prospectId", "123456789")
                .set("applicantInfo", objectMapper.createObjectNode()
                        .put("countryCode", "UAE")
                        .put("mobileNo", "+37847563456")
                        .put("email", "email@localhost"));
    }

    public static JsonNode newGenerateOtpRequest() {
        return objectMapper.createObjectNode()
                .put("action", "generate")
                .put("prospectId", "123456789")
                .put("mobileNo", "+37847563456");
    }

    public static JsonNode newGenerateOtpGenerationRequest() {
        return objectMapper.createObjectNode()
                .put("action", "generate");
    }

    public static JsonNode newGenerateOtpValidationRequest() {
        return objectMapper.createObjectNode()
                .put("action", "validate")
                .put("phoneNo", "+37847563456")
                .put("prospectId", "123456789")
                .put("otp", "111222333");
    }

    public static JsonNode newGenerateOtpWithNoProspectIdRequest() {
        return objectMapper.createObjectNode()
                .put("action", "generate")
                .put("mobileNo", "+37847563456")
                .put("recaptchaToken", "re-captcha-token");
    }

    public static JsonNode newLoginRequest() {
        return objectMapper.createObjectNode().put("username", "theusername")
                .put("password", "thepassword");
    }

}
