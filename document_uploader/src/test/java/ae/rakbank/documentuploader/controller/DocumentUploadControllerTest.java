package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.deh.DehClient;
import ae.rakbank.documentuploader.deh.OauthClient;
import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.services.DocumentUploadService;
import ae.rakbank.documentuploader.services.ProspectValidatorService;
import ae.rakbank.documentuploader.services.auth.AuthorizationService;
import ae.rakbank.documentuploader.stub.util.FileUtilStub;
import ae.rakbank.documentuploader.util.DehUtil;
import ae.rakbank.documentuploader.util.FileUtil;
import ae.rakbank.documentuploader.util.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.http.entity.ContentType;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest({DocumentUploadController.class, FileUtil.class})
public class DocumentUploadControllerTest {

    private static final String URI = "/api/v1/banks/RAK/prospects/cosme0001/documents";
    private static final String HEALTH_URI = "/api/v1/health";
    private static final String DOWNLOAD_URI = "/api/v1/banks/RAK/prospects/cosme0001/documents/ABC12345";
    private static final String DOCUMENT_KEY = "documentKey";
    private static final String DOC_FROM_TEST_CASE = "SampleDocFromTestCase";
    private static final String FILE_INFO_KEY = "fileInfo";
    private static final String AUTHORIZATION_KEY = "authorization";
    private static final String MOCK_TOKEN = "mock token";
    private static final String TEST_FILE_CONTENT = "some xml";

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentUploadService docUploadService;
    @MockBean
    private AuthorizationService authorizationService;
    @MockBean
    private ProspectValidatorService prospectValidatorService;
    @MockBean
    private SecurityUtil securityUtil;
    @MockBean
    private DehClient dehClient;
    @MockBean
    private DehUtil dehUtil;
    @MockBean
    private OauthClient oauthClient;
//    @MockBean
//    private FileUtil fileUtil;

//    @Before
//    public void init() {
//        when(fileUtil.getAppConfigJSON()).thenReturn(FileUtilStub.getAppConfigJSON());
//    }

    @Test
    public void health() throws Exception {
        mockMvc.perform(get(HEALTH_URI))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("buildDate")))
                .andExpect(content().string(containsString("project")));
    }

    @Test
    public void handleUploadDocumentError() throws Exception {
        mockMvc.perform(post("/api/v1//banks/RAK/prospects/myProspestId/documents"))
                .andDo(print())
                .andExpect(status().is5xxServerError());
    }

    @Test
    public void handleUploadDocument() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile("file", "filename.txt", ContentType.TEXT_PLAIN.getMimeType(), TEST_FILE_CONTENT.getBytes());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put(DOCUMENT_KEY, DOC_FROM_TEST_CASE);

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(URI)
                .file(file)
                .header(AUTHORIZATION_KEY, MOCK_TOKEN)
                .param(FILE_INFO_KEY, fileInfo.toString()))
                .andExpect(status().is2xxSuccessful());

        then(this.docUploadService)
                .should().processUploadRequest(file, fileInfo.toString(), "cosme0001");
    }

    @Test
    public void handleReUploadDocument() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile("file", "file.txt", ContentType.TEXT_PLAIN.getMimeType(), TEST_FILE_CONTENT.getBytes());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put(DOCUMENT_KEY, DOC_FROM_TEST_CASE);

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(URI)
                .file(file)
                .header(AUTHORIZATION_KEY, MOCK_TOKEN)
                .param(FILE_INFO_KEY, fileInfo.toString())
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                }))
                .andExpect(status().is(200));


        then(this.docUploadService)
                .should().processUploadRequest(file, fileInfo.toString(), "cosme0001");
    }

    @Test
    public void handleReUploadDocumentWithEmptyFileInfo() throws Exception {
        MockMultipartFile file =
                new MockMultipartFile("file", "file.txt", ContentType.TEXT_PLAIN.getMimeType(), TEST_FILE_CONTENT.getBytes());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put(DOCUMENT_KEY, DOC_FROM_TEST_CASE);

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(URI)
                .file(file)
                .header(AUTHORIZATION_KEY, MOCK_TOKEN)
                .param(FILE_INFO_KEY, "")
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                }))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void downloadFile() throws Exception {

        when(docUploadService.findOneByDocumentKey(anyString()))
                .thenReturn(new FileDto(ContentType.APPLICATION_OCTET_STREAM.getMimeType(), "file.txt", "content".getBytes()));

        mockMvc.perform(get(DOWNLOAD_URI).header(AUTHORIZATION_KEY, MOCK_TOKEN))
                .andDo(print())
                .andExpect(status().isOk());
    }
}
