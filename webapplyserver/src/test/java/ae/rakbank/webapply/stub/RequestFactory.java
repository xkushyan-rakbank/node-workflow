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

}
