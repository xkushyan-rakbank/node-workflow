package ae.rakbank.webapply.services;

import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static ae.rakbank.webapply.constants.AuthConstants.RECAPTCHA_TOKEN_REQUEST_KEY;

@PrepareForTest(EnvUtil.class)
@RunWith(PowerMockRunner.class)
public class RecaptchaServiceTest {

    public static final String VERIFY_URL = "http://ReCaptchaUrl/siteVerifyUri?secret={secret}&response={response}&remoteip={remoteip}";

    public static final String IP_ADDRESS = "10.10.10.10";

    private RecaptchaService recaptchaService;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private RestTemplateBuilder restTemplateBuilder;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        recaptchaService = new RecaptchaService(fileUtil, restTemplateBuilder);

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newRecaptchaServiceConfig());

        recaptchaService.init();
    }

    @Test
    public void validateReCaptcha() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode()
                .put(RECAPTCHA_TOKEN_REQUEST_KEY, "recaptchaKey");


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(true);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Map<String, Object> verificationResponse = new HashMap<>();
        verificationResponse.put("success", true);

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenReturn(ResponseEntity.ok(verificationResponse));

        recaptchaService.validateReCaptcha(node, servletRequest);

        Mockito.verify(servletRequest).getRemoteAddr();
        Mockito.verify(restTemplate).postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class));

    }

    @Test
    public void validateReCaptchaWhenCaptchaDisabled() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode()
                .put(RECAPTCHA_TOKEN_REQUEST_KEY, "recaptchaKey");


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(false);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Map<String, Object> verificationResponse = new HashMap<>();
        verificationResponse.put("success", true);

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenReturn(ResponseEntity.ok(verificationResponse));

        recaptchaService.validateReCaptcha(node, servletRequest);

        Mockito.verifyNoMoreInteractions(servletRequest);
        Mockito.verifyNoMoreInteractions(restTemplate);

    }

    @Test(expected = ApiException.class)
    public void validateReCaptchaWhenCaptchaEnabledAndCaptchaKeyNotProvided() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode();


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(true);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Map<String, Object> verificationResponse = new HashMap<>();
        verificationResponse.put("success", true);

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenReturn(ResponseEntity.ok(verificationResponse));

        recaptchaService.validateReCaptcha(node, servletRequest);

        Mockito.verifyNoMoreInteractions(servletRequest);
        Mockito.verifyNoMoreInteractions(restTemplate);

    }

    @Test(expected = ApiException.class)
    public void validateReCaptchaWhenCaptchaNotValid() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode()
                .put(RECAPTCHA_TOKEN_REQUEST_KEY, "recaptchaKey");


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(true);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Map<String, Object> verificationResponse = new HashMap<>();
        verificationResponse.put("success", false);
        verificationResponse.put("error-codes", new ArrayList<>());

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenReturn(ResponseEntity.ok(verificationResponse));

        recaptchaService.validateReCaptcha(node, servletRequest);

    }

    @Test(expected = ApiException.class)
    public void validateReCaptchaIfBadRequestError() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode()
                .put(RECAPTCHA_TOKEN_REQUEST_KEY, "recaptchaKey");


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(true);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST));

        recaptchaService.validateReCaptcha(node, servletRequest);

    }

    @Test(expected = ApiException.class)
    public void validateReCaptchaIfConnectionError() {
        HttpServletRequest servletRequest = Mockito.mock(HttpServletRequest.class);
        PowerMockito.mockStatic(EnvUtil.class);
        RestTemplate restTemplate = Mockito.mock(RestTemplate.class);
        JsonNode node = objectMapper.createObjectNode()
                .put(RECAPTCHA_TOKEN_REQUEST_KEY, "recaptchaKey");


        Mockito.when(EnvUtil.isRecaptchaEnable()).thenReturn(true);
        Mockito.when(servletRequest.getRemoteAddr()).thenReturn(IP_ADDRESS);
        Mockito.when(restTemplateBuilder.build()).thenReturn(restTemplate);

        Mockito.when(restTemplate.postForEntity(ArgumentMatchers.eq(VERIFY_URL),
                ArgumentMatchers.any(Map.class),
                ArgumentMatchers.eq(Map.class),
                ArgumentMatchers.any(Map.class))).thenThrow(new HttpServerErrorException(HttpStatus.INTERNAL_SERVER_ERROR));

        recaptchaService.validateReCaptcha(node, servletRequest);

    }

}