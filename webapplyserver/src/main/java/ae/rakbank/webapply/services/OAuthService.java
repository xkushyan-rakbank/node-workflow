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
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

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
		JsonNode appConfigJSON = fileHelper.loadJSONFile("appConfig.json");
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

		ResponseEntity<JsonNode> response = null;
		if (isAccessTokenExpired()) {

			logger.info("access token not found or expired. Call /OAuth/token to get new access_token");

			RestTemplate restTemplate = new RestTemplate();

			ObjectMapper objectMapper = new ObjectMapper();
			ObjectNode requestJSON = buildOAuthRequest(objectMapper);

			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<JsonNode> request = new HttpEntity<>(requestJSON, headers);

			logger.debug("GetOAuthToken API request " + request.toString());

			String url = oAuthBaseUrl + oAuthUri.get("generateTokenUri").asText();

			try {
				response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);

				logger.debug("GetOAuthToken API response " + response.getBody().toString());

				if (response.getStatusCode().is2xxSuccessful()) {
					// minus 10 seconds to prevent access_token expire error while calling the API
					int seconds = response.getBody().get("expires_in").asInt() - 10;
					LocalDateTime tokenExpiryDateTime = LocalDateTime.now().plusSeconds(seconds);
					servletContext.setAttribute("OAuthTokenValidUntil", tokenExpiryDateTime);

					logger.info("New access_token expires on " + tokenExpiryDateTime.toString());
				} else {
					logger.error(String.format("/OAuth/token API response: HttpStatus=[%s], message=[%s]",
							response.getStatusCodeValue(), response.getBody()));
				}

				servletContext.setAttribute("OAuthTokenResponse", response);
			} catch (Exception e) {
				logger.error("error occured while invoking oauth api", e);
			}

		}

		return (ResponseEntity<JsonNode>) servletContext.getAttribute("OAuthTokenResponse");

	}

	private ObjectNode buildOAuthRequest(ObjectMapper objectMapper) {
		ObjectNode requestJSON = objectMapper.createObjectNode();

		requestJSON.set("grant_type", oAuthConfigs.get("OAuthGrantType"));
		requestJSON.set("client_id", oAuthConfigs.get("OAuthClientId"));
		requestJSON.set("client_secret", oAuthConfigs.get("OAuthCleintSecret"));
		requestJSON.set("BANK_ID", oAuthConfigs.get("OAuthBankId"));
		requestJSON.set("CHANNEL_ID", oAuthConfigs.get("OAuthChannelId"));
		requestJSON.set("username", oAuthConfigs.get("OAuthUsername"));
		requestJSON.set("password", oAuthConfigs.get("OAuthPassword"));
		requestJSON.set("LANGUAGE_ID", oAuthConfigs.get("OAuthLangId"));
		requestJSON.set("LOGIN_FLAG", oAuthConfigs.get("OAuthLoginFlag"));
		requestJSON.set("LOGIN_TYPE", oAuthConfigs.get("OAuthLoginType"));
		requestJSON.set("STATEMODE", oAuthConfigs.get("OAuthStateMode"));
		return requestJSON;
	}
}
