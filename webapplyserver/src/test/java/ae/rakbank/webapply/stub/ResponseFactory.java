package ae.rakbank.webapply.stub;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ResponseFactory {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    public static JsonNode newDocumentValidResponse() {
        return objectMapper.createObjectNode()
                .put("testField", "testValue");
    }

    public static JsonNode newProspectByIdResponse() {
        return objectMapper.createObjectNode()
                .put("prospectId", "123456789")
                .set("applicantInfo", objectMapper.createObjectNode()
                        .put("countryCode", "UAE")
                        .put("mobileNo", "+37847563456")
                        .put("email", "email@localhost"));
    }

    public static JsonNode newProspectByIdWithWrongPhoneNumberResponse() {
        return objectMapper.createObjectNode()
                .put("prospectId", "123456789")
                .set("applicantInfo", objectMapper.createObjectNode()
                        .put("countryCode", "UAE")
                        .put("mobileNo", "+378475634561")
                        .put("email", "email@localhost"));
    }

    public static JsonNode newSearchProspectResponse() {
        JsonNode applicationInfo1 = objectMapper.createObjectNode().put("mobileNo", "+37847563456");
        JsonNode applicationInfo2 = objectMapper.createObjectNode().put("mobileNo", "+37847563456");
        JsonNode applicationInfo3 = objectMapper.createObjectNode().put("mobileNo", "+37847563457");
        return objectMapper.createObjectNode()
                .put("prospectId", "123456789")
                .set("searchResult", objectMapper.createArrayNode()
                        .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo1))
                        .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo2))
                        .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo3)));
    }

    public static JsonNode newLoginResponse() {
        return objectMapper.createObjectNode()
                .put("expires_in", 100)
                .put("login", "ok")
                .put("refresh_token", "refresh-token-value")
                .put("access_token", "access-token-value");
    }

    public static JsonNode newOtpVerifyResponseVerified() {
        return objectMapper.createObjectNode()
                .put("verified", "true");
    }

    public static JsonNode newOtpVerifyResponseUnverified() {
        return objectMapper.createObjectNode()
                .put("verified", "false");
    }

    public static JsonNode newOtpVerifyResponseInvalid() {
        return objectMapper.createObjectNode()
                .put("result", "false");
    }

    public static JsonNode newOtpGenerateResponse() {
        return objectMapper.createObjectNode()
                .put("generated", "true");
    }
    
    public static JsonNode createInviteResponse() {
        return objectMapper.createObjectNode()
                .put("Inviterefnum", "1234");
    }

}
