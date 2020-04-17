package ae.rakbank.documentuploader.util;

import org.junit.Test;

import static org.junit.Assert.*;

public class EnvUtilTest {

    @Test
    public void getEnv() {
        String env = EnvUtil.getEnv();
        assertNotNull(env);
    }

    @Test
    public void getConfigDir() {
        String configDir = EnvUtil.getConfigDir();
        assertNotNull(configDir);
    }

    @Test
    public void getUploadDir() {
        String uploadDir = EnvUtil.getUploadDir();
        assertNotNull(uploadDir);
    }

    @Test
    public void getScannedDocsDir() {
        String scannedDocsDir = EnvUtil.getScannedDocsDir();
        assertNotNull(scannedDocsDir);
    }

    @Test
    public void getS3ObjectsDir() {
        String s3ObjectsDir = EnvUtil.getS3ObjectsDir();
        assertNotNull(s3ObjectsDir);
    }

    @Test
    public void isProd() {
        Boolean isProd = EnvUtil.isProd();
        assertNotNull(isProd);
    }
}
