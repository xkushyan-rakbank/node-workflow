package ae.rakbank.webapply.services.auth;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.ServletContext;
import java.time.LocalDateTime;

import static ae.rakbank.webapply.constants.AuthConstants.EXPIRES_IN;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_CONTEXT_EXPIRED_TIME_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_CONTEXT_OBJECT_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_REFRESH_TOKEN_KEY;

public class ContextOAuthServiceTest {

    private ContextOAuthService contextOAuthService;

    @Mock
    private OauthClient oauthClient;

    @Mock
    private ServletContext servletContext;

    @Mock
    private FileUtil fileUtil;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        contextOAuthService = new ContextOAuthService(oauthClient, servletContext, fileUtil);
    }

    @Test
    public void refreshAndGet() {
        JsonNode node = objectMapper.createObjectNode()
                .put(OAUTH_REFRESH_TOKEN_KEY, "oauth-test-key");

        JsonNode oauthClientResponse = objectMapper.createObjectNode()
                .put(EXPIRES_IN, 100);

        ResponseEntity<JsonNode> oauthResponse = ResponseEntity.ok(oauthClientResponse);

        Mockito.when(servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(ResponseEntity.ok().body(node));
        Mockito.when(oauthClient.refreshAccessToken("oauth-test-key")).thenReturn(oauthResponse);

        ResponseEntity<JsonNode> responseEntity = contextOAuthService.refreshAndGet();
        Assert.assertNotNull(responseEntity);

        Mockito.verify(servletContext).setAttribute(OAUTH_CONTEXT_OBJECT_KEY, oauthResponse);
        Mockito.verify(servletContext).setAttribute(ArgumentMatchers.eq(OAUTH_CONTEXT_EXPIRED_TIME_KEY), ArgumentMatchers.any(LocalDateTime.class));

    }

    @Test
    public void refreshAndGetForAgent() {
        JsonNode node = objectMapper.createObjectNode()
                .put(OAUTH_REFRESH_TOKEN_KEY, "oauth-test-key");

        JsonNode oauthClientResponse = objectMapper.createObjectNode()
                .put(EXPIRES_IN, 100);
        ResponseEntity<JsonNode> oauthResponse = ResponseEntity.ok(oauthClientResponse);

        Mockito.when(servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(ResponseEntity.ok().body(node));
        Mockito.when(oauthClient.refreshAccessToken("oauth-test-key")).thenThrow(new ApiException(ApiError.builder().status(HttpStatus.BAD_REQUEST).build(),
                HttpStatus.BAD_REQUEST));
        Mockito.when(fileUtil.getOauthUser()).thenReturn("username");
        Mockito.when(fileUtil.getOauthPassword()).thenReturn("password");
        Mockito.when(oauthClient.authorize("username", "password")).thenReturn(oauthResponse);

        ResponseEntity<JsonNode> responseEntity = contextOAuthService.refreshAndGet();
        Assert.assertNotNull(responseEntity);

        Mockito.verify(servletContext).setAttribute(OAUTH_CONTEXT_OBJECT_KEY, oauthResponse);
        Mockito.verify(servletContext).setAttribute(ArgumentMatchers.eq(OAUTH_CONTEXT_EXPIRED_TIME_KEY), ArgumentMatchers.any(LocalDateTime.class));

    }

    @Test(expected = ApiException.class)
    public void refreshAndGetForAgentIfError() {
        JsonNode node = objectMapper.createObjectNode()
                .put(OAUTH_REFRESH_TOKEN_KEY, "oauth-test-key");

        Mockito.when(servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY)).thenReturn(ResponseEntity.ok().body(node));
        Mockito.when(oauthClient.refreshAccessToken("oauth-test-key")).thenThrow(new ApiException(ApiError.builder().status(HttpStatus.INTERNAL_SERVER_ERROR).build(),
                HttpStatus.BAD_REQUEST));

        contextOAuthService.refreshAndGet();
    }

    @Test
    public void setContextOauth() {
        JsonNode oauthClientResponse = objectMapper.createObjectNode()
                .put(EXPIRES_IN, 100);

        ResponseEntity<JsonNode> response = ResponseEntity.ok(oauthClientResponse);


        contextOAuthService.setContextOauth(response);
        Mockito.verify(servletContext).setAttribute(OAUTH_CONTEXT_OBJECT_KEY, response);
        Mockito.verify(servletContext).setAttribute(ArgumentMatchers.eq(OAUTH_CONTEXT_EXPIRED_TIME_KEY), ArgumentMatchers.any(LocalDateTime.class));
    }
}