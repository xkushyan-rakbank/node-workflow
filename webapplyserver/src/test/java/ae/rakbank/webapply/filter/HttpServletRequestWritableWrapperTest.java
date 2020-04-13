package ae.rakbank.webapply.filter;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;

public class HttpServletRequestWritableWrapperTest {

    private HttpServletRequestWrapper servletRequestWrapper;

    private final static String DATA = "decrypted-data";

    @Mock
    private HttpServletRequest request;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        servletRequestWrapper = new HttpServletRequestWritableWrapper(request, DATA.getBytes());
    }

    @Test
    public void getHeader() {
        Mockito.when(request.getHeader("HeaderName")).thenReturn("header-value");
        final String header = servletRequestWrapper.getHeader("HeaderName");
        assertEquals("header-value", header);
    }

    @Test
    public void getHeaderAccept() {
        Mockito.when(request.getHeader("Accept")).thenReturn("text/plain");
        final String header = servletRequestWrapper.getHeader("Accept");
        assertEquals("application/json", header);
    }

    @Test
    public void getHeaderContentType() {
        Mockito.when(request.getHeader("Content-type")).thenReturn("text/plain");
        final String header = servletRequestWrapper.getHeader("Content-type");
        assertEquals("application/json", header);
    }

    @Test
    public void getContentTypeJson() {
        Mockito.when(request.getContentType()).thenReturn("application/json");
        final String contentType = servletRequestWrapper.getContentType();
        assertEquals("application/json", contentType);
    }

    @Test
    public void getContentTypePlainText() {
        Mockito.when(request.getContentType()).thenReturn("text/plain");
        final String contentType = servletRequestWrapper.getContentType();
        assertEquals("application/json", contentType);
    }

    @Test
    public void getReader() throws IOException {
        final BufferedReader reader = servletRequestWrapper.getReader();
        assertNotNull(reader);
        assertEquals(DATA, reader.lines().collect(Collectors.joining()));
    }

    @Test
    public void getInputStream() throws IOException {
        final ServletInputStream inputStream = servletRequestWrapper.getInputStream();
        assertNotNull(inputStream);
        assertFalse(inputStream.isFinished());
        assertFalse(inputStream.isReady());
        byte[] data = new byte[DATA.length()];
        inputStream.readLine(data, 0, DATA.length());
        assertEquals(DATA, new String(data));
    }
}