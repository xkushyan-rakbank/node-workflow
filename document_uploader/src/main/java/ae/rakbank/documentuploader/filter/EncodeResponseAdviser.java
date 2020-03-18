package ae.rakbank.documentuploader.filter;

import ae.rakbank.documentuploader.util.SecurityUtil;
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
    public Object beforeBodyWrite(Object jsonObject, MethodParameter methodParameter, MediaType mediaType, Class<?
            extends HttpMessageConverter<?>> aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        if (!isJsonContentType(serverHttpResponse)) return jsonObject;
        return getKeyFromRequest(serverHttpRequest.getHeaders())
                .map(securityUtil::getSecretKeySpec)
                .map(secretKeySpec -> encrypt(jsonObject.toString(), secretKeySpec))
                .orElse(jsonObject.toString());
    }

    private boolean isJsonContentType(ServerHttpResponse response) {
        return MediaType.APPLICATION_JSON.equals(response.getHeaders().getContentType());
    }

    private String encrypt(String body, SecretKeySpec spec) {
        try {
            return securityUtil.encryptSymmetric(body, spec);
        } catch (Exception e) {
            log.error("error while encryption {}", e.getMessage());
        }
        return null;
    }

    private Optional<byte[]> getKeyFromRequest(HttpHeaders headers) {
        return Optional.ofNullable(headers.get("x-sym-key"))
                .map(strings -> strings.get(0))
                .map(securityUtil::decryptAsymmetric);
    }

}
