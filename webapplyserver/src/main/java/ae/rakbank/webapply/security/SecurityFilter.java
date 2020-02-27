package ae.rakbank.webapply.security;

import ae.rakbank.webapply.filter.HttpServletRequestWritableWrapper;
import ae.rakbank.webapply.filter.ResponseWrapper;
import ae.rakbank.webapply.response.GenericResponse;
import ae.rakbank.webapply.util.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class SecurityFilter implements Filter {

    private final SecurityUtil securityUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("Filter initialized");

        if (skipEncryption((HttpServletRequest) request)) {
            log.info("Encryption skipped");
            chain.doFilter(request, response);
        } else {
            log.info("Encryption enabled");
            ResponseWrapper responseWrapper = new ResponseWrapper((HttpServletResponse) response);
            responseWrapper.setCharacterEncoding("UTF-8");

            byte[] randomKey = getKeyFromRequest((HttpServletRequest) request);
            byte[] decryptedData = null;
            SecretKeySpec spec = null;

            if (randomKey != null && randomKey.length > 0) {
                spec = securityUtil.getSecretKeySpec(randomKey);
                String dataToDecrypt = decrypt(request);
                decryptedData = (securityUtil.decryptSymmetric(dataToDecrypt, spec));
            }

            String result;
            if (decryptedData == null || decryptedData.length == 0) {
                GenericResponse failed = GenericResponse.getFailedResponse(
                        "Error while reading request payload, encrypted payload should be passed", "");
                ObjectMapper mapper = new ObjectMapper();
                result = mapper.writeValueAsString(failed);
                responseWrapper.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            } else {
                HttpServletRequestWritableWrapper requestWrapper = new HttpServletRequestWritableWrapper(request,
                        decryptedData);

                chain.doFilter(requestWrapper, responseWrapper);
                result = encrypt(responseWrapper, spec);
            }

            if (result != null) {
                response.setContentLength(result.length());
                response.getWriter().write(result);
            }
        }
    }

    private String encrypt(ResponseWrapper responseWrapper, SecretKeySpec spec) {
        try {
            return securityUtil.encryptSymmetric(responseWrapper.getCaptureAsString(), spec);
        } catch (Exception e) {
            log.error("error while encryption {}", e.getMessage());
        }
        return null;
    }

    private String decrypt(ServletRequest request) {
        try {
            StringBuilder buffer = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                buffer.append(line);
            }
            return buffer.toString();
        } catch (Exception e) {
            log.error("error while decryption {}", e.getMessage());
        }
        return null;
    }

    private boolean skipEncryption(HttpServletRequest request) {
        return request.getHeader("x-sym-key") == null || request.getHeader("isForward") != null;
    }

    private byte[] getKeyFromRequest(HttpServletRequest request) {
        String key = request.getHeader("x-sym-key");
        try {
            return securityUtil.decryptAsymmetric(key);
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return new byte[0];
    }
}
