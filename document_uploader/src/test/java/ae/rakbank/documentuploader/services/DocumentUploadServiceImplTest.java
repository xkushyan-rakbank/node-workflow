package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.s3.S3FileUploader;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

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

    @Test(expected = Exception.class)
    public void processUploadNullFile() {
        documentUploadService.processUploadRequest(null, "some file info", "myProspectId");
    }
}
