package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.stub.ConfigFactory;
import ae.rakbank.webapply.util.FileUtil;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;

import java.util.Collections;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class AdviceControllerTest {

    private AdviceController adviceController;

    @Mock
    private FileUtil fileUtil;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        adviceController = new AdviceController(fileUtil);
    }

    private void setStackTraceEnable() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newAdviceControllerConfigWithStackTraceEnabled());
        adviceController.init();
    }

    private void setStackTraceDisable() {
        Mockito.when(fileUtil.getAppConfigJSON()).thenReturn(ConfigFactory.newAdviceControllerConfigWithStackTraceDisabled());
        adviceController.init();
    }

    @Test
    public void handleApiExceptionWithCommonApiException() {

        setStackTraceEnable();

        ApiException apiException = getCommonApiException();

        ResponseEntity<Object> exception = adviceController.handleApiException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("ApiException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    }

    @Test
    public void handleApiExceptionWithCommonApiExceptionAndStackTraceDebug() {

        setStackTraceDisable();

        ApiException apiException = getCommonApiException();

        ResponseEntity<Object> exception = adviceController.handleApiException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("ApiException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    }

    @Test
    public void handleApiExceptionWithCustomStatusAndHeadersApiException() {

        setStackTraceEnable();

        ApiException apiException = getCustomStatusAndHeadersApiException();

        ResponseEntity<Object> exception = adviceController.handleApiException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("ApiException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }

    @Test
    public void handleApiExceptionWithCustomExceptionApiException() {

        setStackTraceEnable();

        ApiException apiException = getMessageAndExceptionApiException();

        ResponseEntity<Object> exception = adviceController.handleApiException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("ApiException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    }

    @Test
    public void handleApiExceptionWithApiErrorCustomExceptionApiException() {

        setStackTraceEnable();

        ApiException apiException = getCustomApiErrorStatusAndHeadersApiException();

        ResponseEntity<Object> exception = adviceController.handleApiException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(3, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertNotNull(exception.getHeaders().get("Custom-error-header"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("ApiException"), exception.getHeaders().get("Exception"));
        assertEquals("value", exception.getHeaders().get("Custom-error-header").get(0));
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatusCode());
    }

    private ApiException getCommonApiException() {
        return new ApiException("Test exception");
    }

    private ApiException getMessageAndExceptionApiException() {
        return new ApiException("Test exception", new IllegalStateException());
    }

    private ApiException getCustomStatusAndHeadersApiException() {
        return new ApiException("Test exception", HttpStatus.BAD_REQUEST);
    }

    private ApiException getCustomApiErrorStatusAndHeadersApiException() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Custom-error-header", "value");
        return new ApiException(ApiError.builder().build(), headers, HttpStatus.BAD_REQUEST);
    }

    @Test(expected = AccessDeniedException.class)
    public void accessDeniedExceptionHandler() {
        adviceController.accessDeniedExceptionHandler(new AccessDeniedException("access denied"));
    }

    @Test
    public void handleExceptionStackTraceEnabled() {
        setStackTraceEnable();

        Exception apiException = new IllegalAccessException();

        ResponseEntity<Object> exception = adviceController.handleException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("IllegalAccessException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    }

    @Test
    public void handleExceptionStackTraceDisabled() {
        setStackTraceDisable();

        Exception apiException = new IllegalAccessException();

        ResponseEntity<Object> exception = adviceController.handleException(apiException);

        assertNotNull(exception);
        assertNotNull(exception.getBody());
        assertNotNull(exception.getHeaders());
        assertEquals(2, exception.getHeaders().size());
        assertNotNull(exception.getHeaders().getContentType());
        assertNotNull(exception.getHeaders().get("Exception"));
        assertEquals(MediaType.APPLICATION_JSON, exception.getHeaders().getContentType());
        assertEquals(Collections.singletonList("IllegalAccessException"), exception.getHeaders().get("Exception"));
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, exception.getStatusCode());
    }

}