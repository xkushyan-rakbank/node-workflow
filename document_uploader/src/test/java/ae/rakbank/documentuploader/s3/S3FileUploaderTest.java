package ae.rakbank.documentuploader.s3;

import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.util.EnvironmentUtil;
import com.emc.object.s3.S3Client;
import com.emc.object.s3.bean.GetObjectResult;
import org.apache.commons.io.IOUtils;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@PrepareForTest(IOUtils.class)
@RunWith(PowerMockRunner.class)
public class S3FileUploaderTest {

    @Mock
    private ECSS3Factory ecsS3Factory;
    @Mock
    private EnvironmentUtil environmentUtil;
    @Mock
    private S3Client s3Client;

    @InjectMocks
    private static S3FileUploader s3FileUploader;

    @Before
    public void initBefore() throws URISyntaxException, UnsupportedEncodingException {

        when(environmentUtil.getScannedDocsDir())
                .thenReturn("./src/test/resources/scanned_docs");
        when(environmentUtil.getS3ObjectsDir())
                .thenReturn("./src/test/resources/scanned_docs");

        when(ecsS3Factory.getS3Client())
                .thenReturn(s3Client);
        when(ecsS3Factory.getS3Bucket())
                .thenReturn("s3Bucket");

        GetObjectResult<InputStream> objectGetObjectResult = new GetObjectResult<>();
        HashMap<String, List<String>> headers = new HashMap<>();
        objectGetObjectResult.setHeaders(headers);
        objectGetObjectResult.setObject(new ByteArrayInputStream("some file content".getBytes("UTF-8")));

        when(s3Client.getObject(anyString(), any()))
                .thenReturn(objectGetObjectResult);
    }

    @Test
    public void uploadFilesToS3Bucket() {

        s3FileUploader.uploadFilesToS3Bucket();
    }

    @Test
    public void downloadFile() throws URISyntaxException, UnsupportedEncodingException {

        s3FileUploader.downloadFile("text-file.txt");
    }

    @Test(expected = S3ReadFileException.class)
    public void failedToDownloadFile() throws IOException {

        PowerMockito.mockStatic(IOUtils.class);
        when(IOUtils.toByteArray(any(InputStream.class))).thenThrow(new IOException());

        s3FileUploader.downloadFile("text-file.txt");
    }
}
