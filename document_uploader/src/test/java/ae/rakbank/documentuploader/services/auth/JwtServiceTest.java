package ae.rakbank.documentuploader.services.auth;

import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.stub.ConfigFactory;
import ae.rakbank.documentuploader.stub.JwtPayloadStub;
import ae.rakbank.documentuploader.stub.JwtTokenStub;
import ae.rakbank.documentuploader.util.FileUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class JwtServiceTest {

    @Mock
    private FileUtil fileUtil;

    private JwtService jwtService;

    @Before
    public void setUp() {
        jwtService = new JwtService(fileUtil);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtherConfig());
        jwtService.init();
    }

    @Test(expected = ApiException.class)
    public void decryptIfNoRole() {
        jwtService.decrypt(JwtTokenStub.getEncryptedTokenWithoutRole());
    }

    @Test
    public void decrypt() {
        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        JwtPayload decrypt = jwtService.decrypt(JwtTokenStub.getEncryptedToken());
        Assert.assertNotNull(decrypt);
        Assert.assertEquals(decrypt, jwtPayload);
    }
}
