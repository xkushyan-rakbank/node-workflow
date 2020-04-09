package ae.rakbank.webapply.security;

import ae.rakbank.webapply.stub.HeadersFactory;
import ae.rakbank.webapply.util.SecurityUtil;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpHeaders;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

public class EncodeResponseAdviserTest {

    @Mock
    private SecurityUtil securityUtil;

    private ResponseBodyAdvice<Object> bodyAdvice;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        bodyAdvice = new EncodeResponseAdviser(securityUtil);
    }

    @Test
    public void beforeBodyWriteIfSymKeyPresent() {
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        SecretKeySpec secretKeySpec = Mockito.mock(SecretKeySpec.class);
        String bodyToEncrypt = "body to encrypt by sym key";
        String encryptedPayload = "encrypted payload";

        HttpHeaders headers = HeadersFactory.newHttpHeadersForSymKeyEncoding();
        byte[] key = "key".getBytes(StandardCharsets.UTF_8);

        Mockito.when(request.getHeaders()).thenReturn(headers);
        Mockito.when(securityUtil.decryptAsymmetric(Objects.requireNonNull(headers.get("x-sym-key")).get(0))).thenReturn(key);
        Mockito.when(securityUtil.encryptSymmetric(bodyToEncrypt, secretKeySpec)).thenReturn(encryptedPayload);
        Mockito.when(securityUtil.getSecretKeySpec(key)).thenReturn(secretKeySpec);

        Object body = bodyAdvice.beforeBodyWrite(bodyToEncrypt, null, null, null, request, null);

        Assert.assertNotNull(body);
        Assert.assertEquals(encryptedPayload, body);
    }

    @Test
    public void beforeBodyWriteIfSymKeyNotPresent() {
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        String bodyToEncrypt = "body to encrypt by sym key";
        HttpHeaders headers = new HttpHeaders();

        Mockito.when(request.getHeaders()).thenReturn(headers);

        Object body = bodyAdvice.beforeBodyWrite(bodyToEncrypt, null, null, null, request, null);

        Assert.assertNotNull(body);
        Assert.assertEquals(bodyToEncrypt, body);
    }

    @Test
    public void beforeBodyWriteIfNotValidSymKeyPresent() {
        ServerHttpRequest request = Mockito.mock(ServerHttpRequest.class);
        SecretKeySpec secretKeySpec = Mockito.mock(SecretKeySpec.class);
        String bodyToEncrypt = "body to encrypt by sym key";

        HttpHeaders headers = HeadersFactory.newHttpHeadersForSymKeyEncoding();
        byte[] key = "key".getBytes(StandardCharsets.UTF_8);

        Mockito.when(request.getHeaders()).thenReturn(headers);
        Mockito.when(securityUtil.decryptAsymmetric(Objects.requireNonNull(headers.get("x-sym-key")).get(0))).thenReturn(key);
        Mockito.when(securityUtil.encryptSymmetric(bodyToEncrypt, secretKeySpec)).thenThrow(new IllegalArgumentException());
        Mockito.when(securityUtil.getSecretKeySpec(key)).thenReturn(secretKeySpec);

        Object body = bodyAdvice.beforeBodyWrite(bodyToEncrypt, null, null, null, request, null);

        Assert.assertNull(body);
    }

}