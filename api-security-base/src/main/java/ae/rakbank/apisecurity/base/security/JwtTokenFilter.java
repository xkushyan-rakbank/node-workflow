package ae.rakbank.apisecurity.base.security;

import com.fasterxml.jackson.databind.ObjectMapper;

import ae.rakbank.apisecurity.base.response.JWTResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;

@Component
public class JwtTokenFilter implements Filter {
	
	private static final Logger LOG = LoggerFactory.getLogger(JwtTokenFilter.class);

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain filterChain)
        throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        try {
            Instant start = Instant.now();
            String token = jwtTokenProvider.resolveToken((HttpServletRequest) req);
            if (token != null && jwtTokenProvider.validateToken(token)) {
				 Authentication auth = jwtTokenProvider.getAuthentication(token);
				 if (auth != null) { 
					 SecurityContextHolder.getContext().setAuthentication(auth); 
				}
            }
            LOG.info("token is validated , time taken is {}", Duration.between(start, Instant.now()).toMillis());
            filterChain.doFilter(req, res);
        } catch (Exception e) {
            JWTResponse failed = JWTResponse.getFailedResponse("403","Access Denied", "Forbidden", ((HttpServletRequest) req).getRequestURI());
            ObjectMapper mapper = new ObjectMapper();
            response.setStatus(403);
            String result = mapper.writeValueAsString(failed);
            response.setContentLength(result.length());
            response.setContentType("application/json");
            response.getWriter().write(result);

        }

    }

}
