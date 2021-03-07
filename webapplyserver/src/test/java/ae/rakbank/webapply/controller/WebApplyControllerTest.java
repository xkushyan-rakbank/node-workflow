package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.constants.AuthConstants;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.RecaptchaService;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.services.otp.OtpService;
import ae.rakbank.webapply.services.otp.OtpVerifyGenerateResponse;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import ae.rakbank.webapply.stub.RequestFactory;
import ae.rakbank.webapply.stub.ResponseFactory;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.assertNotNull;

import java.util.List;

public class WebApplyControllerTest {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private WebApplyController webApplyController;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private DehClient dehClient;

    @Mock
    private RecaptchaService recaptchaService;

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private OtpService optService;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newWebapplyControllerConfig());

        webApplyController = new WebApplyController(fileUtil, dehClient, recaptchaService, authorizationService, optService);
        webApplyController.init();
    }

    @Test
    public void health() {
        ResponseEntity<Object> health = webApplyController.health();
        Assert.assertNotNull(health);
        Assert.assertEquals(HttpStatus.OK, health.getStatusCode());
    }

    @Test
    public void generateVerifyOTPGenerateWithValidRequest() {
        JsonNode request = RequestFactory.newGenerateOtpRequest();

        JsonNode response = objectMapper.createObjectNode().put("response", "should-be-this-one");

        Mockito.when(optService.verifyOrGenerate(request))
                .thenReturn(new OtpVerifyGenerateResponse(true, ResponseEntity.ok(response)));

        ResponseEntity<Object> verifyOTPResponse = webApplyController.generateVerifyOTP(request, false);

        Assert.assertNotNull(verifyOTPResponse);
        Assert.assertEquals(HttpStatus.OK, verifyOTPResponse.getStatusCode());
        Assert.assertNotNull(verifyOTPResponse.getBody());
        JsonNode body = (JsonNode) verifyOTPResponse.getBody();
        Assert.assertEquals(response, body);
    }

    @Test
    public void generateVerifyOTPGenerateWithNoProspectIdRequest() {
        JsonNode request = RequestFactory.newGenerateOtpWithNoProspectIdRequest();

        JsonNode response = objectMapper.createObjectNode().put("response", "should-be-this-one");

        Mockito.when(optService.verifyOrGenerate(request))
                .thenReturn(new OtpVerifyGenerateResponse(true, ResponseEntity.ok(response)));

        ResponseEntity<Object> verifyOTPResponse = webApplyController.generateVerifyOTP(request, false);

        Assert.assertNotNull(verifyOTPResponse);
        Assert.assertEquals(HttpStatus.OK, verifyOTPResponse.getStatusCode());
        Assert.assertNotNull(verifyOTPResponse.getBody());
        JsonNode body = (JsonNode) verifyOTPResponse.getBody();
        Assert.assertEquals(response, body);
    }

    @Test(expected = NullPointerException.class)
    public void generateVerifyOTPGenerateWithInvalidRequest() {
        JsonNode request = RequestFactory.newGenerateOtpGenerationRequest();

        JsonNode response = objectMapper.createObjectNode().put("response", "should-be-this-one");

        Mockito.when(optService.verifyOrGenerate(request))
                .thenReturn(new OtpVerifyGenerateResponse(true, ResponseEntity.ok(response)));

        webApplyController.generateVerifyOTP(request, false);
    }

    @Test
    public void loginWhenLoginSuccess() {

        HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);

        JsonNode loginRequest = RequestFactory.newLoginRequest();

        JsonNode dehLoginResponse = ResponseFactory.newLoginResponse();

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/login", HttpMethod.POST, loginRequest,
                "login()", MediaType.APPLICATION_JSON, null))
                .thenReturn(ResponseEntity.ok(dehLoginResponse));

        Mockito.when(authorizationService.createAgentJwtToken("theusername", "thepassword"))
                .thenReturn("jwt-token-blablabla");

        ResponseEntity<Object> loginResponse = webApplyController.login(httpServletRequest, loginRequest);

        Assert.assertNotNull(loginRequest);
        Assert.assertEquals(HttpStatus.OK, loginResponse.getStatusCode());
        Assert.assertNotNull(loginResponse.getBody());
        Assert.assertEquals(dehLoginResponse, loginResponse.getBody());
        List<String> jwtHeader = loginResponse.getHeaders().get(AuthConstants.JWT_TOKEN_KEY);
        Assert.assertNotNull(jwtHeader);
        Assert.assertEquals("jwt-token-blablabla", jwtHeader.get(0));

        Mockito.verify(authorizationService).createAgentJwtToken("theusername", "thepassword");

    }

    @Test
    public void loginWhenLoginNotSuccess() {

        HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);

        JsonNode loginRequest = RequestFactory.newLoginRequest();

        JsonNode dehLoginResponse = ResponseFactory.newLoginResponse();

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/login", HttpMethod.POST, loginRequest,
                "login()", MediaType.APPLICATION_JSON, null))
                .thenReturn(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dehLoginResponse));

        ResponseEntity<Object> loginResponse = webApplyController.login(httpServletRequest, loginRequest);

        Assert.assertNotNull(loginRequest);
        Assert.assertEquals(HttpStatus.UNAUTHORIZED, loginResponse.getStatusCode());
        Assert.assertNotNull(loginResponse.getBody());
        Assert.assertEquals(dehLoginResponse, loginResponse.getBody());
        List<String> jwtHeader = loginResponse.getHeaders().get(AuthConstants.JWT_TOKEN_KEY);
        Assert.assertNull(jwtHeader);

        Mockito.verifyNoMoreInteractions(authorizationService);

    }
    
    @Test
    public void createInviteSuccess(){
    	//HttpServletRequest httpServletRequest = Mockito.mock(HttpServletRequest.class);
    	JsonNode createInviteRequest = RequestFactory.createInviteRequest();

    	JsonNode dehResponse = ResponseFactory.createInviteResponse();

        ResponseEntity<Object> responseEntity = ResponseEntity.ok(dehResponse);
    	 JwtPayload jwt = JwtPayloadStub.newAgentJwt();
    	 Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.POST,
    			 createInviteRequest, "createInvite()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken())).thenReturn(responseEntity);
    	 
    	 ResponseEntity<Object> createInviteResponse = webApplyController.createInvite(jwt, createInviteRequest);
    	 assertNotNull(createInviteRequest);
    	  Assert.assertEquals(HttpStatus.OK, createInviteResponse.getStatusCode());
          Assert.assertNotNull(createInviteResponse.getBody());
          Assert.assertEquals(dehResponse, createInviteResponse.getBody());
          Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.POST,
        		  createInviteRequest, "createInvite()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken());
    }
    
    

}