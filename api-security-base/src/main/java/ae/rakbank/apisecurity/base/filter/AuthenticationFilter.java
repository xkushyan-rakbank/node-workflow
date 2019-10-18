/**
 * 
 */
package ae.rakbank.apisecurity.base.filter;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.time.Duration;
import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.http.HttpHost;
import org.apache.http.impl.client.CustomHttpClientBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import com.mastercard.api.core.ApiConfig;
import com.mastercard.api.core.security.oauth.OAuthAuthentication;

import ae.rakbank.apisecurity.base.security.JwtTokenProvider;
import ae.rakbank.apisecurity.base.util.SkiplyContext;
import ae.rakbank.apisecurity.base.vault.SecretManager;
import feign.RequestInterceptor;
import feign.RequestTemplate;

/**
 * @author SUMANTH
 *
 */
//@Component
public class AuthenticationFilter implements Filter {

//	@Value("${mastercard.consumer.key}")
	private String consumerKey;

//	@Value("${mastercard.consumer.alias}")
	private String consumerAlias;

//	@Value("${mastercard.consumer.password}")
	private String consumerPassword;

	@Value("${mastercard.consumer.proxy.required:false}")
	private boolean proxyRequired;

	@Value("${mastercard.consumer.proxy.host:#{null}}")
	private String proxyHost;

	@Value("${mastercard.consumer.proxy.port:0}")
	private int proxyPort;

	@Value("${mastercard.consumer.keystore.file:'/etc/p12-volume/QKRROCK-sandbox.p12'}")
	private String keystoreFile;

	@Value("${mastercard.consumer.debug.enabled:false}")
	private boolean isMCDebug;

	@Value("${mastercard.consumer.sandbox.enabled:false}")
	private boolean isSandbox;

	private static final Logger LOG = LoggerFactory.getLogger(AuthenticationFilter.class);

	private boolean intializeMasterCard;

	@Autowired
	JwtTokenProvider jwtTokenProvider;

	@Autowired
	private SecretManager manager;

	@SuppressWarnings("resource")
	@PostConstruct
	private void init() {
		try {
			InputStream is = null;
			try {
				is = new FileInputStream(keystoreFile);
			} catch (FileNotFoundException ex) {
				LOG.error("init::Keystore file not found at={}", keystoreFile);
				is = getClass().getClassLoader().getResourceAsStream(keystoreFile);
			}

			consumerKey = manager.getSecretValue("mastercard.consumer.key");
			consumerAlias = manager.getSecretValue("mastercard.consumer.alias");
			consumerPassword = manager.getSecretValue("mastercard.consumer.password");

			ApiConfig.setAuthentication(new OAuthAuthentication(consumerKey, is, consumerAlias, consumerPassword));
			ApiConfig.setDebug(isMCDebug);
			ApiConfig.setSandbox(isSandbox);
			if (proxyRequired && proxyHost != null) {
				setProxy();
			}
			intializeMasterCard = true;
		} catch (Exception ex) {
			LOG.error("init::could not initialize master card sdk", ex);
		}
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
	        throws IOException, ServletException {
		String requestUri = ((HttpServletRequest) request).getRequestURI();
		LOG.info("doFilter::Request received from {}", requestUri);
		Instant start = Instant.now();
		try {
			if (!intializeMasterCard) {
				LOG.warn("Authentication Failed, Not a valid request");
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED,
				        "The token is not valid.");
				return;
			}
			if (Objects.isNull(ApiConfig.getAuthentication())) {
				InputStream is = getKeystoreInStream();
				if (Objects.isNull(is)) {
					((HttpServletResponse) response).sendError(HttpServletResponse.SC_UNAUTHORIZED,
					        "Keystore inputstream is not initialized");
					return;
				}
				ApiConfig.setAuthentication(new OAuthAuthentication(consumerKey, is, consumerAlias, consumerPassword));
				ApiConfig.setDebug(true);
				ApiConfig.setSandbox(true);
			}
			String username = ((HttpServletRequest) request).getHeader("subject");
			String uniqueId = ((HttpServletRequest) request).getHeader("uniqueId");
			String authorization = ((HttpServletRequest) request).getHeader("Authorization");
			SkiplyContext.setValue("Authorization", authorization);
			if (StringUtils.isBlank(username) && StringUtils.isNotBlank(authorization)) {
				username = jwtTokenProvider.getUsername(jwtTokenProvider.resolveTokenrequest(authorization));
			}
			SkiplyContext.setValue("USERNAME", username);
			if (StringUtils.isBlank(uniqueId)) {
				uniqueId = UUID.randomUUID().toString();
			}
			SkiplyContext.setValue("UNIQUE_ID", uniqueId);
			start = Instant.now();
			chain.doFilter(request, response);
			LOG.info("end time of request ,total time taken is {}, request id {}, Request URI {}",
			        Duration.between(start, Instant.now()).toMillis(), uniqueId, requestUri);
		} finally {
			SkiplyContext.clear();
		}
	}

	private InputStream getKeystoreInStream() {
		InputStream is = null;
		try {
			is = new FileInputStream(keystoreFile);
		} catch (FileNotFoundException ex) {
			LOG.error("getKeystoreInStream::Keystore file not found..calling getClassLoader().getResourceAsStream()");
			is = getClass().getClassLoader().getResourceAsStream(keystoreFile);
		}
		return is;
	}

	private void setProxy() {
		CustomHttpClientBuilder builder = ApiConfig.getHttpClientBuilder();
		HttpHost proxy = new HttpHost(proxyHost, proxyPort);
		builder.setProxy(proxy);
	}

//	@Bean
	public RequestInterceptor basicAuthRequestInterceptor() {
		return new RequestInterceptor() {
			@Override
			public void apply(RequestTemplate template) {
				template.header("subject", (String) SkiplyContext.getValue("USERNAME"));
				template.header("Authorization", (String) SkiplyContext.getValue("Authorization"));
				template.header("uniqueId", (String) SkiplyContext.getValue("UNIQUE_ID"));
				template.header("isForward", (String) "true");
			}
		};
	}
}
