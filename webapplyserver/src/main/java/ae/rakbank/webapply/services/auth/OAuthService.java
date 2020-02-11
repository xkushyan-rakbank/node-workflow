package ae.rakbank.webapply.services.auth;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import ae.rakbank.webapply.exception.ApiException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.FileHelper;

@Component
@RequiredArgsConstructor
class OAuthService {
	private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

	private final FileHelper fileHelper;
	private final ServletContext servletContext;

	private JsonNode oAuthUri;
	private String oAuthBaseUrl;
	private JsonNode oAuthConfigs;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
		oAuthUri = appConfigJSON.get("OAuthURIs");
		oAuthBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("OAuthBaseUrl").asText();
		oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
	}

	void validateAccessToken(String accessToken, String refreshToken, Boolean force) {
		if (isContextAccessTokenExpiredOrAbsent()) {
			String errorMessage = "Access token in servlet context expired or absent, "
					+ "Actual time: " + LocalDateTime.now()
					+ ", Token valid till: " + servletContext.getAttribute("OAuthTokenValidUntil");
			logger.error(errorMessage);
			ApiError error = new ApiError(HttpStatus.UNAUTHORIZED, errorMessage, errorMessage);
			throw new ApiException(error, null, HttpStatus.UNAUTHORIZED);
		}
		else {
			ResponseEntity<JsonNode> oauthResponse =
					(ResponseEntity<JsonNode>) servletContext.getAttribute("OAuthTokenResponse");
			if (oauthResponse != null && oauthResponse.getBody().get("access_token").asText().equals(accessToken)) {
				logger.info("Access token is valid");
			}
			else if ((oauthResponse != null && refreshToken != null
					&& oauthResponse.getBody().get("refresh_token").asText().equals(refreshToken)) || force) {
				logger.warn("Access token is invalid, try to get new one with valid refresh token..");

				getOrUpdateOAuthToken();
				logger.info("Access token was updated successfully with refresh token.");
			}
			else {
				logger.error("OauthAccess token and/or refresh token is invalid, " +
						"token in request: " + accessToken
						+ ", actual context token: " + oauthResponse.getBody().get("access_token").asText()
						+ ", refresh token in request: " + refreshToken
						+ ", actual context refresh token: " + oauthResponse.getBody().get("refresh_token").asText());

				String errorMessage = "Access token and/or refresh token is invalid.";
				ApiError error = new ApiError(HttpStatus.UNAUTHORIZED, errorMessage, errorMessage);
				throw new ApiException(error, null, HttpStatus.UNAUTHORIZED);
			}
		}
	}

	ResponseEntity<JsonNode> getOrUpdateOAuthToken() {
		return getOrUpdateOAuthToken(oAuthConfigs.get("OAuthUsername").asText(), oAuthConfigs.get("OAuthPassword").asText());
	}

	ResponseEntity<JsonNode> getOrUpdateOAuthToken(String username, String password) {
		logger.info("Begin getOrUpdateOAuthToken()");
		String methodName = "getOrUpdateOAuthToken()";

		ResponseEntity<JsonNode> response;
		if (isContextAccessTokenExpiredOrAbsent()) {

			int retryCounter = 0;
			while (retryCounter <= 3) {
				retryCounter++;
				logger.info("access token not found or expired. Call /OAuth/token to get new access_token, retry# "
						+ retryCounter);

				ObjectMapper objectMapper = new ObjectMapper();
				MultiValueMap<String, String> requestMap = buildOAuthRequest(objectMapper, username, password);
				HttpHeaders headers = new HttpHeaders();
				headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
				headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
				HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestMap, headers);
				String url = oAuthBaseUrl + oAuthUri.get("generateTokenUri").asText();
				logger.info(String.format("Invoke API from %s method, Endpoint=[%s], retryCount=%s, request=[%s] ",
						methodName, url, retryCounter, request.getBody().toString()));

				RestTemplate restTemplate = new RestTemplate();
				try {

					response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);

				} catch (HttpClientErrorException e) {
					logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
							e.getRawStatusCode(), e.getResponseBodyAsString()), e);
					ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getResponseBodyAsString(),
							e.getResponseBodyAsString(), e);
					return new ResponseEntity<JsonNode>(error.toJsonNode(), null, HttpStatus.BAD_REQUEST);
				} catch (HttpServerErrorException e) {
					logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
							e.getRawStatusCode(), e.getResponseBodyAsString()), e);
					ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
							e.getResponseBodyAsString(), e);
					return new ResponseEntity<JsonNode>(error.toJsonNode(), null, HttpStatus.INTERNAL_SERVER_ERROR);
				}
				logger.info(String.format(
						"API call from %s method, Endpoint=[%s] HttpStatus=[%s], retryCounter=%s",
						methodName, url, response.getStatusCodeValue(), retryCounter));

				if (response.getStatusCode().is2xxSuccessful()) {
					logger.info(String.format(
							"API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s], retryCount=%s",
							methodName, url, response.getStatusCodeValue(), retryCounter));

					updateOauthInContext(response);
					break;
				} else {
					logger.error(String.format(
							"API call from %s method is UNSUCCESSFUL, Endpoint=[%s] HttpStatus=[%s], retryCount=%s",
							methodName, url, response.getStatusCodeValue(), retryCounter));
				}
			} // end while
		}
		ResponseEntity<JsonNode> oauthInContext = (ResponseEntity<JsonNode>) servletContext.getAttribute("OAuthTokenResponse");

		if (oauthInContext == null) {
			throw new ApiException("The response from OAuth service is null");
		} else if (!oauthInContext.getStatusCode().is2xxSuccessful()) {
			String errorMessage = String.format("OAuth Error in login() method , HttpStatus=[%s], message=[%s]",
					oauthInContext.getStatusCodeValue(), oauthInContext.getBody());
			logger.error(errorMessage);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error", errorMessage);
			throw new ApiException(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return oauthInContext;
	}

	private void updateOauthInContext(ResponseEntity<JsonNode> response) {
		// minus 10 seconds to prevent access_token expire error while calling the API
		int seconds = response.getBody().get("expires_in").asInt() - 10;
		LocalDateTime tokenExpiryDateTime = LocalDateTime.now().plusSeconds(seconds);

		servletContext.setAttribute("OAuthTokenValidUntil", tokenExpiryDateTime);
		servletContext.setAttribute("OAuthTokenResponse", response);

		logger.info("New access_token expires on " + tokenExpiryDateTime.toString());
	}

	HttpHeaders getOAuthHeaders(String oauthAccessToken, MediaType mediaType) {
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", oauthAccessToken);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		if (mediaType != null) {
			headers.setContentType(mediaType);
		} else {
			headers.setContentType(MediaType.APPLICATION_JSON);
		}

		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode channelContext = objectMapper.createObjectNode();
		ObjectNode authorizationDetails = objectMapper.createObjectNode();
		authorizationDetails.put("primaryAccessCode", oAuthConfigs.get("OAuthPassword").asText());
		authorizationDetails.put("secondaryAccessCode", "");
		authorizationDetails.put("userId", oAuthConfigs.get("OAuthUsername").asText());

		channelContext.set("authorizationDetails", authorizationDetails);
		headers.set("ChannelContext", channelContext.toString());
		return headers;
	}

	private boolean isContextAccessTokenExpiredOrAbsent() {
		if (servletContext.getAttribute("OAuthTokenValidUntil") != null) {
			LocalDateTime oauthValidDateTime = (LocalDateTime) servletContext.getAttribute("OAuthTokenValidUntil");
			logger.info("OAuthTokenValidUntil attribute value is " + oauthValidDateTime);
			return LocalDateTime.now().isAfter(oauthValidDateTime);
		}
		logger.info("OAuthTokenValidUntil attribute not found in servletContext.");
		return true;
	}

	private MultiValueMap<String, String> buildOAuthRequest(ObjectMapper objectMapper, String username, String password) {
		MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
		map.add("grant_type", oAuthConfigs.get("OAuthGrantType").asText());
		map.add("client_id", oAuthConfigs.get("OAuthClientId").asText());
		map.add("client_secret", oAuthConfigs.get("OAuthClientSecret").asText());
		map.add("bank_id", oAuthConfigs.get("OAuthBankId").asText());
		map.add("channel_id", oAuthConfigs.get("OAuthChannelId").asText());
		map.add("username", username);
		map.add("password", password);
		map.add("language_id", oAuthConfigs.get("OAuthLangId").asText());
		map.add("login_flag", oAuthConfigs.get("OAuthLoginFlag").asText());
		map.add("login_type", oAuthConfigs.get("OAuthLoginType").asText());
		map.add("statemode", oAuthConfigs.get("OAuthStateMode").asText());
		return map;
	}
}
