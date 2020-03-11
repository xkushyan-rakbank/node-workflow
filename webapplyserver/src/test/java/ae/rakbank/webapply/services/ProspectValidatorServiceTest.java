package ae.rakbank.webapply.services;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import ae.rakbank.webapply.stub.ProspectsResponseStub;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static ae.rakbank.webapply.services.ProspectValidatorService.ROOT_KEY;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProspectValidatorServiceTest {

    @Autowired
    private ProspectValidatorService prospectValidatorService;

    @Test
    public void testFilterAllowedProspects() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getProspectsResponse();

        prospectValidatorService.validateAndFilterAllowedProspects(prospectsResponse, JwtPayloadStub.getJwtPayload());

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        ArrayNode rootNode = (ArrayNode) responseBody.get(ROOT_KEY);
        Assert.assertEquals(12, rootNode.size());
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
        Assert.assertEquals(12, responseBody.size());
    }
}
