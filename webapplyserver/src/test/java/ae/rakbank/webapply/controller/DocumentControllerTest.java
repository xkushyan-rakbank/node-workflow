package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.*;

public class DocumentControllerTest {

    private DocumentController documentController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Mock
    private DehClient dehClient;

    @Mock
    private FileUtil fileUtil;

    @Mock
    private AuthorizationService authorizationService;

    @Before
    public void setup() {

        MockitoAnnotations.initMocks(this);

        documentController = new DocumentController(fileUtil, dehClient, authorizationService);

        ObjectNode config = objectMapper.createObjectNode();
        ObjectNode dehURIs = objectMapper.createObjectNode();

        dehURIs.put("getProspectDocumentsUri", "/deh-uri");
        dehURIs.put("getProspectDocumentByIdUri", "/deh-uri-by-id");

        config.set("DehURIs", dehURIs);
        config.set("BaseURLs", objectMapper.createObjectNode().set("local", objectMapper.createObjectNode().put("DehBaseUrl", "http://deh-test-url")));

        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(config);
        documentController.init();
    }

    @Test
    public void getProspectDocuments() {
        JwtPayload jwtPayload = JwtPayload.builder().build();
        String prospectId = "1235";
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("testField", "testValue");

        ResponseEntity<Object> okResponse = ResponseEntity.ok(objectNode);
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET, null,
                "getProspectDocuments()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken())).thenReturn(okResponse);

        ResponseEntity<Object> prospectDocuments = documentController.getProspectDocuments(request, jwtPayload, prospectId);

        assertNotNull(prospectDocuments);
        assertEquals(objectNode, prospectDocuments.getBody());

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri", HttpMethod.GET, null,
                "getProspectDocuments()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());

    }

    @Test
    public void getProspectDocumentById() {
        JwtPayload jwtPayload = JwtPayload.builder().build();
        String prospectId = "1235";
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);

        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("testField", "testValue");

        ResponseEntity<Object> okResponse = ResponseEntity.ok(objectNode);
        Mockito.when(dehClient.invokeApiEndpoint("http://deh-test-url/deh-uri-by-id", HttpMethod.GET, null,
                "getProspectDocumentById()", MediaType.APPLICATION_OCTET_STREAM, jwtPayload.getOauthAccessToken())).thenReturn(okResponse);

        String documentId = "document-id";
        ResponseEntity<Object> prospectDocuments = documentController.getProspectDocumentById(request, jwtPayload, prospectId, documentId);

        assertNotNull(prospectDocuments);
        assertEquals(objectNode, prospectDocuments.getBody());

        Mockito.verify(dehClient).invokeApiEndpoint("http://deh-test-url/deh-uri-by-id", HttpMethod.GET, null,
                "getProspectDocumentById()", MediaType.APPLICATION_OCTET_STREAM, jwtPayload.getOauthAccessToken());
    }
}