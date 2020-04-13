package ae.rakbank.webapply.util;

import ae.rakbank.webapply.dto.ApiError;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

public class DehUtilTest {

    private DehUtil dehUtil;

    @Before
    public void setUp() {
        dehUtil = new DehUtil();
    }

    @Test
    public void initApiError() {
        HttpHeaders httpHeaders = new HttpHeaders();
        final HttpClientErrorException exception = Mockito.mock(HttpClientErrorException.class);
        Mockito.when(exception.getResponseHeaders()).thenReturn(httpHeaders);
        final ApiError error = dehUtil.initApiError(exception, HttpStatus.BAD_REQUEST);
        assertNotNull(error);
        assertEquals(HttpStatus.BAD_REQUEST, error.getStatus());
        assertEquals(HttpStatus.BAD_REQUEST.value(), error.getStatus().value());
        assertEquals("Error response from DEH Server", error.getMessage());
    }
}