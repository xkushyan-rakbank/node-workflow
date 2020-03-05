package ae.rakbank.webapply.util;

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
        JsonNode initialResponseBody = (JsonNode)prospectsResponse.getBody();
        ArrayNode rootNode = (ArrayNode)initialResponseBody.get(ROOT_KEY);
        Assert.assertEquals(12, rootNode.size());
    }
}
