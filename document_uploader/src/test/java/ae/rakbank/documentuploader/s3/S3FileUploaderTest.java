package ae.rakbank.documentuploader.s3;

import ae.rakbank.documentuploader.util.EnvironmentUtil;
import com.emc.object.s3.S3Client;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.net.URISyntaxException;

import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class S3FileUploaderTest {

    @Mock
    private ECSS3Factory ecsS3Factory;
    @Mock
    private EnvironmentUtil environmentUtil;
    @Mock
    private S3Client s3Client;

    @InjectMocks
    private static S3FileUploader s3FileUploader;

    @Test
    public void uploadFilesToS3Bucket() throws URISyntaxException {

        when(environmentUtil.getScannedDocsDir())
                .thenReturn("./src/test/resources/scanned_docs");
        when(environmentUtil.getS3ObjectsDir())
                .thenReturn("./src/test/resources/scanned_docs");
        when(ecsS3Factory.getS3Client())
                .thenReturn(s3Client);

        s3FileUploader.uploadFilesToS3Bucket();
    }

    @Test
    public void downloadFile() {

        //TODO implement this

    }
}