package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.exception.ApiException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FileValidatorServiceTest {

    @Autowired
    private FileValidatorService fileValidatorService;

    @Test
    public void validate() {
        MockMultipartFile file =
                new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());

        fileValidatorService.validate(file);
    }

    @Test(expected = ApiException.class)
    public void validateUnsupportedType() {
        MockMultipartFile file =
                new MockMultipartFile("file", "filename.exe", "text/plain", "some xml".getBytes());

        fileValidatorService.validate(file);
    }

    @Test(expected = ApiException.class)
    public void validateUnsupportedContent() {
        MockMultipartFile file =
                new MockMultipartFile("file", "filename.png", "image/png", "some plain text".getBytes());

        fileValidatorService.validate(file);
    }
}
