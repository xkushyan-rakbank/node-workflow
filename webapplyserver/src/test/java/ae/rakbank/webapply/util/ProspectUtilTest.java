package ae.rakbank.webapply.util;

import ae.rakbank.webapply.dto.JwtPayload;
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

import static ae.rakbank.webapply.util.ProspectUtil.ROOT_KEY;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ProspectUtilTest {

    @Autowired
    private ProspectUtil prospectUtil;

    @Test
    public void testFilterAllowedProspects() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getProspectsResponse();

        prospectUtil.filterAllowedProspects(prospectsResponse, JwtPayloadStub.getJwtPayload());

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        ArrayNode rootNode = (ArrayNode) responseBody.get(ROOT_KEY);
        Assert.assertEquals(12, rootNode.size());
    }

    @Test
    public void testCheckNotOwnerOneProspect() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        jwtPayload.setPhoneNumber("0000000000");
        prospectUtil.checkOneProspect(prospectsResponse, jwtPayload);

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        Assert.assertEquals(0, responseBody.size());
    }

    @Test
    public void testCheckOwnerOneProspect() {

        ResponseEntity<Object> prospectsResponse = ProspectsResponseStub.getOneProspectResponse();

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        prospectUtil.checkOneProspect(prospectsResponse, jwtPayload);

        Assert.assertNotNull(prospectsResponse);
        JsonNode responseBody = (JsonNode) prospectsResponse.getBody();
        Assert.assertEquals(12, responseBody.size());
    }
}
