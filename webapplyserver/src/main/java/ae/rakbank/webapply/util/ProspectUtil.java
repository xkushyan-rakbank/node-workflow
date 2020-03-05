package ae.rakbank.webapply.util;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ProspectUtil {

     static final String ROOT_KEY = "searchResult";
    private static final String APPLICANT_INFO = "applicantInfo";
    private static final String MOBILE_NO = "mobileNo";

    public void filterAllowedProspects(ResponseEntity<Object> responseForFiltering, JwtPayload jwtPayload) {
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            return;
        }

        String phoneNumber = jwtPayload.getPhoneNumber();
        JsonNode responseBody = (JsonNode)responseForFiltering.getBody();
        ArrayNode rootNode = (ArrayNode)responseBody.get(ROOT_KEY);

        for (int i = 0; i < rootNode.size(); i++) {
            if (!phoneNumber.equals(rootNode.get(i).get(APPLICANT_INFO).get(MOBILE_NO).asText())) {
                rootNode.remove(i);
                i--;
            }
        }
    }
}
