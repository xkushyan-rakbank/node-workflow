package ae.rakbank.webapply.security;

import ae.rakbank.webapply.filter.HttpServletRequestWritableWrapper;
import ae.rakbank.webapply.filter.ResponseWrapper;
import ae.rakbank.webapply.response.GenericResponse;
import ae.rakbank.webapply.util.SecurityUtil;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@Component
public class SecurityFilter implements Filter {

    @Autowired
    private SecurityUtil securityUtil;

    private static final Logger logger = LoggerFactory.getLogger(SecurityFilter.class);

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        logger.info("Filter initialized");
        String result = null;
        if (skipEncryption((HttpServletRequest) request)) {
            logger.info("Encryption skipped");
            chain.doFilter(request, response);
        }
        else {
            logger.info("Encryption enabled");
            ResponseWrapper responseWrapper = new ResponseWrapper((HttpServletResponse) response);
            responseWrapper.setCharacterEncoding("UTF-8");

            byte[] randomKey = getKeyFromRequest((HttpServletRequest) request);
            byte[] decryptedData = null;
            SecretKeySpec spec = null;

            if (randomKey != null) {
              spec = securityUtil.getSecretKeySpec(randomKey);
              String dataToDecrypt = decrypt((HttpServletRequest) request);
              decryptedData = (securityUtil.decryptSymmetric(dataToDecrypt, spec));  
            }

            if (decryptedData == null) {
                GenericResponse failed = GenericResponse.getFailedResponse(
                        "Error while reading request payload, encrypted payload should be passed", "");
                ObjectMapper mapper = new ObjectMapper();
                result = mapper.writeValueAsString(failed);
                responseWrapper.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            }
            else {
                HttpServletRequestWritableWrapper requestWrapper = new HttpServletRequestWritableWrapper(request,
                        decryptedData);

                chain.doFilter(requestWrapper, responseWrapper);

                result = encrypt(responseWrapper, spec);
            }

            logger.info("Length 1: {}", response.getHeader("Content-Length"));
            response.setContentLength(result.length());
            logger.info("Length 2: {}", response.getHeader("Content-Length"));
            response.getWriter().write(result);
            logger.info("Length 3: {}", response.getHeader("Content-Length"));
        }
    }

    private String encrypt(ResponseWrapper responseWrapper, SecretKeySpec spec) {
        try {
            return securityUtil.encryptSymmetric(responseWrapper.getCaptureAsString(), spec);
        } catch (Exception e) {
            logger.error("error while encryption {}", e.getMessage());
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
            String data = buffer.toString();
            return data;
        } catch (Exception e) {
            logger.error("error while decryption {}", e.getMessage());
        }
        return null;
    }

    private boolean skipEncryption(HttpServletRequest request) {
        return request.getHeader("x-sym-key") == null || request.getHeader("isForward") != null;
    }

    private byte[] getKeyFromRequest(HttpServletRequest request){
        String key = request.getHeader("x-sym-key");
        try {
            return securityUtil.decryptAsymmetric(key);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
