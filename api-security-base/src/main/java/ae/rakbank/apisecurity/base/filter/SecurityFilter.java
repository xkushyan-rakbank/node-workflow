/**
 * 
 */
package ae.rakbank.apisecurity.base.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.security.PublicKey;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import ae.rakbank.apisecurity.base.response.GenericResponse;
import ae.rakbank.apisecurity.base.util.SecurityUtil;

/**
 * @author Shailesh, Wipro Ltd
 *
 */

@Component
@ConditionalOnExpression("${skiply.data.encryption.enabled:true}")
public class SecurityFilter implements Filter {

	private static final String UTF_8 = "UTF-8";

	@Autowired
	private SecurityUtil securityUtil;

	@Value("${skiply.data.encryption.excludeUrls:#{null}}")
	private String excludeFilters;

	private static final Logger LOG = LoggerFactory.getLogger(SecurityFilter.class);

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	        throws IOException, ServletException {
		String result = null;
		if (skipEncryption((HttpServletRequest) request)) {
			chain.doFilter(request, response);
		} else {
			ResponseWrapper responseWrapper = new ResponseWrapper((HttpServletResponse) response);
			byte[] randomKey = getKeyFromRequest((HttpServletRequest) request);
			SecretKeySpec spec = securityUtil.getSecretKeySpec(randomKey);
			byte[] decryptedData = securityUtil.decryptSymmetric(decrypt((HttpServletRequest) request), spec);
			if (decryptedData == null) {
				GenericResponse failed = GenericResponse.getFailedResponse(
				        "Error while reading request payload, encrypted payload should be passed", "");
				ObjectMapper mapper = new ObjectMapper();
				result = mapper.writeValueAsString(failed);
			} else {
				HttpServletRequestWritableWrapper requestWrapper = new HttpServletRequestWritableWrapper(request,
				        decryptedData);

				chain.doFilter(requestWrapper, responseWrapper);
				LOG.info("Response from SecurityFilter::" + responseWrapper.getOutputStream());
				result = encrypt(responseWrapper, spec); // use same random key iv for encrypting payload
			}
			response.setContentLength(result.length());
			response.getWriter().write(result);
		}
	}

	private String encrypt(ResponseWrapper responseWrapper, SecretKeySpec spec) {
		try {
			return securityUtil.encryptSymmetric(responseWrapper.getCaptureAsString(), spec);
		} catch (Exception e) {
			LOG.error("error while encryption {}", e.getMessage());
		}
		return null;
	}

	private String decrypt(ServletRequest request) {
		try {
			// Read from request
			StringBuilder buffer = new StringBuilder();
			BufferedReader reader = request.getReader();
			String line;
			while ((line = reader.readLine()) != null) {
				buffer.append(line);
			}
			return buffer.toString();
		} catch (Exception e) {
			LOG.error("error while decryption {}", e.getMessage());
		}
		return null;
	}

	private boolean skipEncryption(HttpServletRequest request) {
		return request.getHeader("x-sym-key") == null || request.getHeader("isForward") != null ? true : false;
	}

	private byte[] getKeyFromRequest(HttpServletRequest request) {
		String key = request.getHeader("x-sym-key");
		try {
			return securityUtil.decryptAsymmetric(key);

		} catch (IOException | GeneralSecurityException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String decrypt(String input, PublicKey key) throws IOException, GeneralSecurityException {
		Cipher cipher = Cipher.getInstance("RSA");
		cipher.init(Cipher.DECRYPT_MODE, key);
		return org.apache.commons.codec.binary.Base64.encodeBase64String(cipher.doFinal(input.getBytes(UTF_8)));
	}

}
