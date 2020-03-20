package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.ProspectValidatorService;
import ae.rakbank.webapply.services.RecaptchaService;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.stub.RequestFactory;
import ae.rakbank.webapply.stub.ResponseFactory;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.json.JSONArray;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class ProspectControllerTest {

    private ProspectController prospectController;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private DehClient dehClient;

    @Mock
    private RecaptchaService captchaService;

    @Mock
    private WebApplyController applyController;

    @Mock
    private ProspectValidatorService prospectValidatorService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newProspectControllerConfig());

        prospectController = new ProspectController(fileUtil, dehClient, captchaService, applyController, new ProspectValidatorService());
        prospectController.init();
    }

    @Test
    public void createSMEProspect() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        JsonNode createProspectRequest = RequestFactory.newCreateProspectRequest();

        ObjectNode dehResponse = objectMapper.createObjectNode();
        dehResponse.put("prospectId", "123456789");

        ResponseEntity<Object> dehResponseEntity = ResponseEntity.ok(dehResponse);

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null)).thenReturn(dehResponseEntity);

        ObjectNode otpResponse = objectMapper.createObjectNode();
        ResponseEntity<Object> otpResponseEntity = ResponseEntity.ok(otpResponse);

        Mockito.when(applyController.generateVerifyOTP(ArgumentMatchers.any(), ArgumentMatchers.eq(true))).thenReturn(otpResponseEntity);

        ResponseEntity<Object> prospect = prospectController.createSMEProspect(request, createProspectRequest, "sme");

        assertNotNull(prospect);
        assertEquals(HttpStatus.OK, prospect.getStatusCode());
        assertNotNull(prospect.getBody());
        assertEquals("123456789", ((JsonNode)prospect.getBody()).get("prospectId").asText());

        Mockito.verify(applyController).generateVerifyOTP(ArgumentMatchers.any(), ArgumentMatchers.eq(true));
        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null);

    }

    @Test
    public void createSMEProspectIfOtpResponseIsError() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        JsonNode createProspectRequest = RequestFactory.newCreateProspectRequest();

        ObjectNode dehResponse = objectMapper.createObjectNode();
        dehResponse.put("prospectId", "123456789");

        ResponseEntity<Object> dehResponseEntity = ResponseEntity.ok(dehResponse);

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null)).thenReturn(dehResponseEntity);

        ObjectNode otpResponse = objectMapper.createObjectNode();
        ResponseEntity<Object> otpResponseEntity = ResponseEntity.badRequest().build();

        Mockito.when(applyController.generateVerifyOTP(ArgumentMatchers.any(), ArgumentMatchers.eq(true))).thenReturn(otpResponseEntity);

        ResponseEntity<Object> prospect = prospectController.createSMEProspect(request, createProspectRequest, "sme");

        assertNotNull(prospect);
        assertEquals(HttpStatus.BAD_REQUEST, prospect.getStatusCode());

        Mockito.verify(applyController).generateVerifyOTP(ArgumentMatchers.any(), ArgumentMatchers.eq(true));
        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null);

    }

    @Test
    public void createSMEProspectIfDehResponseIsError() {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        JsonNode createProspectRequest = RequestFactory.newCreateProspectRequest();

        ObjectNode dehResponse = objectMapper.createObjectNode();
        dehResponse.put("prospectId", "123456789");

        ResponseEntity<Object> dehResponseEntity = ResponseEntity.badRequest().build();

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null)).thenReturn(dehResponseEntity);

        ResponseEntity<Object> prospect = prospectController.createSMEProspect(request, createProspectRequest, "sme");

        assertNotNull(prospect);
        assertEquals(HttpStatus.BAD_REQUEST, prospect.getStatusCode());

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri",
                HttpMethod.POST, createProspectRequest, "createSMEProspect()", MediaType.APPLICATION_JSON, null);

    }

    @Test
    public void getProspectByIdForAllowedCustomer() throws IllegalAccessException {

        ResponseEntity<Object> prospectByIdResponse = ResponseEntity.ok(ResponseFactory.newProspectByIdResponse());

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464")).thenReturn(prospectByIdResponse);

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .phoneNumber("+37847563456")
                .build();
        ResponseEntity<Object> responseEntity = prospectController.getProspectById(jwt, "sme", "123456789");
        assertNotNull(responseEntity);
        JsonNode body = (JsonNode) responseEntity.getBody();
        assertNotNull(body);
        assertEquals("123456789", body.get("prospectId").asText());

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464");

    }

    @Test(expected = NullPointerException.class)
    public void getProspectByIdWhenRoleIsNotPresent() throws IllegalAccessException {

        ResponseEntity<Object> prospectByIdResponse = ResponseEntity.ok(ResponseFactory.newProspectByIdResponse());

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464")).thenReturn(prospectByIdResponse);

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .phoneNumber("+37847563456")
                .build();
        prospectController.getProspectById(jwt, "sme", "123456789");

    }

    @Test
    public void getProspectByIdForAgent() throws IllegalAccessException {

        ResponseEntity<Object> prospectByIdResponse = ResponseEntity.ok(ResponseFactory.newProspectByIdResponse());

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464")).thenReturn(prospectByIdResponse);

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.AGENT)
                .build();
        ResponseEntity<Object> responseEntity = prospectController.getProspectById(jwt, "sme", "123456789");
        assertNotNull(responseEntity);
        JsonNode body = (JsonNode) responseEntity.getBody();
        assertNotNull(body);
        assertEquals("123456789", body.get("prospectId").asText());

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464");

    }

    @Test(expected = ApiException.class)
    public void getProspectByIdForNotAllowedCustomer() throws IllegalAccessException {

        ResponseEntity<Object> prospectByIdResponse = ResponseEntity.ok(ResponseFactory.newProspectByIdWithWrongPhoneNumberResponse());

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET,
                null, "getProspectById()", MediaType.APPLICATION_JSON, "666473634664563554534737464")).thenReturn(prospectByIdResponse);

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .phoneNumber("+37847563456")
                .build();
        ResponseEntity<Object> responseEntity = prospectController.getProspectById(jwt, "sme", "123456789");

    }

    @Test
    public void updateSMEProspect() {

        ObjectNode jsonNodes = objectMapper.createObjectNode();

        jsonNodes.set("applicantInfo", objectMapper.createObjectNode()
                .put("countryCode", "UAE")
                .put("mobileNo", "+37847563456")
                .put("email", "email@localhost"));

        ObjectNode dehResponse = objectMapper.createObjectNode();

        dehResponse.put("prospectId", "123456789");

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .phoneNumber("+37847563456")
                .prospectId("123456789")
                .build();

        ResponseEntity<Object> responseEntity = ResponseEntity.ok(dehResponse);

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.PUT,
                jsonNodes, "updateSMEProspect()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken())).thenReturn(responseEntity);

        ResponseEntity<Object> updateResponse = prospectController.updateSMEProspect(jwt, jsonNodes, "123456789", "sme");

        assertNotNull(updateResponse);
        JsonNode node = (JsonNode) updateResponse.getBody();
        assertNotNull(node);
        assertEquals(dehResponse, node);

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.PUT,
                jsonNodes, "updateSMEProspect()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken());

    }

    @Test
    public void searchProspect() {

        ObjectNode jsonNodes = objectMapper.createObjectNode();

        jsonNodes.set("applicantInfo", objectMapper.createObjectNode()
                .put("countryCode", "UAE")
                .put("mobileNo", "+37847563456")
                .put("email", "email@localhost"));

        ObjectNode dehResponse = objectMapper.createObjectNode();

        dehResponse.put("prospectId", "123456789");

        JsonNode applicationInfo1 = objectMapper.createObjectNode().put("mobileNo", "+37847563456");
        JsonNode applicationInfo2 = objectMapper.createObjectNode().put("mobileNo", "+37847563456");
        JsonNode applicationInfo3 = objectMapper.createObjectNode().put("mobileNo", "+37847563457");

        dehResponse.set("searchResult", objectMapper.createArrayNode()
                .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo1))
                .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo2))
                .add(objectMapper.createObjectNode().set("applicantInfo", applicationInfo3)));

        JwtPayload jwt = JwtPayload.builder()
                .oauthAccessToken("666473634664563554534737464")
                .role(UserRole.CUSTOMER)
                .phoneNumber("+37847563456")
                .prospectId("123456789")
                .build();

        ResponseEntity<Object> responseEntity = ResponseEntity.ok(dehResponse);

        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.POST,
                jsonNodes, "searchProspect()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken())).thenReturn(responseEntity);

        ResponseEntity<Object> updateResponse = prospectController.searchProspect(jwt, jsonNodes, "mse");

        assertNotNull(updateResponse);
        JsonNode node = (JsonNode) updateResponse.getBody();
        assertNotNull(node);
        assertTrue(node.get("searchResult").isArray());
        assertEquals(2, node.get("searchResult").size());
        assertEquals(dehResponse, node);

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.POST,
                jsonNodes, "searchProspect()", MediaType.APPLICATION_JSON, jwt.getOauthAccessToken());

    }
}