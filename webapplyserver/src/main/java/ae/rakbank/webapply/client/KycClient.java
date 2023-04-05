package ae.rakbank.webapply.client;

import javax.annotation.PostConstruct;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.DehUtil;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class KycClient {

	private final FileUtil fileUtil;
	private final RestTemplate restTemplate;
	private final DehUtil dehUtil;

	private JsonNode kycUri;
	private String kycBaseUrl;
	private JsonNode kycConfigs;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
		kycUri = appConfigJSON.get("KycURIs");
		kycBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("KycBaseUrl").asText();
		kycConfigs = appConfigJSON.get("KycConfigs").get(EnvUtil.getEnv());
	}

	public JsonNode generateAppToken() {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		
		JsonNode node = buildAppTokenRequest();

		HttpEntity<JsonNode> request = new HttpEntity<>(node, headers);
		String appTokenUrl = kycBaseUrl + kycUri.get("generateAppTokenUri").asText();

		ResponseEntity<JsonNode> appTokenResponse = invokeKycEndpoint(request, appTokenUrl);

		return appTokenResponse.getBody();
	}

	public JsonNode initKycTransaction(String kycOauthAccessToken, String prospectId, String product) {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + kycOauthAccessToken);

		// Step 1: Create Transaction
		ResponseEntity<JsonNode> efrTransactionResponse = initEfrTransaction(prospectId, product,
				headers);

		// Step 2: Generate User Token, pass kycTransactionId in userToken request
		ResponseEntity<JsonNode> userTokenResponse = generateUserToken(prospectId,
				efrTransactionResponse.getBody().get("transactionId").asText(), headers);

		// Step 3: Combine both response and send to Client
		JsonNode response = buildTransactionResponse(userTokenResponse.getBody(), efrTransactionResponse.getBody());
		return response;
	}

	private ResponseEntity<JsonNode> initEfrTransaction(String prospectId, String product, HttpHeaders headers) {
		ResponseEntity<JsonNode> efrTransactionResponse = null;
		JsonNode kycTransactionReqNode = buildKycTransactionRequest(prospectId, product);
		HttpEntity<JsonNode> kycTransactionRequest = new HttpEntity<>(kycTransactionReqNode, headers);
		String initKycTransactionUrl = kycBaseUrl + kycUri.get("initKycTransactionUri").asText();

		log.info("Initiating request to create Kyc Transaction for hostReferenceId: {}, hostType: {}", prospectId, product);
		efrTransactionResponse = invokeKycEndpoint(kycTransactionRequest, initKycTransactionUrl);
		log.info("Kyc Transaction created successfully for hostReferenceId: {}, hostType: {}", prospectId, product);
		
		return efrTransactionResponse;
	}

	private ResponseEntity<JsonNode> generateUserToken(String prospectId, String transactionId, HttpHeaders headers) {
		ResponseEntity<JsonNode> userTokenResponse = null;
		JsonNode userTokenReqNode = buildUserTokenRequest(prospectId, transactionId);
		HttpEntity<JsonNode> userTokenRequest = new HttpEntity<>(userTokenReqNode, headers);
		String generateUserTokenUrl = kycBaseUrl + kycUri.get("generateUserTokenUri").asText();
		
		log.info("Initiating request to create Kyc User Token for userId: {}, txnId: {}", prospectId, transactionId);
		userTokenResponse = invokeKycEndpoint(userTokenRequest, generateUserTokenUrl);
		log.info("Kyc User Token generated successfully for userId: {}, txnId: {}", prospectId, transactionId);
		
		return userTokenResponse;
	}
	
	private ResponseEntity<JsonNode> invokeKycEndpoint(HttpEntity<JsonNode> request, String url) {
		ResponseEntity<JsonNode> response = null;
		try {
			response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		} catch (HttpClientErrorException e) {
			log.error(String.format("HttpClientErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
					e.getRawStatusCode(), e.getResponseBodyAsString()), e);
			HttpStatus status = e.getStatusCode();
			ApiError apiError = dehUtil.initApiError(e, status);

			log.error("HttpClientErrorException: Verify Operation ID : Endpoint={}", url);
			throw new ApiException(apiError, new HttpHeaders(), status);
		} catch (HttpServerErrorException e) {
			log.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
					e.getRawStatusCode(), e.getResponseBodyAsString()), e);
			HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
			ApiError apiError = dehUtil.initApiError(e, status);

			throw new ApiException(apiError, new HttpHeaders(), status);
		} catch (Exception e) {
			log.error(String.format("Exception : Endpoint=[%s],  response=%s", url, e.getMessage()));
			HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
			ApiError apiError = new ApiError("Exception : ", e.getMessage());

			throw new ApiException(apiError, new HttpHeaders(), status);
		}
		return response;
	}

	private JsonNode buildAppTokenRequest() {
		ObjectNode node = new ObjectMapper().createObjectNode();
		node.put("clientId", kycConfigs.get("OAuthClientId").asText());
		node.put("clientSecret", kycConfigs.get("OAuthClientSecret").asText());
		return node;
	}

	private JsonNode buildUserTokenRequest(String prospectId, String transactionId) {
		ObjectNode node = new ObjectMapper().createObjectNode();
		node.put("userId", prospectId);
		node.put("transactionId", transactionId);
		return node;
	}

	private JsonNode buildKycTransactionRequest(String prospectId, String product) {
		ObjectNode node = new ObjectMapper().createObjectNode();
		node.put("hostReferenceId", prospectId);
		node.put("hostId", kycConfigs.get("DehHostId").asText());
		node.put("hostType", "BBG_ACCOUNTS");
		return node;
	}

	private JsonNode buildTransactionResponse(JsonNode userTokenResponse, JsonNode efrTransactionResponse) {
		ObjectNode node = new ObjectMapper().createObjectNode();
		node.put("kycUserToken", userTokenResponse.get("accessToken").asText());
		node.put("kycTransactionId", efrTransactionResponse.get("transactionId").asText());
		return node;
	}

}
