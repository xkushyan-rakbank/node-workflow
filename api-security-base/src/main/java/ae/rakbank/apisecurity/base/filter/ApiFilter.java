///**
// * 
// */
//package ae.rakbank.apisecurity.base.filter;
//
//import java.io.IOException;
//
//import javax.servlet.Filter;
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.ServletRequest;
//import javax.servlet.ServletResponse;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.core.annotation.Order;
//import org.springframework.stereotype.Component;
//
///**
// * @author Shailesh, Wipro Ltd
// *
// */
//@Component
//@Order(1)
//public class ApiFilter implements Filter {
//
//	private static final String UTF_8 = "UTF-8";
//
//	private static final Logger LOG = LoggerFactory.getLogger(ApiFilter.class);
//
//	@Override
//	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//	        throws IOException, ServletException {
//		
//
//		HttpServletRequest httpRequest = (HttpServletRequest) request;
//		HttpServletResponse  myResponse= (HttpServletResponse) response;
//		LOG.debug("Filter: URL" + " called: "+httpRequest.getRequestURL().toString());
//		
//		
//
//		if (httpRequest.getRequestURL().toString().contains("/api/v1/config")){
////			myResponse.setStatus(HttpStatus.CONTINUE.value());
////		    myResponse.getOutputStream().flush();
////		    myResponse.getOutputStream().println("-- Config API request is not filtered --");
//			return;
//		} else {
//			chain.doFilter(request, response);
//		}
//
//	}
//}
