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


}
