package ae.rakbank.webapply.filter;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class RequestIdFilter extends GenericFilterBean {

    public static final String REQUEST_ID_HEADER_NAME = "x-request-id";

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        final String requestId = request.getHeader(REQUEST_ID_HEADER_NAME);
        if (StringUtils.isNotBlank(requestId)) {
            MDC.put(REQUEST_ID_HEADER_NAME, String.format("%S", requestId));
        } else {
            MDC.remove(REQUEST_ID_HEADER_NAME);
        }
        filterChain.doFilter(servletRequest, servletResponse);
    }
}
