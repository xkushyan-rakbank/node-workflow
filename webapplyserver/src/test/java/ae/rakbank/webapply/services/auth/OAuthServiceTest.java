package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.constants.AuthConstants;
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
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import javax.servlet.ServletContext;

import java.time.LocalDateTime;

import static org.junit.Assert.*;

@Ignore
public class OAuthServiceTest {

    private OAuthService oAuthService;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private OauthClient oauthClient;

    @Mock
    private ServletContext servletContext;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        oAuthService = new OAuthService(fileUtil, servletContext, oauthClient);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newOtherConfig());
        oAuthService.init();
    }

    @Test
    public void getNewContextOauthToken() {

        JsonNode newLoginResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> jsonNodeResponseEntity = ResponseEntity.ok(newLoginResponse);

        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenReturn(jsonNodeResponseEntity);

        String token = oAuthService.getAndUpdateContextOauthToken();
        assertNotNull(token);
        assertEquals("access-token-value", token);
    }

    @Test
    public void getUpdateContextOauthToken() {

        JsonNode newLoginResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> jsonNodeResponseEntity = ResponseEntity.ok(newLoginResponse);

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        ResponseEntity<JwtPayload> ok = ResponseEntity.ok(jwtPayload);

        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(ok);
        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_EXPIRED_TIME_KEY)).thenReturn(LocalDateTime.now().toString());
        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenReturn(jsonNodeResponseEntity);

        String token = oAuthService.getAndUpdateContextOauthToken();
        assertNotNull(token);
        assertEquals("access-token-value", token);
    }

    @Test
    public void getUpdateContextOauthTokenIfResponseIsError() {

        JsonNode newLoginResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> jsonNodeResponseEntity = ResponseEntity.badRequest().body(newLoginResponse);

        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        ResponseEntity<JwtPayload> ok = ResponseEntity.ok(jwtPayload);

        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(ok);
        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_EXPIRED_TIME_KEY)).thenReturn(LocalDateTime.now().toString());
        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenReturn(jsonNodeResponseEntity);

        String token = oAuthService.getAndUpdateContextOauthToken();
        assertNotNull(token);
        assertEquals("access-token-value", token);
    }

    @Test
    public void getUpdateContextOauthTokenIfTokenExpired() {

        JsonNode newLoginResponse = ResponseFactory.newLoginResponse();
        ResponseEntity<JsonNode> jsonNodeResponseEntity = ResponseEntity.badRequest().body(newLoginResponse);

        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(jsonNodeResponseEntity);
        Mockito.when(servletContext.getAttribute(AuthConstants.OAUTH_CONTEXT_EXPIRED_TIME_KEY)).thenReturn(LocalDateTime.now().plusDays(1).toString());
        Mockito.when(oauthClient.authorize("theoauthusername", "theoauthpassword")).thenReturn(jsonNodeResponseEntity);

        String token = oAuthService.getAndUpdateContextOauthToken();
        assertNotNull(token);
        assertEquals("access-token-value", token);
    }

    @Test(expected = ApiException.class)
    public void validateAndUpdateOauthTokenWithNoAccessToken() {
        oAuthService.validateAndUpdateOauthToken(JwtPayloadStub.getJwtPayloadWithNoAccessToken());
    }

    @Test(expected = ApiException.class)
    public void validateAndUpdateOauthTokenWithNoRefreshToken() {
        oAuthService.validateAndUpdateOauthToken(JwtPayloadStub.getJwtPayloadWithNoRefreshToken());
    }

    @Test(expected = ApiException.class)
    public void validateAndUpdateOauthTokenWithNoExpiryTime() {
        oAuthService.validateAndUpdateOauthToken(JwtPayloadStub.getJwtPayloadWithNoExpiryTime());
    }

    @Test
    public void validateAndUpdateOauthTokenExpiredTime() {
        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        Mockito.when(oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken())).thenReturn(ResponseEntity.ok(ResponseFactory.newLoginResponse()));
        oAuthService.validateAndUpdateOauthToken(jwtPayload);

        assertEquals("access-token-value", jwtPayload.getOauthAccessToken());
        assertEquals("refresh-token-value", jwtPayload.getOauthRefreshToken());
    }

    @Test
    public void validateAndUpdateOauthTokenNotExpiredTime() {
        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayloadExpTomorrow();
        Mockito.when(oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken())).thenReturn(ResponseEntity.ok(ResponseFactory.newLoginResponse()));
        oAuthService.validateAndUpdateOauthToken(jwtPayload);

        assertEquals("access-token", jwtPayload.getOauthAccessToken());
        assertEquals("refresh-token", jwtPayload.getOauthRefreshToken());
    }

}