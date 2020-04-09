package ae.rakbank.webapply.services;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import ae.rakbank.webapply.stub.ProspectsResponseStub;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.NullNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

import static ae.rakbank.webapply.services.ProspectValidatorService.ROOT_KEY;

public class ProspectValidatorServiceTest {

    private ProspectValidatorService prospectValidatorService;

    @Before
    public void init() {
        prospectValidatorService = new ProspectValidatorService();
    }

    @Test
    public void testFilterAllowedProspects() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getProspectsResponse();

        prospectValidatorService.validateAndFilterAllowedProspects(prospectsResponse, JwtPayloadStub.getJwtPayload());

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        ArrayNode rootNode = (ArrayNode) responseBody.get(ROOT_KEY);
        Assert.assertEquals(12, rootNode.size());
    }

    @Test
    public void testFilterAllowedProspectsForAgent() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getProspectsResponse();

        prospectValidatorService.validateAndFilterAllowedProspects(prospectsResponse, JwtPayloadStub.newAgentJwt());

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        ArrayNode rootNode = (ArrayNode) responseBody.get(ROOT_KEY);
        Assert.assertEquals(16, rootNode.size());
    }

    @Test
    public void testFilterAllowedProspectsForAgentWithNullNode() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getProspectsEmptyResponse();

        prospectValidatorService.validateAndFilterAllowedProspects(prospectsResponse, JwtPayloadStub.newCustomerJwt("1"));

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        NullNode rootNode = (NullNode) responseBody.get(ROOT_KEY);
        Assert.assertNotNull(rootNode);
    }

    @Test(expected = ApiException.class)
    public void testCheckNotOwnerOneProspect() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        jwtPayload.setPhoneNumber("0000000000");
        prospectValidatorService.validateProspectOwner(prospectsResponse, jwtPayload);
    }

    @Test
    public void testCheckOwnerOneProspect() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        prospectValidatorService.validateProspectOwner(prospectsResponse, jwtPayload);

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        Assert.assertNotNull(responseBody);
        Assert.assertEquals(12, responseBody.size());
    }

    @Test
    public void testCheckOwnerOneProspectWhenRoleAgent() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.newAgentJwt();
        prospectValidatorService.checkOwnerProspectId(null, jwtPayload);

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        Assert.assertNotNull(responseBody);
        Assert.assertEquals(12, responseBody.size());
    }

    @Test
    public void testCheckOwnerOneProspectWhenRoleCustomer() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.newCustomerJwt("1");
        prospectValidatorService.checkOwnerProspectId("1", jwtPayload);

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        Assert.assertNotNull(responseBody);
        Assert.assertEquals(12, responseBody.size());
    }

    @Test(expected = ApiException.class)
    public void testCheckOwnerOneProspectWhenCustomerIsNotOwnerOfProspect() {
        JwtPayload jwtPayload = JwtPayloadStub.newCustomerJwt("2");
        prospectValidatorService.checkOwnerProspectId("1", jwtPayload);
    }

}
