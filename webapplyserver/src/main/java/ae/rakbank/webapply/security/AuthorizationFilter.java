package ae.rakbank.webapply.security;

import ae.rakbank.webapply.constants.AuthConstants;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import static ae.rakbank.webapply.constants.AuthConstants.BEARER_TOKEN_PREFIX;

@RequiredArgsConstructor
@Component
class AuthorizationFilter extends GenericFilterBean {

    private final AuthorizationService authorizationService;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        final String authorizationHeader = ((HttpServletRequest) request).getHeader(HttpHeaders.AUTHORIZATION);
        final Optional<String> bearerToken = getBearerToken(authorizationHeader);
        bearerToken
                .map(authorizationService::validateAndUpdateJwtToken)
                .map(authorizationService::getPrincipal)
                .ifPresent(principal -> {
                    this.createSecurityContext(principal);
                    ((HttpServletResponse) response).setHeader(AuthConstants.JWT_TOKEN_KEY, bearerToken.get());
                });
        chain.doFilter(request, response);
    }

    private Optional<String> getBearerToken(String authorizationHeader) {
        return StringUtils.isNotBlank(authorizationHeader) && authorizationHeader.startsWith(BEARER_TOKEN_PREFIX)
                ? Optional.of(authorizationHeader.split(BEARER_TOKEN_PREFIX)[1])
                : Optional.empty();
    }

    private void createSecurityContext(JwtPayload principal) {
        final UsernamePasswordAuthenticationToken authenticate = new UsernamePasswordAuthenticationToken(principal, StringUtils.EMPTY,
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_".concat(principal.getRole().name()))));
        SecurityContextHolder.getContext().setAuthentication(authenticate);
    }

}
