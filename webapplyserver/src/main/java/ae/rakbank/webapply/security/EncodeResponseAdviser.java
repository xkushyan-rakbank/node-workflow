package ae.rakbank.webapply.security;

import ae.rakbank.webapply.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.crypto.spec.SecretKeySpec;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@ControllerAdvice
public class EncodeResponseAdviser implements ResponseBodyAdvice<Object> {

    private final SecurityUtil securityUtil;

    @Override
    public boolean supports(MethodParameter methodParameter, Class<? extends HttpMessageConverter<?>> aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object jsonObject, MethodParameter methodParameter, MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        byte[] randomKey = getKeyFromRequest(serverHttpRequest.getHeaders());
        if (randomKey != null && randomKey.length > 0) {
            SecretKeySpec spec = securityUtil.getSecretKeySpec(randomKey);
            return encrypt(jsonObject.toString(), spec);
        }
        return jsonObject;
    }

    private String encrypt(String body, SecretKeySpec spec) {
        try {
            return securityUtil.encryptSymmetric(body, spec);
        } catch (Exception e) {
            log.error("error while encryption {}", e.getMessage());
        }
        return null;
    }

    private byte[] getKeyFromRequest(HttpHeaders headers) {
        String key = Optional.ofNullable(headers.get("x-sym-key"))
                .map(strings -> strings.get(0))
                .orElse(null);
        if (key == null) return new byte[0];
        try {
            return securityUtil.decryptAsymmetric(key);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return new byte[0];
    }

}
