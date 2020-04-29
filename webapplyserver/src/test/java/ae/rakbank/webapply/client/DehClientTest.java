package ae.rakbank.webapply.client;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.util.DehUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.logging.log4j.util.Strings;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;

@RunWith(JUnit4.class)
public class DehClientTest {

    public static final String DATALIST_ENDPOINT_URL = "http://test-deh-url/datalistUrl";
    public static final String TEST_SEGMENT_FIELD_NAME = "testSegment";
    public static final String HTTP_TEST_ENDPOINT_URL = "http://test";
    private DehClient dehClient;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private DehUtil dehUtil;

    @Mock
    private RestTemplate restTemplate;

    final ObjectMapper mapper = new ObjectMapper();

    final ObjectNode jsonNodeDefaultDetails = mapper.createObjectNode();
    final ObjectNode jsonNodeAppDetails = mapper.createObjectNode();

    public DehClientTest() {
        // default constructor.
    }


    @Before
    public void setUp() {
        setUpAppDetails();
        MockitoAnnotations.initMocks(this);
        Mockito.when(fileUtil.getDatalistJSON()).thenReturn(jsonNodeDefaultDetails);
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(jsonNodeAppDetails);
        dehClient = new DehClient(fileUtil, authorizationService, dehUtil, restTemplate);
        dehClient.init();
    }

    private void setUpAppDetails() {

        ObjectNode baseUrls = mapper.createObjectNode();
        ObjectNode baseUrlsProfile = mapper.createObjectNode();
        baseUrlsProfile.put("DehBaseUrl", "http://test-deh-url");

        ObjectNode dehUris = mapper.createObjectNode();
        dehUris.put("datalistUri", "/datalistUrl");

        baseUrls.set("local", baseUrlsProfile);
        jsonNodeAppDetails.set("BaseURLs", baseUrls);
        jsonNodeAppDetails.set("DehURIs", dehUris);
    }

    @Test
    public void invokeApiEndpointWithEmptyBodyObjectResponseShouldBeOk() {

        final HttpEntity<JsonNode> requestEntity = new HttpEntity(null);

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(JsonNode.class))).thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "");

        Mockito.verify(restTemplate).exchange(HTTP_TEST_ENDPOINT_URL, HttpMethod.POST, requestEntity, JsonNode.class);
        Mockito.verify(authorizationService).getAndUpdateContextOauthToken();
        Assert.assertNotNull(objectResponseEntity);
        Assert.assertSame(HttpStatus.OK, objectResponseEntity.getStatusCode());
        Assert.assertNull(objectResponseEntity.getBody());

    }

    @Test
    public void invokeApiEndpointWithEmptyBodyObjectAndTokenIsPresentResponseShouldBeOk() {

        final HttpEntity<JsonNode> requestEntity = new HttpEntity(null);

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(JsonNode.class))).thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "some-token-value");

        Mockito.verify(restTemplate).exchange(HTTP_TEST_ENDPOINT_URL, HttpMethod.POST, requestEntity, JsonNode.class);
        Mockito.verify(authorizationService).getOAuthHeaders("some-token-value");
        Mockito.verifyNoMoreInteractions(authorizationService);
        Assert.assertNotNull(objectResponseEntity);
        Assert.assertSame(HttpStatus.OK, objectResponseEntity.getStatusCode());
        Assert.assertNull(objectResponseEntity.getBody());

    }

    @Test
    public void invokeApiEndpointWithEmptyBodyObjectResponseShouldBeOkWithResourceType() {

        final HttpEntity<JsonNode> requestEntity = new HttpEntity(null);

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(Resource.class))).thenReturn(ResponseEntity.ok().build());

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.TEXT_PLAIN,
                "");

        Mockito.verify(restTemplate).exchange(HTTP_TEST_ENDPOINT_URL, HttpMethod.POST, requestEntity, Resource.class);
        Assert.assertNotNull(objectResponseEntity);
        Assert.assertSame(HttpStatus.OK, objectResponseEntity.getStatusCode());
        Assert.assertNull(objectResponseEntity.getBody());

    }

    @Test(expected = ApiException.class)
    public void invokeApiEndpointWithEmptyBodyObjectResponseShouldBeBadRequest() {

        final HttpEntity requestEntity = new HttpEntity(null);
        final HttpClientErrorException httpClientErrorException = new HttpClientErrorException(HttpStatus.BAD_REQUEST);
        final ApiError error = ApiError
                .builder()
                .status(HttpStatus.BAD_REQUEST)
                .build();

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(JsonNode.class)))
                .thenThrow(httpClientErrorException);

        Mockito.when(dehUtil.initApiError(httpClientErrorException, HttpStatus.BAD_REQUEST)).thenReturn(error);

        dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "");

    }

    @Test(expected = ApiException.class)
    public void invokeApiEndpointWithEmptyBodyObjectResponseShouldBeInternalServerError() {

        final HttpEntity<JsonNode> requestEntity = new HttpEntity(null);
        final HttpServerErrorException httpClientErrorException =
                new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR);
        final ApiError error = ApiError
                .builder()
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .build();

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(JsonNode.class)))
                .thenThrow(httpClientErrorException);

        Mockito.when(dehUtil.initApiError(httpClientErrorException, HttpStatus.INTERNAL_SERVER_ERROR)).thenReturn(error);

        dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                null,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "");

    }

    @Test
    public void getDataListJSONDefault() {
        final ResponseEntity<JsonNode> response = dehClient.getDatalistJSON(Strings.EMPTY);

        Assert.assertNotNull(response);
        Assert.assertSame(HttpStatus.OK, response.getStatusCode());
        Assert.assertEquals(jsonNodeDefaultDetails, response.getBody());

    }

    @Test
    public void getDataListJSONFromRemoteResponseOk() {

        JsonNode dehResponse = mapper.createObjectNode();

        Mockito.when(restTemplate.exchange(eq(DATALIST_ENDPOINT_URL), eq(HttpMethod.GET), any(), eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok(dehResponse));

        final ResponseEntity<JsonNode> response = dehClient.getDatalistJSON(TEST_SEGMENT_FIELD_NAME);

        Assert.assertNotNull(response);
        Assert.assertSame(HttpStatus.OK, response.getStatusCode());
        Assert.assertSame(dehResponse, response.getBody());

        Mockito.verify(authorizationService).getAndUpdateContextOauthToken();
        Mockito.verify(authorizationService).getOAuthHeaders(any());

    }

    @Test(expected = ApiException.class)
    public void getDataListJSONFromRemoteResponseBadRequest() {

        final HttpClientErrorException httpClientErrorException = new HttpClientErrorException(HttpStatus.NOT_FOUND);

        Mockito.when(dehUtil.initApiError(httpClientErrorException, HttpStatus.BAD_REQUEST))
                .thenReturn(ApiError.builder().status(HttpStatus.NOT_FOUND).build());

        Mockito.when(restTemplate.exchange(eq(DATALIST_ENDPOINT_URL), eq(HttpMethod.GET), any(), eq(JsonNode.class)))
                .thenThrow(httpClientErrorException);

        dehClient.getDatalistJSON(TEST_SEGMENT_FIELD_NAME);
    }

    @Test(expected = ApiException.class)
    public void getDataListJSONFromRemoteResponseInternalServerError() {

        final HttpServerErrorException httpClientErrorException = new HttpServerErrorException(HttpStatus.BAD_GATEWAY);

        Mockito.when(dehUtil.initApiError(httpClientErrorException, HttpStatus.INTERNAL_SERVER_ERROR))
                .thenReturn(ApiError.builder().status(HttpStatus.BAD_GATEWAY).build());

        Mockito.when(restTemplate.exchange(eq(DATALIST_ENDPOINT_URL), eq(HttpMethod.GET), any(), eq(JsonNode.class)))
                .thenThrow(httpClientErrorException);

        dehClient.getDatalistJSON(TEST_SEGMENT_FIELD_NAME);
    }

    @Test
    public void invokeApiEndpointWithBodyObjectResponseShouldBeOk() throws IOException {

        final JsonNode requestNode = mapper.readTree("{\"field\":\"request\"}");
        final JsonNode responseNode = mapper.readTree("{\"field\":\"response\"}");

        final HttpEntity<JsonNode> requestEntity = new HttpEntity<>(requestNode);

        Mockito.when(restTemplate.exchange(eq(HTTP_TEST_ENDPOINT_URL), eq(HttpMethod.POST), eq(requestEntity),
                eq(JsonNode.class)))
                .thenReturn(ResponseEntity.ok().body(responseNode));

        final ResponseEntity<Object> objectResponseEntity = dehClient.invokeApiEndpoint(HTTP_TEST_ENDPOINT_URL,
                HttpMethod.POST,
                requestNode,
                "updateProspect()",
                MediaType.APPLICATION_JSON,
                "");

        Mockito.verify(restTemplate).exchange(HTTP_TEST_ENDPOINT_URL, HttpMethod.POST, requestEntity, JsonNode.class);
        Assert.assertNotNull(objectResponseEntity);
        Assert.assertSame(HttpStatus.OK, objectResponseEntity.getStatusCode());
        Assert.assertNotNull(objectResponseEntity.getBody());
        Assert.assertEquals(responseNode, objectResponseEntity.getBody());
    }
}
