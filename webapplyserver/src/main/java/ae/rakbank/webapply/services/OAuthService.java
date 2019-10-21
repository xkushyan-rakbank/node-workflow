package ae.rakbank.webapply.services;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.FileHelper;

@Component
public class OAuthService {

	private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

	@Autowired
	FileHelper fileHelper;

	@Autowired
	ServletContext servletContext;

	private JsonNode oAuthUri = null;

	private String oAuthBaseUrl = null;

	private JsonNode oAuthConfigs = null;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
		oAuthUri = appConfigJSON.get("OAuthURIs");
		oAuthBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("OAuthBaseUrl").asText();

		oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
	}

	private boolean isAccessTokenExpired() {
		if (servletContext.getAttribute("OAuthTokenValidUntil") != null) {
			LocalDateTime oauthValidDateTime = (LocalDateTime) servletContext.getAttribute("OAuthTokenValidUntil");
			logger.info("OAuthTokenValidUntil attribute value is " + oauthValidDateTime);
			return LocalDateTime.now().isAfter(oauthValidDateTime);
		}
		logger.info("OAuthTokenValidUntil attribute not found in servletContext.");
		return true;
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<JsonNode> getOAuthToken() {

		logger.info("Begin getOAuthToken()");

		String methodName = "getOAuthToken()";

		ResponseEntity<JsonNode> response = null;
		if (isAccessTokenExpired()) {

			logger.info("access token not found or expired. Call /OAuth/token to get new access_token");

			RestTemplate restTemplate = new RestTemplate();

			ObjectMapper objectMapper = new ObjectMapper();
			MultiValueMap<String, String> requestMap = buildOAuthRequest(objectMapper);

			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestMap, headers);

			logger.info("GetOAuthToken API request " + request.toString());

			String url = oAuthBaseUrl + oAuthUri.get("generateTokenUri").asText();

			try {

				logger.debug(String.format("Invoke API from %s method, Endpoint=[%s], request=[%s] ", methodName, url,
						request.getBody().toString()));

				try {
					response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
				} catch (Exception e) {
					logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
				}

				logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s], response=[%s]",
						methodName, url, response.getStatusCodeValue(), response.getBody()));

				if (response.getStatusCode().is2xxSuccessful()) {
					logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
							methodName, url, response.getStatusCodeValue()));
					// minus 10 seconds to prevent access_token expire error while calling the API
					int seconds = response.getBody().get("expires_in").asInt() - 10;
					LocalDateTime tokenExpiryDateTime = LocalDateTime.now().plusSeconds(seconds);
					servletContext.setAttribute("OAuthTokenValidUntil", tokenExpiryDateTime);

					logger.info("New access_token expires on " + tokenExpiryDateTime.toString());
				} else {
					logger.error(String.format("API call from %s method is UNSUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
							methodName, url, response.getStatusCodeValue()));

				}

				servletContext.setAttribute("OAuthTokenResponse", response);
			} catch (Exception e) {
				logger.error("error occured while invoking oauth api", e);
			}

		}

		return (ResponseEntity<JsonNode>) servletContext.getAttribute("OAuthTokenResponse");

	}

	private MultiValueMap<String, String> buildOAuthRequest(ObjectMapper objectMapper) {
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();

		map.add("grant_type", oAuthConfigs.get("OAuthGrantType").asText());
		map.add("client_id", oAuthConfigs.get("OAuthClientId").asText());
		map.add("client_secret", oAuthConfigs.get("OAuthCleintSecret").asText());
		map.add("bank_id", oAuthConfigs.get("OAuthBankId").asText());
		map.add("channel_id", oAuthConfigs.get("OAuthChannelId").asText());
		map.add("username", oAuthConfigs.get("OAuthUsername").asText());
		map.add("password", oAuthConfigs.get("OAuthPassword").asText());
		map.add("language_id", oAuthConfigs.get("OAuthLangId").asText());
		map.add("login_flag", oAuthConfigs.get("OAuthLoginFlag").asText());
		map.add("login_type", oAuthConfigs.get("OAuthLoginType").asText());
		map.add("statemode", oAuthConfigs.get("OAuthStateMode").asText());
		return map;
	}
}
