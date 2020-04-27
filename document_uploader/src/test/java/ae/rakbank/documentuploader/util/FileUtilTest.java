package ae.rakbank.documentuploader.util;

import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.core.io.FileSystemResourceLoader;

import static org.junit.Assert.*;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EnvUtil.class)
public class FileUtilTest {

    private FileUtil fileUtil;

    @Before
    public void init() {
        fileUtil = new FileUtil(new FileSystemResourceLoader());

        MockitoAnnotations.initMocks(this);
        mockStatic(EnvUtil.class);

        when(EnvUtil.getEnv())
                .thenReturn("local");
    }

    @Test
    public void getAppConfigJSON() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        assertNotNull(appConfigJSON);
    }

    @Test
    public void getRSAPublicKeyForLocal() {
        String rsaPublicKey = fileUtil.getRSAPublicKey();
        assertNull(rsaPublicKey);
    }

    @Test
    public void getRSAPublicKeyForNotLocal() {
        when(EnvUtil.getEnv())
                .thenReturn("uat");

        String rsaPublicKey = fileUtil.getRSAPublicKey();
        assertNull(rsaPublicKey);
    }

    @Test
    public void getRSAPrivateKey() {
        String rsaPrivateKey = fileUtil.getRSAPrivateKey();
        assertNotNull(rsaPrivateKey);
    }
}