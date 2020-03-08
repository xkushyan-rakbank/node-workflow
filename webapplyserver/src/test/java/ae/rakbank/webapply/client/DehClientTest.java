package ae.rakbank.webapply.client;

import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.util.DehUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import static org.mockito.Matchers.*;

import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@RunWith(JUnit4.class)
public class DehClientTest {

    private DehClient dehClient;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private DehUtil dehUtil;

    @Mock
    private RestTemplate restTemplate;



    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        dehClient = new DehClient(fileUtil, authorizationService, dehUtil, restTemplate);
    }

    @Test
    public void invokeApiEndpoint1() {

        Mockito.when(restTemplate.exchange(eq("http://test"), eq(HttpMethod.POST), any(), eq(JsonNode.class))).thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint("http://test",
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "");
        Assert.assertNotNull(objectResponseEntity);
    }

    @Test
    public void invokeApiEndpoint2() {

        Mockito.when(restTemplate.exchange(eq("http://test"), eq(HttpMethod.POST), any(), eq(JsonNode.class))).thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint("http://test",
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "Test123");
        Assert.assertNotNull(objectResponseEntity);
    }

    @Test
    public void getDatalistJSON() {
    }
}