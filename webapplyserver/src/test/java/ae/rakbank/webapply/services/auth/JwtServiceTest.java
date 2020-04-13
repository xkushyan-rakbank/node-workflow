package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import ae.rakbank.webapply.util.FileUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class JwtServiceTest {

    public static final String ENCRYPTED_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJPQXV0aFRva2VuIjoiYWNjZXNzLX" +
            "Rva2VuIiwicm9sZSI6IkNVU1RPTUVSIiwicGhvbmVOdW1iZXIiOiIxMjM0MTIzNDEiLCJPQXV0aFJlZnJlc2hUb2tlbiI6InJlZnJlc2" +
            "gtdG9rZW4iLCJvYXV0aFRva2VuRXhwaXJ5VGltZSI6IjIwMjAtMDEtMDFUMDA6MDAifQ.sFO0vQ4rbbGTIB31QRZhDb7By7886DmBU-cCEbRAEug";
    public static final String ENCRYPTED_TOKEN_WITHOUT_ROLE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZU51bWJlciI6" +
            "IjEyMzQxMjM0MSIsIm9hdXRoVG9rZW5FeHBpcnlUaW1lIjoiMjAyMC0wMS0wMVQwMDowMCJ9.Ewda0v4WSuR1RXW_EChZHPgr2Hlybosd8BteBS2Ozj8";
    @Mock
    private FileUtil fileUtil;

    private JwtService jwtService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        jwtService = new JwtService(fileUtil);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtherConfig());
        jwtService.init();
    }

    @Test
    public void encrypt() {
        String encrypt = jwtService.encrypt(JwtPayloadStub.getJwtPayload());
        Assert.assertNotNull(encrypt);
        Assert.assertEquals(ENCRYPTED_TOKEN, encrypt);
    }

    @Test
    public void decrypt() {
        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        JwtPayload decrypt = jwtService.decrypt(ENCRYPTED_TOKEN);
        Assert.assertNotNull(decrypt);
        Assert.assertEquals(decrypt, jwtPayload);
    }

    @Test(expected = ApiException.class)
    public void decryptIfNoRole() {
        jwtService.decrypt(ENCRYPTED_TOKEN_WITHOUT_ROLE);
    }

}