package ae.rakbank.webapply.security;

import ae.rakbank.webapply.constants.AuthConstants;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.dto.UserRole;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.stub.JwtPayloadStub;
import org.apache.logging.log4j.util.Strings;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.internal.verification.Times;
import org.springframework.http.HttpHeaders;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static ae.rakbank.webapply.constants.AuthConstants.BEARER_TOKEN_PREFIX;

public class AuthorizationFilterTest {

    public static final String BEARER_INVALID_TOKEN = "invalid_token";

    public static final String BEARER_VALID_TOKEN = "valid_token";

    public static final String JWT_UPDATED_TOKEN = "jwt_updated_token";

    @Mock
    private AuthorizationService authorizationService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    private Filter filter;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        List<String> urls = Arrays.asList("/exclude1", "/exclude2");
        filter = new AuthorizationFilter(authorizationService, urls);
    }

    @Test(expected = UnauthorizedException.class)
    public void doFilterIfTokenNotValidBySignature() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_TOKEN_PREFIX + BEARER_INVALID_TOKEN);
        Mockito.when(authorizationService.validateAndUpdateJwtToken(BEARER_INVALID_TOKEN)).thenThrow(new ApiException("Token is not valid"));

        filter.doFilter(request, response, filterChain);
    }

    @Test
    public void doFilterIfTokenNotValidByStructure() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_INVALID_TOKEN);

        filter.doFilter(request, response, filterChain);

        Mockito.verifyZeroInteractions(authorizationService);
        Mockito.verifyZeroInteractions(response);
        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfTokenBlank() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(Strings.EMPTY);

        filter.doFilter(request, response, filterChain);

        Mockito.verifyZeroInteractions(authorizationService);
        Mockito.verifyZeroInteractions(response);
        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfTokenValid() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_TOKEN_PREFIX + BEARER_VALID_TOKEN);
        Mockito.when(authorizationService.validateAndUpdateJwtToken(BEARER_VALID_TOKEN)).thenReturn(JWT_UPDATED_TOKEN);
        JwtPayload jwtPayload = JwtPayloadStub.getJwtPayload();
        Mockito.when(authorizationService.getPrincipal(JWT_UPDATED_TOKEN)).thenReturn(jwtPayload);
        Mockito.when(authorizationService.getTokenFromPrincipal(jwtPayload)).thenReturn("jwt_response_token");

        filter.doFilter(request, response, filterChain);

        Mockito.verify(authorizationService).validateAndUpdateJwtToken(BEARER_VALID_TOKEN);
        Mockito.verify(authorizationService).getPrincipal(JWT_UPDATED_TOKEN);
        Mockito.verify(response).setHeader(AuthConstants.JWT_TOKEN_KEY, "jwt_response_token");
        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfUrlIsExcluded() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn("Bearer " + BEARER_VALID_TOKEN);
        Mockito.when(request.getServletPath()).thenReturn("/exclude1");

        filter.doFilter(request, response, filterChain);

        Mockito.verifyZeroInteractions(authorizationService);
        Mockito.verifyZeroInteractions(response);
        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterForGetProspectUrlAndGetMethodWhereTokenValid() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_TOKEN_PREFIX + BEARER_VALID_TOKEN);
        Mockito.when(request.getServletPath()).thenReturn("/api/v1/usertypes/sme/prospects/testPropsectId");
        Mockito.when(request.getMethod()).thenReturn("GET");

        Mockito.when(authorizationService.validateAndUpdateJwtToken(BEARER_VALID_TOKEN)).thenReturn(JWT_UPDATED_TOKEN);

        JwtPayload jwtPayload = Mockito.mock(JwtPayload.class);
        Mockito.when(jwtPayload.getRole()).thenReturn(UserRole.CUSTOMER);

        Mockito.when(authorizationService.getPrincipal(JWT_UPDATED_TOKEN)).thenReturn(jwtPayload);
        Mockito.when(authorizationService.getTokenFromPrincipal(jwtPayload)).thenReturn("jwt_response_token");

        filter.doFilter(request, response, filterChain);

        Mockito.verify(authorizationService).validateAndUpdateJwtToken(BEARER_VALID_TOKEN);
        Mockito.verify(authorizationService).getPrincipal(JWT_UPDATED_TOKEN);
        Mockito.verify(response).setHeader(AuthConstants.JWT_TOKEN_KEY, "jwt_response_token");
        Mockito.verify(filterChain).doFilter(request, response);
        Mockito.verify(jwtPayload).setProspectId("testPropsectId");
    }

    //TODO: should be fixed in future, the servlet path must be not affected by set prospect id into jwt payload.
    @Ignore
    @Test
    public void doFilterForGetMethodWhereTokenValid() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_TOKEN_PREFIX + BEARER_VALID_TOKEN);
        Mockito.when(request.getServletPath()).thenReturn("/api/v1/usertypes/sme/prospects/another_url/testPropsectId");
        Mockito.when(request.getMethod()).thenReturn("GET");

        Mockito.when(authorizationService.validateAndUpdateJwtToken(BEARER_VALID_TOKEN)).thenReturn(JWT_UPDATED_TOKEN);

        JwtPayload jwtPayload = Mockito.mock(JwtPayload.class);
        Mockito.when(jwtPayload.getRole()).thenReturn(UserRole.CUSTOMER);

        Mockito.when(authorizationService.getPrincipal(JWT_UPDATED_TOKEN)).thenReturn(jwtPayload);
        Mockito.when(authorizationService.getTokenFromPrincipal(jwtPayload)).thenReturn("jwt_response_token");

        filter.doFilter(request, response, filterChain);

        Mockito.verify(authorizationService).validateAndUpdateJwtToken(BEARER_VALID_TOKEN);
        Mockito.verify(authorizationService).getPrincipal(JWT_UPDATED_TOKEN);
        Mockito.verify(response).setHeader(AuthConstants.JWT_TOKEN_KEY, "jwt_response_token");
        Mockito.verify(filterChain).doFilter(request, response);
        Mockito.verify(jwtPayload, new Times(0)).setProspectId(Matchers.any());
    }

    @Test
    public void doFilterForPostMethodWithGetPropsectByIdWhereTokenValid() throws IOException, ServletException {
        Mockito.when(request.getHeader(HttpHeaders.AUTHORIZATION)).thenReturn(BEARER_TOKEN_PREFIX + BEARER_VALID_TOKEN);
        Mockito.when(request.getServletPath()).thenReturn("/api/v1/usertypes/sme/another_url/testPropsectId");
        Mockito.when(request.getMethod()).thenReturn("POST");

        Mockito.when(authorizationService.validateAndUpdateJwtToken(BEARER_VALID_TOKEN)).thenReturn(JWT_UPDATED_TOKEN);

        JwtPayload jwtPayload = Mockito.mock(JwtPayload.class);
        Mockito.when(jwtPayload.getRole()).thenReturn(UserRole.CUSTOMER);

        Mockito.when(authorizationService.getPrincipal(JWT_UPDATED_TOKEN)).thenReturn(jwtPayload);
        Mockito.when(authorizationService.getTokenFromPrincipal(jwtPayload)).thenReturn("jwt_response_token");

        filter.doFilter(request, response, filterChain);

        Mockito.verify(authorizationService).validateAndUpdateJwtToken(BEARER_VALID_TOKEN);
        Mockito.verify(authorizationService).getPrincipal(JWT_UPDATED_TOKEN);
        Mockito.verify(response).setHeader(AuthConstants.JWT_TOKEN_KEY, "jwt_response_token");
        Mockito.verify(filterChain).doFilter(request, response);
        Mockito.verify(jwtPayload, new Times(0)).setProspectId("testPropsectId");
    }


}