package ae.rakbank.webapply.services.otp;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.RequestFactory;
import ae.rakbank.webapply.util.FileUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;

public class OtpServiceImplTest {

    @Mock
    private DehClient dehClient;

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private FileUtil fileUtil;

    private OtpServiceImpl otpService;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        otpService = new OtpServiceImpl(dehClient, authorizationService, fileUtil);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtpConfig());
        otpService.init();
    }

    @Ignore
    @Test
    public void verifyOrGenerate() {
        final OtpVerifyGenerateResponse response = otpService.verifyOrGenerate(RequestFactory.newGenerateOtpValidationRequest());
        final OtpVerifyGenerateResponse ok = response.ifVerifySuccessThen(() -> System.out.printf("OK"));
        final Boolean result = ok.execute(HttpEntity::hasBody);
        Assert.assertTrue(result);
    }
}