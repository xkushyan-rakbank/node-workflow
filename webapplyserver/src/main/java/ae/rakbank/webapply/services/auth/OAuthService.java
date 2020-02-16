package ae.rakbank.webapply.services.auth;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import ae.rakbank.webapply.client.OauthClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
import org.springframework.util.StringUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.FileHelper;

import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_ACCESS_TOKEN_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_CONTEXT_OBJECT_KEY;
import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_REFRESH_TOKEN_KEY;

@Slf4j
@Component
@RequiredArgsConstructor
class OAuthService {
//	private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

	private final FileHelper fileHelper;
	private final ServletContext servletContext;
	private final OauthClient oauthClient;

//	private JsonNode oAuthUri;
//	private String oAuthBaseUrl;
	private JsonNode oAuthConfigs;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
//		oAuthUri = appConfigJSON.get("OAuthURIs");
//		oAuthBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("OAuthBaseUrl").asText();
		oAuthConfigs = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv());
	}

	String getAndUpdateContextOauthToken() {
		ResponseEntity<JsonNode> oAuthContextTokenResponse =
				//TODO check this (..)x  operation
				(ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);

		if (oAuthContextTokenResponse == null || !oAuthContextTokenResponse.getStatusCode().is2xxSuccessful()
				|| isContextAccessTokenExpired(oAuthContextTokenResponse)) {
			oAuthContextTokenResponse = getNewVirtualUserOauthObject();
			servletContext.setAttribute(OAUTH_CONTEXT_OBJECT_KEY, oAuthContextTokenResponse);
		}
		return oAuthContextTokenResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText();
	}

	void validateAndUpdateOauthToken(JwtPayload jwtPayload) {
		if (StringUtils.isEmpty(jwtPayload.getOauthAccessToken()) || StringUtils.isEmpty(jwtPayload.getOauthRefreshToken())
				|| StringUtils.isEmpty(jwtPayload.getOauthTokenExpiryTime())) {
			log.error("Jwt token is invalid, not all OAuth details are present");
			throw new ApiException("Jwt token is invalid, not all OAuth details are present", HttpStatus.UNAUTHORIZED);
		}
		if (LocalDateTime.now().isAfter(jwtPayload.getOauthTokenExpiryTime())) {
			log.warn("Access token is invalid, try to get new one with valid refresh token..");
			ResponseEntity<JsonNode> oauthResponse = oauthClient.refreshAccessToken(jwtPayload.getOauthRefreshToken());
			jwtPayload.setOauthAccessToken(oauthResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText());
			jwtPayload.setOauthRefreshToken(oauthResponse.getBody().get(OAUTH_REFRESH_TOKEN_KEY).asText());
			jwtPayload.setOauthTokenExpiryTime(getExpireTime(oauthResponse));
		}
	}

	LocalDateTime getExpireTime(ResponseEntity<JsonNode> oAuthObjectResponse) {
		// minus 10 seconds to prevent access_token expire error while calling the API
		int seconds = oAuthObjectResponse.getBody().get("expires_in").asInt() - 10;
		return LocalDateTime.now().plusSeconds(seconds);
	}

	private ResponseEntity<JsonNode> getNewVirtualUserOauthObject() {
		String virtualUserName = oAuthConfigs.get("OAuthUsername").asText();
		String virtualUserPassword = oAuthConfigs.get("OAuthPassword").asText();

		return oauthClient.authorize(virtualUserName, virtualUserPassword);
	}

	private boolean isContextAccessTokenExpired(ResponseEntity<JsonNode> oAuthContextTokenResponse) {

		// minus 10 seconds to prevent access_token expire error while calling the API
		int seconds = oAuthContextTokenResponse.getBody().get("expires_in").asInt() - 10;
		LocalDateTime tokenExpiryDateTime = LocalDateTime.now().plusSeconds(seconds);
		return LocalDateTime.now().isAfter(tokenExpiryDateTime);
	}

	HttpHeaders getOAuthHeaders(String oauthAccessToken) {

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", oauthAccessToken);
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);

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









	//Old implementation

	/*void validateAccessToken(String accessToken, String refreshToken, Boolean force) {
		if (isContextAccessTokenExpiredOrAbsent()) {
			String errorMessage = "Access token in servlet context expired or absent, "
					+ "Actual time: " + LocalDateTime.now()
					+ ", Token valid till: " + servletContext.getAttribute("OAuthTokenValidUntil");
			logger.error(errorMessage);
			ApiError error = new ApiError(HttpStatus.UNAUTHORIZED, errorMessage, errorMessage);


			//TODO need to update but no throwing Exception !

			throw new ApiException(error, null, HttpStatus.UNAUTHORIZED);
		}

		ResponseEntity<JsonNode> oauthResponse =
				(ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);
		if (oauthResponse != null && oauthResponse.getBody().get("access_token").asText().equals(accessToken)) {
			logger.info("Access token is valid");
		} else if ((oauthResponse != null && refreshToken != null
				&& oauthResponse.getBody().get("refresh_token").asText().equals(refreshToken)) || force) {
			logger.warn("Access token is invalid, try to get new one with valid refresh token..");

			getOrUpdateOAuthToken();
			logger.info("Access token was updated in context successfully with refresh token.");
		} else {
			logger.error("OauthAccess token and/or refresh token is invalid, " +
					"token in request: " + accessToken
					+ ", actual context token: " + oauthResponse.getBody().get("access_token").asText()
					+ ", refresh token in request: " + refreshToken
					+ ", actual context refresh token: " + oauthResponse.getBody().get("refresh_token").asText());

			String errorMessage = "Access token and/or refresh token is invalid.";
			ApiError error = new ApiError(HttpStatus.UNAUTHORIZED, errorMessage, errorMessage);
			throw new ApiException(error, null, HttpStatus.UNAUTHORIZED);
		}
	}*/

	/*ResponseEntity<JsonNode> getOrUpdateOAuthToken() {
		return getOrUpdateOAuthToken(oAuthConfigs.get("OAuthUsername").asText(), oAuthConfigs.get("OAuthPassword").asText());
	}*/

	/*ResponseEntity<JsonNode> getOrUpdateOAuthToken(String username, String password) {
		logger.info("Begin getOrUpdateOAuthToken()");
		String methodName = "getOrUpdateOAuthToken()";

		ResponseEntity<JsonNode> response;
		if (isContextAccessTokenExpiredOrAbsent()) {

			logger.info("access token not found or expired. Call /OAuth/token to get new OAuth Object");

			ObjectMapper objectMapper = new ObjectMapper();
			MultiValueMap<String, String> requestMap = buildOAuthRequest(objectMapper, username, password);
			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
			HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestMap, headers);
			String url = oAuthBaseUrl + oAuthUri.get("generateTokenUri").asText();
			logger.info(String.format("Invoke API from %s method, Endpoint=[%s], request=[%s] ",
					methodName, url, request.getBody().toString()));

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
			logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s]",
					methodName, url, response.getStatusCodeValue()));

			updateOauthInContext(response);
		}

		ResponseEntity<JsonNode> oauthInContext = (ResponseEntity<JsonNode>) servletContext.getAttribute(OAUTH_CONTEXT_OBJECT_KEY);

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
	}*/

	/*private void updateOauthInContext(ResponseEntity<JsonNode> response) {
		// minus 10 seconds to prevent access_token expire error while calling the API
		int seconds = response.getBody().get("expires_in").asInt() - 10;
		LocalDateTime tokenExpiryDateTime = LocalDateTime.now().plusSeconds(seconds);

		servletContext.setAttribute("OAuthTokenValidUntil", tokenExpiryDateTime);
		servletContext.setAttribute(OAUTH_CONTEXT_OBJECT_KEY, response);

		logger.info("New access_token expires on " + tokenExpiryDateTime.toString());
	}*/

	/*private boolean isContextAccessTokenExpiredOrAbsent() {
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
	}*/
}
