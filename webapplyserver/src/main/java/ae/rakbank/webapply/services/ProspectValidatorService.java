package ae.rakbank.webapply.services;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ProspectValidatorService {

    static final String ROOT_KEY = "searchResult";
    private static final String APPLICANT_INFO = "applicantInfo";
    private static final String MOBILE_NO = "mobileNo";

    public void validateAndFilterAllowedProspects(ResponseEntity<Object> responseForFiltering, JwtPayload jwtPayload) {
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

    public void validateProspectOwner(ResponseEntity<Object> responseForFiltering, JwtPayload jwtPayload) {
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            return;
        }

        String phoneNumber = jwtPayload.getPhoneNumber();
        JsonNode responseBody = (JsonNode)responseForFiltering.getBody();

        if (!phoneNumber.equals(responseBody.get(APPLICANT_INFO).get(MOBILE_NO).asText())) {
            throw new ApiException("The prospect is not allowed for current Customer", HttpStatus.FORBIDDEN);
        }
    }

    public void checkOwnerProspectId(String prospectId, JwtPayload jwtPayload) {
        if (UserRole.AGENT.equals(jwtPayload.getRole())) {
            return;
        }

        if (!prospectId.equals(jwtPayload.getProspectId())) {
            throw new ApiException("The prospect id is not allowed for current Customer", HttpStatus.FORBIDDEN);
        }
    }
}
