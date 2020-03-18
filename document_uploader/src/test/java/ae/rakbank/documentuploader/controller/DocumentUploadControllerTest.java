package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.services.DocumentUploadService;
import ae.rakbank.documentuploader.services.ProspectValidatorService;
import ae.rakbank.documentuploader.services.auth.AuthorizationService;
import ae.rakbank.documentuploader.util.EnvironmentUtil;
import ae.rakbank.documentuploader.util.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
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
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(DocumentUploadController.class)
public class DocumentUploadControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DocumentUploadService docUploadService;
    @MockBean
    private EnvironmentUtil environmentUtil;
    @MockBean
    private AuthorizationService authorizationService;
    @MockBean
    private ProspectValidatorService prospectValidatorService;
    @MockBean
    private SecurityUtil securityUtil;

    @Test
    public void health() throws Exception {
        mockMvc.perform(get("/api/v1/health"))
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
        String uri = "/api/v1/banks/RAK/prospects/cosme0001/documents";
        MockMultipartFile file =
                new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());

        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put("documentKey", "SampleDocFromTestCase");

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(uri)
                .file(file)
                .header("authorization", "mock token")
                .param("fileInfo", fileInfo.toString()))
                .andExpect(status().is2xxSuccessful());

        then(this.docUploadService)
                .should().processUploadRequest(file, fileInfo.toString(), "cosme0001");
    }

    @Test
    public void handleReUploadDocument() throws Exception {
        String uri = "/api/v1/banks/RAK/prospects/cosme0001/documents";
        MockMultipartFile file =
                new MockMultipartFile("file", "file.txt", "text/plain", "some xml".getBytes());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put("documentKey", "SampleDocFromTestCase");

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(uri)
                .file(file)
                .header("authorization", "mock token")
                .param("fileInfo", fileInfo.toString())
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
        String uri = "/api/v1/banks/RAK/prospects/cosme0001/documents";
        MockMultipartFile file =
                new MockMultipartFile("file", "file.txt", "text/plain", "some xml".getBytes());


        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode fileInfo = objectMapper.createObjectNode();
        fileInfo.put("documentKey", "SampleDocFromTestCase");

        mockMvc.perform(MockMvcRequestBuilders
                .multipart(uri)
                .file(file)
                .header("authorization", "mock token")
                .param("fileInfo", "")
                .with(request -> {
                    request.setMethod("PUT");
                    return request;
                }))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void downloadFile() {

        //TODO

    }
}