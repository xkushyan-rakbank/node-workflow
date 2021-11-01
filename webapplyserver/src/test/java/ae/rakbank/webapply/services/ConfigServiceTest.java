package ae.rakbank.webapply.services;

import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;

import javax.servlet.ServletContext;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class ConfigServiceTest {

    private ConfigService configService;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private ServletContext servletContext;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newRecaptchaConfig());
        Mockito.when(fileUtil.getSMEProspectJSON()).thenReturn(ConfigFactory.newRecaptchaSMEConfig());

        configService = new ConfigService(fileUtil, servletContext);
        configService.init();
    }

    @Test
    public void buildAppInitialState() {

        ObjectNode dataList = objectMapper.createObjectNode();
        dataList.put("field-to-test", "value-to-test");

        JsonNode result = configService.buildAppInitialState("segment", "product", "CUSTOMER", "device", dataList);

        assertNotNull(result);
        assertTrue(result.get("recaptchaEnable").asBoolean());
        assertTrue(result.get("lemniskEnable").asBoolean());
        assertEquals("re-captcha-site-key", result.get("reCaptchaSiteKey").asText());
        assertEquals("http://TermsConditionsUrl", result.get("termsConditionsUrl").asText());
        assertEquals("http://ServicePricingGuideUrl", result.get("servicePricingGuideUrl").asText());
        assertEquals("http://RAKvaluePlusReadMoreUrl", result.get("rakValuePlusReadMoreUrl").asText());
        assertEquals("http://RAKvalueMaxReadMoreUrl", result.get("rakValueMaxReadMoreUrl").asText());
        assertEquals("http://RAKvaluePlusIslamicReadMoreUrl", result.get("rakValuePlusIslamicReadMoreUrl").asText());
        assertEquals("http://RAKvalueMaxIslamicReadMoreUrl", result.get("rakValueMaxIslamicReadMoreUrl").asText());
        assertEquals("null", result.get("prospect").asText());

        Mockito.verify(servletContext).setAttribute("SEGMENT_PRODUCT_CUSTOMER_DEVICE", result.toString());

    }

    @Test
    public void buildAppInitialStateWithCorrectSme() {

        ObjectNode dataList = objectMapper.createObjectNode();
        dataList.put("field-to-test", "value-to-test");

        JsonNode result = configService.buildAppInitialState("sme", "product", "CUSTOMER", "device", dataList);

        assertNotNull(result);
        assertTrue(result.get("recaptchaEnable").asBoolean());
        assertTrue(result.get("lemniskEnable").asBoolean());
        assertEquals("re-captcha-site-key", result.get("reCaptchaSiteKey").asText());
        assertEquals("http://TermsConditionsUrl", result.get("termsConditionsUrl").asText());
        assertEquals("http://ServicePricingGuideUrl", result.get("servicePricingGuideUrl").asText());
        assertEquals("http://RAKvaluePlusReadMoreUrl", result.get("rakValuePlusReadMoreUrl").asText());
        assertEquals("http://RAKvalueMaxReadMoreUrl", result.get("rakValueMaxReadMoreUrl").asText());
        assertEquals("http://RAKvaluePlusIslamicReadMoreUrl", result.get("rakValuePlusIslamicReadMoreUrl").asText());
        assertEquals("http://RAKvalueMaxIslamicReadMoreUrl", result.get("rakValueMaxIslamicReadMoreUrl").asText());
        assertEquals(ConfigFactory.newRecaptchaSMEConfig(), result.get("prospect"));

        Mockito.verify(servletContext).setAttribute("SME_PRODUCT_CUSTOMER_DEVICE", result.toString());

    }

    @Test
    public void getCachedData() {
        HttpHeaders httpHeaders = new HttpHeaders();
        ResponseEntity<JsonNode> cachedData = configService.getCachedData(httpHeaders, "cacheKey", "{\"fieldOne\":\"1\",\"fieldTwo\":\"2\"}");
        assertNotNull(cachedData);
        assertNotNull(cachedData.getHeaders());
        assertEquals(httpHeaders, cachedData.getHeaders());
        JsonNode body = cachedData.getBody();
        assertNotNull(body);
        assertEquals("1", body.get("fieldOne").asText());
        assertEquals("2", body.get("fieldTwo").asText());
    }

    @Test(expected = ApiException.class)
    public void getCachedDataWhenFreeIsNotValid() {
        HttpHeaders httpHeaders = new HttpHeaders();
        configService.getCachedData(httpHeaders, "cacheKey", "{\"fieldOne\":\"1\",\"fieldTwo\":2\"}");
    }

    @Test
    public void getCacheKeyWithoutSuffix() {
        String cacheKey = configService.getCacheKey("segment", "product", "CUSTOMER", "device", null);
        assertNotNull(cacheKey);
        assertEquals("SEGMENT_PRODUCT_CUSTOMER_DEVICE", cacheKey);
    }

    @Test
    public void getCacheKeyWith() {
        String cacheKey = configService.getCacheKey("segment", "product", "CUSTOMER", "device", "suffix");
        assertNotNull(cacheKey);
        assertEquals("SEGMENT_PRODUCT_CUSTOMER_DEVICE_SUFFIX", cacheKey);
    }

    @Test
    public void getCache() {
        configService.getCache("key");
        Mockito.verify(servletContext).getAttribute("key");
    }
}