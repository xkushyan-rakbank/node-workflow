package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.dto.ApiErrorInterface;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.stub.util.FileUtilStub;
import ae.rakbank.documentuploader.util.EnvUtil;
import ae.rakbank.documentuploader.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.extern.slf4j.Slf4j;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributesModelMap;

import static org.junit.Assert.*;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@Slf4j
@RunWith(MockitoJUnitRunner.class)
public class AdviceControllerTest {

    @Mock
    private FileUtil fileUtil;

    @InjectMocks
    private AdviceController adviceController;

    @Before
    public void prepare(){
        JsonNode jsonNode = FileUtilStub.getAppConfigJSON();
        when(fileUtil.getAppConfigJSON()).thenReturn(jsonNode);
    }

    @Test
    public void init() {
        adviceController.init();
        verify(fileUtil, times(1)).getAppConfigJSON();
    }

    @Test
    public void handleError2() {
        MaxUploadSizeExceededException exceededException = new MaxUploadSizeExceededException(500L, new Exception());
        String result = adviceController.handleError2(exceededException, new RedirectAttributesModelMap());
        assertNotNull(result);
    }

    @Test
    public void handleAmazonS3ReadFileException() {
        S3ReadFileException s3ReadFileException = new S3ReadFileException("some message", new Exception());

        adviceController.init();
        ApiErrorInterface apiErrorInterface = adviceController.handleAmazonS3ReadFileException(s3ReadFileException);
        assertNotNull(apiErrorInterface);
    }

    @Test
    public void handleAmazonS3FileNotFoundException() {
        AmazonS3FileNotFoundException amazonS3FileNotFoundException =
                new AmazonS3FileNotFoundException("some message about amazonS3FileNotFoundException");

        adviceController.init();
        ApiErrorInterface apiErrorInterface = adviceController.handleAmazonS3FileNotFoundException(amazonS3FileNotFoundException);
        assertNotNull(apiErrorInterface);
    }

    @Test
    public void handleApiException() {
        ApiException apiException =
                new ApiException("some message about amazonS3FileNotFoundException", new Exception());

        adviceController.init();
        ResponseEntity<Object> objectResponseEntity = adviceController.handleApiException(apiException);
        assertNotNull(objectResponseEntity);
        assertNotNull(objectResponseEntity.getBody());
        assertNotNull(objectResponseEntity.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, objectResponseEntity.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, objectResponseEntity.getHeaders().getContentType());
    }

    @Test
    public void handleException() {
        Exception exception = new Exception("unexpected error");

        adviceController.init();
        ResponseEntity<Object> objectResponseEntity = adviceController.handleException(exception);
        assertNotNull(objectResponseEntity);
        assertNotNull(objectResponseEntity.getBody());
        assertNotNull(objectResponseEntity.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, objectResponseEntity.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, objectResponseEntity.getHeaders().getContentType());
    }

    @Test
    public void reducedApiErrorTest(){
        JsonNode jsonNode = FileUtilStub.getAppConfigJSON();
        JsonNode otherConfigs = jsonNode.get("OtherConfigs").get(EnvUtil.getEnv());//.get("ShouldSendErrorDebugDetails")
        ((ObjectNode) otherConfigs).put("ShouldSendErrorDebugDetails", false);
        when(fileUtil.getAppConfigJSON()).thenReturn(jsonNode);

        String errorMessage = "unexpected error";
        Exception exception = new Exception(errorMessage);

        adviceController.init();
        ResponseEntity<Object> objectResponseEntity = adviceController.handleException(exception);
        assertNotNull(objectResponseEntity);
        assertNotNull(objectResponseEntity.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, objectResponseEntity.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, objectResponseEntity.getHeaders().getContentType());

        Object body = objectResponseEntity.getBody();
        ObjectMapper mapper = new ObjectMapper();

        String errorBody = mapper.convertValue(body, String.class);
        assertNotNull(errorBody);

        assertTrue(errorBody.contains("status"));
        assertTrue(errorBody.contains("statusCode"));
        assertTrue(errorBody.contains("timestamp"));
        assertTrue(errorBody.contains("message"));
        assertTrue(errorBody.contains(errorMessage));

        assertFalse(errorBody.contains("debugMessage"));
        assertFalse(errorBody.contains("stackTrace"));
        assertFalse(errorBody.contains("exceptionClassName"));
    }
}
