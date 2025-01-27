package ae.rakbank.webapply.services.otp;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.RequestFactory;
import ae.rakbank.webapply.stub.ResponseFactory;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

public class OtpServiceDisabledImplTest {

    @Mock
    private DehClient dehClient;

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private FileUtil fileUtil;

    private OtpServiceImpl otpService;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        otpService = new OtpServiceImpl(dehClient, authorizationService, fileUtil);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtpConfigDisabled());
        otpService.init();
    }

    @Test
    public void verifyIfResultTrue() {
        JsonNode requestJSON = RequestFactory.newGenerateOtpValidationRequest();
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/otp", HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null)).thenReturn(ResponseEntity.ok(ResponseFactory.newOtpVerifyResponseVerified()));
        final OtpVerifyGenerateResponse response = otpService.verifyOrGenerate(requestJSON);
        boolean[] result = new boolean[1];
        HttpEntity<?>[] httpResult = new HttpEntity[1];
        response.ifVerifySuccessThen(() -> result[0] = true).execute(httpEntity -> httpResult[0] = httpEntity);
        Assert.assertTrue(result[0]);
        Assert.assertNotNull(httpResult[0]);
        Assert.assertNull(httpResult[0].getBody());
    }

    @Test
    public void verifyIfResultFalse() {
        JsonNode requestJSON = RequestFactory.newGenerateOtpValidationRequest();
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/otp", HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null)).thenReturn(ResponseEntity.ok(ResponseFactory.newOtpVerifyResponseUnverified()));
        final OtpVerifyGenerateResponse response = otpService.verifyOrGenerate(requestJSON);
        boolean[] result = new boolean[1];
        HttpEntity<?>[] httpResult = new HttpEntity[1];
        response.ifVerifySuccessThen(() -> result[0] = true).execute(httpEntity -> httpResult[0] = httpEntity);
        Assert.assertTrue(result[0]);
        Assert.assertNotNull(httpResult[0]);
        Assert.assertNull(httpResult[0].getBody());
    }

    @Test
    public void verifyIfResultInvalid() {
        JsonNode requestJSON = RequestFactory.newGenerateOtpValidationRequest();
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/otp", HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null)).thenReturn(ResponseEntity.ok(ResponseFactory.newOtpVerifyResponseInvalid()));
        final OtpVerifyGenerateResponse response = otpService.verifyOrGenerate(requestJSON);
        boolean[] result = new boolean[1];
        HttpEntity<?>[] httpResult = new HttpEntity[1];
        response.ifVerifySuccessThen(() -> result[0] = true).execute(httpEntity -> httpResult[0] = httpEntity);
        Assert.assertTrue(result[0]);
        Assert.assertNotNull(httpResult[0]);
        Assert.assertNull(httpResult[0].getBody());
    }

    @Test
    public void verifyIfResultIsNull() {
        JsonNode requestJSON = RequestFactory.newGenerateOtpValidationRequest();
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/otp", HttpMethod.POST, requestJSON,
                "generateVerifyOTP()", MediaType.APPLICATION_JSON, null)).thenReturn(ResponseEntity.ok().build());
        final OtpVerifyGenerateResponse response = otpService.verifyOrGenerate(requestJSON);
        boolean[] result = new boolean[1];
        HttpEntity<?>[] httpResult = new HttpEntity[1];
        response.ifVerifySuccessThen(() -> result[0] = true).execute(httpEntity -> httpResult[0] = httpEntity);
        Assert.assertTrue(result[0]);
        Assert.assertNotNull(httpResult[0]);
        Assert.assertNull(httpResult[0].getBody());
    }

}