package ae.rakbank.documentuploader.s3;

import ae.rakbank.documentuploader.util.FileUtil;
import com.emc.object.s3.S3Client;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.net.URISyntaxException;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@ContextConfiguration(classes={ECSS3Factory.class, FileUtil.class})
public class ECSS3FactoryTest {

    @Autowired
    private ECSS3Factory ecss3Factory;

    @Test
    public void getS3Client() throws URISyntaxException {
        S3Client s3Client = ecss3Factory.getS3Client();
        assertNotNull(s3Client);
    }

    @Test
    public void getS3Bucket() {
        String s3Bucket = ecss3Factory.getS3Bucket();
        assertNotNull(s3Bucket);
    }
}