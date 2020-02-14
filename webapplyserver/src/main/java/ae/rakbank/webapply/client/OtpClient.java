package ae.rakbank.webapply.client;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@RequiredArgsConstructor
public class OtpClient {


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
}
