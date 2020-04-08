package ae.rakbank.webapply.util;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Test;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.ResourceLoader;

import static org.junit.Assert.assertNotNull;

public class FileUtilTest {

    private FileUtil fileUtil;

    private ResourceLoader resourceLoader = new DefaultResourceLoader();

    @Before
    public void setUp() throws Exception {
        fileUtil = new FileUtil(resourceLoader);
        fileUtil.init();
    }

    @Test
    public void getOauthUser() {
        String oauthUser = fileUtil.getOauthUser();
        assertNotNull(oauthUser);
    }

    @Test
    public void getOauthPassword() {
        String oauthPassword = fileUtil.getOauthPassword();
        assertNotNull(oauthPassword);
    }

    @Test
    public void getAppConfigJSON() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        assertNotNull(appConfigJSON);
    }

    @Test
    public void getSMEProspectJSON() {
        JsonNode smeProspectJSON = fileUtil.getSMEProspectJSON();
        assertNotNull(smeProspectJSON);
    }

    @Test
    public void getDatalistJSON() {
        JsonNode datalistJSON = fileUtil.getDatalistJSON();
        assertNotNull(datalistJSON);
    }

    @Test
    public void getRSAPublicKey() {
        String rsaPublicKey = fileUtil.getRSAPublicKey();
        assertNotNull(rsaPublicKey);
    }

    @Test
    public void getRSAPrivateKey() {
        String rsaPrivateKey = fileUtil.getRSAPrivateKey();
        assertNotNull(rsaPrivateKey);
    }
}