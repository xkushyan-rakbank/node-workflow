package ae.rakbank.webapply.services;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.NullNode;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
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
        JsonNode responseBody = (JsonNode) responseForFiltering.getBody();

        if (responseBody.get(ROOT_KEY) instanceof NullNode) {
            log.warn("The searchResult node in DEH json response is null");
            return;
        }

        ArrayNode rootNode = (ArrayNode) responseBody.get(ROOT_KEY);
        List<Integer> indexesToRemove = new ArrayList<>(rootNode.size());

        for (int i = 0; i < rootNode.size(); i++) {
            if (!phoneNumber.equals(rootNode.get(i).get(APPLICANT_INFO).get(MOBILE_NO).asText())) {
                indexesToRemove.add(i);
            }
        }
        indexesToRemove.forEach(rootNode::remove);

    }

    public void validateProspectOwner(ResponseEntity<Object> responseForFiltering, JwtPayload jwtPayload) {
        UserRole role = Objects.requireNonNull(jwtPayload.getRole());
        if (UserRole.AGENT.equals(role)) {
            return;
        }

        String phoneNumber = jwtPayload.getPhoneNumber();
        JsonNode responseBody = (JsonNode) responseForFiltering.getBody();

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
