package ae.rakbank.webapply.client;

import ae.rakbank.webapply.util.DehUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import static org.mockito.Matchers.*;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

public class OauthClientTest {

    private OauthClient oauthClient;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private DehUtil dehUtil;

    @Mock
    private RestTemplate restTemplate;

    private final ObjectMapper mapper = new ObjectMapper();

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        oauthClient = new OauthClient(fileUtil, dehUtil, restTemplate);
        setupAppConfig();
        oauthClient.init();
    }

    private void setupAppConfig() {

        ObjectNode oAuthConfigs = mapper.createObjectNode();
        ObjectNode config = mapper.createObjectNode();

        oAuthConfigs.put("OAuthGrantType", "");
        oAuthConfigs.put("OAuthClientId", "");
        oAuthConfigs.put("OAuthClientSecret", "");
        oAuthConfigs.put("OAuthBankId", "");
        oAuthConfigs.put("OAuthChannelId", "");
        oAuthConfigs.put("OAuthLangId", "");
        oAuthConfigs.put("OAuthLoginFlag", "");
        oAuthConfigs.put("OAuthLoginType", "");
        oAuthConfigs.put("OAuthStateMode", "");

        config.set("OtherConfigs", mapper.createObjectNode().set("local", oAuthConfigs));
        config.set("BaseURLs", mapper.createObjectNode().set("local", mapper.createObjectNode().put("OAuthBaseUrl", "http://base-url")));
        config.set("OAuthURIs", mapper.createObjectNode().put("generateTokenUri", "/token-uri"));

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(config);
    }

    @Test
    public void authorize() {
        Mockito.when(restTemplate.exchange(eq("http://base-url/token-uri"), eq(HttpMethod.POST), any(), eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<JsonNode> responseEntity = oauthClient.authorize("userName", "password");

        Assert.assertNotNull(responseEntity);
    }

    @Test
    public void refreshAccessToken() {
    }
}