package ae.rakbank.webapply.security;

import ae.rakbank.webapply.constants.AuthConstants;
import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static ae.rakbank.webapply.constants.AuthConstants.BEARER_TOKEN_PREFIX;
import static ae.rakbank.webapply.constants.AuthConstants.JWT_EXPIRED;

@Slf4j
@Component
class AuthorizationFilter extends GenericFilterBean {

    private final AuthorizationService authorizationService;
    private final List<String> authorizationExcludedUrls;

    public AuthorizationFilter(AuthorizationService authorizationService, @Value("${excluded_authorization_url}") List<String> authorizationExcludedUrls) {
        this.authorizationService = authorizationService;
        this.authorizationExcludedUrls = authorizationExcludedUrls;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        final HttpServletRequest httpRequest = (HttpServletRequest) request;

        if (!checkForExcludeUrl(httpRequest.getServletPath())) {
            final String authorizationHeader = httpRequest.getHeader(HttpHeaders.AUTHORIZATION);
            log.info("[getExpireTime] >> Start with auth header: {}", authorizationHeader);
            final Optional<String> bearerToken = getBearerToken(authorizationHeader);
            try {
            	bearerToken
            	        .map(authorizationService::validateAndUpdateJwtToken)
                        .map(authorizationService::getPrincipal)
                        .ifPresent(principal -> {
                            if (HttpMethod.GET.name().equals(httpRequest.getMethod())
                                    && httpRequest.getServletPath().matches("/api/v1/usertypes/sme/prospects/.+")) {
                                Pattern pattern = Pattern.compile("/api/v1/usertypes/sme/prospects/(.+)");
                                Matcher matcher = pattern.matcher(httpRequest.getServletPath());
                                matcher.find();
                                principal.setProspectId(matcher.group(1).replace("/", ""));
                            }
                            this.createSecurityContext(principal);
                            ((HttpServletResponse) response)
                                    .setHeader(AuthConstants.JWT_TOKEN_KEY, authorizationService.getTokenFromPrincipal(principal));
                        });
            } catch (Exception e) {
                log.info("Unauthorized exception: ", e);
                log.info("API exception to check::", e.getMessage());
                sendUnauthorizedErrorToClient((HttpServletResponse) response,e.getMessage());
            	throw new UnauthorizedException(e);
            }
        }
        chain.doFilter(request, response);
    }

    private void sendUnauthorizedErrorToClient(HttpServletResponse response, String msg) throws IOException {
    	if(JWT_EXPIRED.equalsIgnoreCase(msg)){
    		response.setStatus(HttpStatus.UNAUTHORIZED.value());
    		log.info("Inside jwtexpired");
    		/*  ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, JWT_EXPIRED, "JWT token is expired");
    		 ObjectMapper mapper =new ObjectMapper();
    		 response.getWriter().write(mapper.writeValueAsString(mapper));
    		 log.info("after response writer");*/
        }else{
        	response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    	response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.flushBuffer();
    }

    private Optional<String> getBearerToken(String authorizationHeader) {
        return StringUtils.isNotBlank(authorizationHeader) && authorizationHeader.startsWith(BEARER_TOKEN_PREFIX)
                ? Optional.of(authorizationHeader.split(BEARER_TOKEN_PREFIX)[1])
                : Optional.empty();
    }
    
    private boolean checkForExcludeUrl(String path) {
        return authorizationExcludedUrls.contains(path);
    }

    private void createSecurityContext(JwtPayload principal) {
        final UsernamePasswordAuthenticationToken authenticate = new UsernamePasswordAuthenticationToken(principal, StringUtils.EMPTY,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_".concat(principal.getRole().name()))));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
    }
    
}
