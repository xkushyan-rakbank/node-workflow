package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.ConfigService;
import ae.rakbank.webapply.util.CriteriaParamsValidator;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

public class ConfigControllerTest {

    private ConfigController configController;

    @Mock
    private DehClient dehClient;

    @Mock
    private ConfigService configService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        configController = new ConfigController(dehClient, configService, new CriteriaParamsValidator());
    }

    @Test
    public void testInit() {
        ObjectNode config = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> responseEntity = ResponseEntity.badRequest().body(config);
        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(responseEntity);
        configController.init();
        Mockito.verify(dehClient).getDatalistJSON("sme");
    }

    @Test
    public void testInitWhenSegmentNotExists() {
        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(null);
        configController.init();
        Mockito.verify(dehClient).getDatalistJSON("sme");
    }

    @Test
    public void getWebApplyConfig() {
        ObjectNode config = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> responseEntity = ResponseEntity.ok(config);


        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(responseEntity);
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("test-field-name", "test-field-value");
        Mockito.when(configService.buildAppInitialState("sme", "RAKStarter", "customer", "desktop", config)).thenReturn(objectNode);


        ResponseEntity<JsonNode> webApplyConfig = configController.getWebApplyConfig("customer", "sme", "RAKStarter", "desktop");
        assertNotNull(webApplyConfig);
        assertEquals(objectNode, webApplyConfig.getBody());
        assertEquals(HttpStatus.OK, webApplyConfig.getStatusCode());

        Mockito.verify(configService).buildAppInitialState("sme", "RAKStarter", "customer", "desktop", config);

    }

    @Test
    public void getWebApplyConfigIfDehResponseIsError() {
        ObjectNode config = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> responseEntity = ResponseEntity.badRequest().body(config);


        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(responseEntity);
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("test-field-name", "test-field-value");
        Mockito.when(configService.buildAppInitialState("sme", "RAKStarter", "customer", "desktop", config)).thenReturn(objectNode);


        ResponseEntity<JsonNode> webApplyConfig = configController.getWebApplyConfig("customer", "sme", "RAKStarter", "desktop");
        assertNotNull(webApplyConfig);
        assertEquals(HttpStatus.BAD_REQUEST, webApplyConfig.getStatusCode());
        assertEquals(config, webApplyConfig.getBody());

        Mockito.verifyZeroInteractions(configService);

    }

    @Test
    public void loadAppInitialState() {

        ObjectNode config = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> responseEntity = ResponseEntity.ok(config);

        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(responseEntity);
        ResponseEntity<JsonNode> entity = configController.loadAppInitialState();

        assertNotNull(entity);
        assertEquals(HttpStatus.OK, entity.getStatusCode());

        ObjectNode correctResponse = objectMapper.createObjectNode();
        correctResponse.put("message", "reload configs successful");

        assertEquals(correctResponse, entity.getBody());

        Mockito.verify(dehClient).getDatalistJSON("sme");

    }

    @Test
    public void loadAppInitialStateIfDehErrorResponse() {

        ObjectNode config = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> responseEntity = ResponseEntity.badRequest().body(config);

        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(responseEntity);
        ResponseEntity<JsonNode> entity = configController.loadAppInitialState();

        assertNotNull(entity);
        assertEquals(HttpStatus.BAD_REQUEST, entity.getStatusCode());

        ObjectNode correctResponse = objectMapper.createObjectNode();

        assertEquals(correctResponse, entity.getBody());

        Mockito.verify(dehClient).getDatalistJSON("sme");

    }

    @Test(expected = ApiException.class)
    public void loadAppInitialStateIfDehResponseIsNull() {
        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(null);
        configController.loadAppInitialState();
    }

    @Test
    public void getWebApplyConfigReducedIfCacheExists() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        String cacheKey = "\"test-field\":\"test-value\"";
        Mockito.when(configService.getCacheKey("sme", "RAKStarter", "customer", "desktop", "reduced")).thenReturn(cacheKey);
        Mockito.when(configService.getCache(cacheKey)).thenReturn(cacheKey);

        ObjectNode cachedValue = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> ok = ResponseEntity.ok(cachedValue);

        Mockito.when(configService.getCachedData(Matchers.any(HttpHeaders.class), Matchers.eq(cacheKey), Matchers.eq(cacheKey))).thenReturn(ok);

        ResponseEntity<JsonNode> webApplyConfigReduced = configController.getWebApplyConfigReduced(request, "customer", "sme", "RAKStarter", "desktop");

        assertNotNull(webApplyConfigReduced);

        assertEquals(ok, webApplyConfigReduced);

        assertEquals(cachedValue, webApplyConfigReduced.getBody());

    }

    @Test
    public void getWebApplyConfigReducedIfNotExists() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        Mockito.when(configService.getCacheKey("sme", "RAKStarter", "customer", "desktop", "reduced")).thenReturn(null);

        ObjectNode cachedValue = objectMapper.createObjectNode();
        ResponseEntity<JsonNode> ok = ResponseEntity.ok(cachedValue);

        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(ok);

        Mockito.when(configService.buildAppInitialState("sme", "RAKStarter", "customer", "desktop", cachedValue)).thenReturn(cachedValue);

        Mockito.when(configService.getCachedData(Matchers.any(HttpHeaders.class), Matchers.any(), Matchers.any())).thenReturn(null);

        ResponseEntity<JsonNode> webApplyConfigReduced = configController.getWebApplyConfigReduced(request, "customer", "sme", "RAKStarter", "desktop");

        assertNotNull(webApplyConfigReduced);

        assertEquals(cachedValue, webApplyConfigReduced.getBody());

    }

    @Test
    public void getWebApplyConfigReducedIfDehResponseIsError() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        Mockito.when(configService.getCacheKey("sme", "RAKStarter", "customer", "desktop", "reduced")).thenReturn(null);

        ResponseEntity<JsonNode> badRequest = ResponseEntity.badRequest().build();

        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(badRequest);

        Mockito.when(configService.getCachedData(Matchers.any(HttpHeaders.class), Matchers.any(), Matchers.any())).thenReturn(null);

        ResponseEntity<JsonNode> webApplyConfigReduced = configController.getWebApplyConfigReduced(request, "customer", "sme", "RAKStarter", "desktop");

        assertNotNull(webApplyConfigReduced);
        assertNull(webApplyConfigReduced.getBody());

    }

    @Test
    public void getWebApplyConfigReducedIfDehResponseIsNull() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        Mockito.when(configService.getCacheKey("sme", "RAKStarter", "customer", "desktop", "reduced")).thenReturn(null);

        Mockito.when(dehClient.getDatalistJSON("sme")).thenReturn(null);

        Mockito.when(configService.getCachedData(Matchers.any(HttpHeaders.class), Matchers.any(), Matchers.any())).thenReturn(null);

        ResponseEntity<JsonNode> webApplyConfigReduced = configController.getWebApplyConfigReduced(request, "customer", "sme", "RAKStarter", "desktop");

        assertNull(webApplyConfigReduced);

    }

}