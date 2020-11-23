package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.s3.S3FileUploader;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static ae.rakbank.documentuploader.constants.DocumentTypes.ALLOWED_DOCUMENT_TYPES;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DocumentUploadServiceImplTest {

    @Autowired
    DocumentUploadService documentUploadService;

    @MockBean
    private S3FileUploader s3FileUploader;

    @Test(expected = AmazonS3FileNotFoundException.class)
    public void findOneByDocumentKey() {
        documentUploadService.findOneByDocumentKey("someKey");
    }

    @Test(expected = AmazonS3FileNotFoundException.class)
    public void findOneByExistDocumentKey() {
        FileDto fileDto = new FileDto("contentType", "file.txt", "content".getBytes());
        String documentKey = "exist key";
        when(s3FileUploader.downloadFile(documentKey)).thenReturn(Optional.of(fileDto));
        documentUploadService.findOneByDocumentKey("someKey");
    }

    @Test(expected = ApiException.class)
    public void processUploadNullFile(){
        documentUploadService.processUploadRequest(null, "some file info", "myProspectId",null,"0");
    }

    @Test(expected = ApiException.class)
    public void processUploadIncorrectFileInfo(){
        MockMultipartFile multiFile =
                new MockMultipartFile("file", "filename1.txt", "text/plain", "some xml".getBytes());
        documentUploadService.processUploadRequest(multiFile, "not json entry", "myProspectId",null,"0");
    }

    @Test
    public void processUploadFile(){
        MockMultipartFile multiFile =
                new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());
        documentUploadService.processUploadRequest(multiFile, "{\"documentType\":\"" + ALLOWED_DOCUMENT_TYPES.get(0) + "\"}", "myProspectId",null,"0");
    }

    @Test(expected = ApiException.class)
    public void processUploadFileIncorrectProspectId() {
        MockMultipartFile multiFile =
                new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());
        documentUploadService.processUploadRequest(multiFile, "{\"documentType\":\"text/plain\"}", "myProspect..Id",null,"0");
    }

    @Test(expected = ApiException.class)
    public void processUploadNotAllowedProspectId() throws Exception{
        MockMultipartFile multiFile =
                new MockMultipartFile("file", "filename.txt", "text/plain", "g".getBytes());
        documentUploadService.processUploadRequest(multiFile, "{\"documentType\":\"" + ALLOWED_DOCUMENT_TYPES.get(0) + "\"}", "myProspect..Id",null,"0");
    }
}
