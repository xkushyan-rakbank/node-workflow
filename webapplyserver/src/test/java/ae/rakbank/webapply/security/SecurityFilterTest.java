package ae.rakbank.webapply.security;

import ae.rakbank.webapply.filter.HttpServletRequestWritableWrapper;
import ae.rakbank.webapply.util.SecurityUtil;
import org.apache.logging.log4j.util.Strings;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.nio.charset.StandardCharsets;

public class SecurityFilterTest {

    private final static String SYM_KEY_HEADER_NAME = "x-sym-key";

    private final static String SYM_KEY = "fdsfhfkdjshfkjh32jkhjkh4jk32";

    public static final String ENCRYPTED_PAYLOAD = "encrypted payload";

    @Mock
    private SecurityUtil securityUtil;

    private Filter filter;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        filter = new SecurityFilter(securityUtil);
    }

    @Test
    public void doFilterIfSymKeyNotPresent() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        filter.doFilter(request, response, filterChain);

        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfSymKeyNotPresentAndIsForwardNotEmpty() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        Mockito.when(request.getHeader("isForward")).thenReturn("true");

        filter.doFilter(request, response, filterChain);

        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfSymKeyPresentAndIsForwardNotEmpty() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        Mockito.when(request.getHeader("isForward")).thenReturn("true");
        Mockito.when(request.getHeader(SYM_KEY_HEADER_NAME)).thenReturn(SYM_KEY);

        filter.doFilter(request, response, filterChain);

        Mockito.verify(filterChain).doFilter(request, response);
    }

    @Test
    public void doFilterIfSymKeyPresent() throws IOException, ServletException {

        StringReader reader = new StringReader(ENCRYPTED_PAYLOAD);

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        SecretKeySpec secretKeySpec = Mockito.mock(SecretKeySpec.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);
        byte[] key = "key".getBytes(StandardCharsets.UTF_8);

        Mockito.when(request.getHeader(SYM_KEY_HEADER_NAME)).thenReturn(SYM_KEY);
        Mockito.when(securityUtil.decryptAsymmetric(SYM_KEY)).thenReturn(key);
        Mockito.when(securityUtil.getSecretKeySpec(key)).thenReturn(secretKeySpec);
        Mockito.when(request.getReader()).thenReturn(new BufferedReader(reader));
        Mockito.when(securityUtil.decryptSymmetric(ENCRYPTED_PAYLOAD, secretKeySpec)).thenReturn("decrypted data".getBytes(StandardCharsets.UTF_8));

        filter.doFilter(request, response, filterChain);

        Mockito.verify(filterChain).doFilter(ArgumentMatchers.isA(HttpServletRequestWritableWrapper.class), ArgumentMatchers.eq(response));
    }

    @Test(expected = IllegalStateException.class)
    public void doFilterIfSymKeyPresentAndPayloadNull() throws IOException, ServletException {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        SecretKeySpec secretKeySpec = Mockito.mock(SecretKeySpec.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);
        byte[] key = "key".getBytes(StandardCharsets.UTF_8);

        Mockito.when(request.getHeader(SYM_KEY_HEADER_NAME)).thenReturn(SYM_KEY);
        Mockito.when(securityUtil.decryptAsymmetric(SYM_KEY)).thenReturn(key);
        Mockito.when(securityUtil.getSecretKeySpec(key)).thenReturn(secretKeySpec);
        Mockito.when(request.getReader()).thenReturn(null);
        Mockito.when(securityUtil.decryptSymmetric(ENCRYPTED_PAYLOAD, secretKeySpec)).thenReturn("decrypted data".getBytes(StandardCharsets.UTF_8));

        filter.doFilter(request, response, filterChain);
    }

    @Test(expected = IllegalStateException.class)
    public void doFilterIfSymKeyPresentAndPayloadEmpty() throws IOException, ServletException {

        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        SecretKeySpec secretKeySpec = Mockito.mock(SecretKeySpec.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);
        byte[] key = "key".getBytes(StandardCharsets.UTF_8);

        Mockito.when(request.getHeader(SYM_KEY_HEADER_NAME)).thenReturn(SYM_KEY);
        Mockito.when(securityUtil.decryptAsymmetric(SYM_KEY)).thenReturn(key);
        Mockito.when(securityUtil.getSecretKeySpec(key)).thenReturn(secretKeySpec);
        Mockito.when(request.getReader()).thenReturn(new BufferedReader(new StringReader(Strings.EMPTY)));
        Mockito.when(securityUtil.decryptSymmetric(ENCRYPTED_PAYLOAD, secretKeySpec)).thenReturn("decrypted data".getBytes(StandardCharsets.UTF_8));

        filter.doFilter(request, response, filterChain);
    }

    @Test(expected = IllegalStateException.class)
    public void doFilterIfNotValidSymKeyPresent() throws IOException, ServletException {
        HttpServletRequest request = Mockito.mock(HttpServletRequest.class);
        HttpServletResponse response = Mockito.mock(HttpServletResponse.class);
        FilterChain filterChain = Mockito.mock(FilterChain.class);

        Mockito.when(request.getHeader(SYM_KEY_HEADER_NAME)).thenReturn(SYM_KEY);
        Mockito.when(securityUtil.decryptAsymmetric(SYM_KEY)).thenThrow(new IllegalArgumentException());

        filter.doFilter(request, response, filterChain);
    }

}