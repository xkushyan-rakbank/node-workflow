package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import ae.rakbank.webapply.stub.ResponseFactory;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class AuthorizationServiceImplTest {

    private AuthorizationServiceImpl authorizationService;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private JwtService jwtService;

    @Mock
    private OAuthService oAuthService;

    @Mock
    private OauthClient oauthClient;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        authorizationService = new AuthorizationServiceImpl(fileUtil, jwtService, oAuthService, oauthClient);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtherConfig());
    }

    @Test
    public void validateAndUpdateAgentJwtToken() {

        JwtPayload agentJwt = JwtPayloadStub.newAgentJwt();

        Mockito.when(jwtService.decrypt("test-token")).thenReturn(agentJwt);
        Mockito.when(jwtService.encrypt(agentJwt)).thenReturn("encrypted-token");

        String token = authorizationService.validateAndUpdateJwtToken("test-token");

        assertNotNull(token);
        assertEquals("encrypted-token", token);
        Mockito.verify(oAuthService).validateAndUpdateOauthToken(agentJwt);

    }

    @Test
    public void validateAndUpdateCustomerJwtToken() {

        JwtPayload agentJwt = JwtPayloadStub.newCustomerJwt("123");

        Mockito.when(jwtService.decrypt("test-token")).thenReturn(agentJwt);
        Mockito.when(jwtService.encrypt(agentJwt)).thenReturn("encrypted-token");

        String token = authorizationService.validateAndUpdateJwtToken("test-token");

        assertNotNull(token);
        assertEquals("encrypted-token", token);
        Mockito.verify(oAuthService).validateAndUpdateOauthToken(agentJwt);

    }

    @Test(expected = ApiException.class)
    public void validateAndUpdateCustomerJwtTokenWithNoPhoneNumber() {

        JwtPayload agentJwt = JwtPayloadStub.newCustomerJwtWithNoPhoneNumber();

        Mockito.when(jwtService.decrypt("test-token")).thenReturn(agentJwt);
        Mockito.when(jwtService.encrypt(agentJwt)).thenReturn("encrypted-token");

        authorizationService.validateAndUpdateJwtToken("test-token");

    }

    @Test(expected = ApiException.class)
    public void validateAndUpdateNoRoleJwtToken() {

        JwtPayload agentJwt = JwtPayloadStub.newNoRoleJwt();

        Mockito.when(jwtService.decrypt("test-token")).thenReturn(agentJwt);
        Mockito.when(jwtService.encrypt(agentJwt)).thenReturn("encrypted-token");

        authorizationService.validateAndUpdateJwtToken("test-token");
    }

    @Test
    public void createAgentJwtToken() {

        JsonNode newLoginResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> dehResponseEntity = ResponseEntity.ok(newLoginResponse);
        Mockito.when(oauthClient.authorize("theusername", "thepassword")).thenReturn(dehResponseEntity);
        Mockito.when(oAuthService.getExpireTime(dehResponseEntity)).thenReturn(LocalDateTime.of(2020, 01, 01, 00, 00));
        Mockito.when(jwtService.encrypt(Matchers.any(JwtPayload.class))).thenReturn("result-token");

        String agentJwtToken = authorizationService.createAgentJwtToken("theusername", "thepassword");
        assertNotNull(agentJwtToken);
    }

    @Test(expected = ApiException.class)
    public void createAgentTokenWhenCredentialsAreWrong() {

        Mockito.when(oauthClient.authorize("theusername", "thepassword")).thenThrow(new ApiException("Wrong credentials"));

        String agentJwtToken = authorizationService.createAgentJwtToken("theusername", "thepassword");
        assertNotNull(agentJwtToken);
    }

    @Ignore
    @Test
    public void createCustomerJwtToken() {
        JsonNode dehResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> dehResponseEntity = ResponseEntity.ok(dehResponse);
        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenReturn(dehResponseEntity);
        Mockito.when(jwtService.encrypt(Matchers.any(JwtPayload.class))).thenReturn("result-token");
        String token = authorizationService.createCustomerJwtToken("+37847563456", "123456789");
        assertNotNull(token);
    }

    @Ignore
    @Test(expected = ApiException.class)
    public void createCustomerTokenWhenCredentialsAreWrong() {
        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenThrow(new ApiException("Wrong credentials"));
        authorizationService.createCustomerJwtToken("+37847563456", "123456789");
    }

    @Test
    public void getPrincipal() {

        Mockito.when(jwtService.decrypt("test-token")).thenReturn(JwtPayloadStub.getJwtPayload());

        JwtPayload principal = authorizationService.getPrincipal("test-token");
        assertNotNull(principal);
        Mockito.verify(jwtService).decrypt("test-token");
    }

    @Test
    public void getTokenFromPrincipal() {

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();

        Mockito.when(jwtService.encrypt(jwtPayload)).thenReturn("the-new-jwt-token");

        String token = authorizationService.getTokenFromPrincipal(jwtPayload);

        assertNotNull(token);
        assertEquals("the-new-jwt-token", token);

        Mockito.verify(jwtService).encrypt(jwtPayload);

    }
}