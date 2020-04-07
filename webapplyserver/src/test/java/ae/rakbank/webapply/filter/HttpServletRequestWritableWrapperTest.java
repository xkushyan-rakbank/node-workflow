package ae.rakbank.webapply.filter;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

import static org.junit.Assert.*;

public class HttpServletRequestWritableWrapperTest {

    private HttpServletRequestWrapper servletRequestWrapper;

    @Mock
    private HttpServletRequest request;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        servletRequestWrapper = new HttpServletRequestWritableWrapper(request, "decripted-data".getBytes());
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
    public void getContentType() {
    }

    @Test
    public void getReader() {
    }

    @Test
    public void getInputStream() {
    }
}