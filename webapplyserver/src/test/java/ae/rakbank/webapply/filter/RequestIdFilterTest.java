package ae.rakbank.webapply.filter;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;
import org.slf4j.MDC;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

public class RequestIdFilterTest {

    private Filter requestIdFilter;

    @Before
    public void setUp() {
        requestIdFilter = new RequestIdFilter();
    }

    @Test
    public void doFilterIfRequestIdPresent() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        Mockito.when(request.getHeader(RequestIdFilter.REQUEST_ID_HEADER_NAME)).thenReturn("XFHDJSKHFDJKSHFJKSD_646654");

        requestIdFilter.doFilter(request, response, filterChain);
        assertEquals("XFHDJSKHFDJKSHFJKSD_646654", MDC.get(RequestIdFilter.REQUEST_ID_HEADER_NAME));

        Mockito.verify(filterChain).doFilter(request, response);

    }

    @Test
    public void doFilterIfRequestIdNotPresent() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        Mockito.when(request.getHeader(RequestIdFilter.REQUEST_ID_HEADER_NAME)).thenReturn(null);

        requestIdFilter.doFilter(request, response, filterChain);
        assertNull(MDC.get(RequestIdFilter.REQUEST_ID_HEADER_NAME));

        Mockito.verify(filterChain).doFilter(request, response);

    }

}