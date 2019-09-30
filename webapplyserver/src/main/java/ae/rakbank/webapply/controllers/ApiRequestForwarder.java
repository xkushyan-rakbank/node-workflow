package ae.rakbank.webapply.controllers;

import java.util.Collections;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.commons.FileHelper;
import ae.rakbank.webapply.services.OAuthClient;

@RestController
@RequestMapping("/api/v1")
public class ApiRequestForwarder {

	@Autowired
	FileHelper fileHelper;

	@Autowired
	OAuthClient oauthClient;

	private JsonNode dehURIs = null;

	private String dehBaseUrl = null;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.loadJSONFile("appConfig.json");
		dehURIs = appConfigJSON.get("DehURIs");
		dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();

	}

	@PostMapping(value = "/usertypes/sme/prospects/", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> createSMEProspect(@RequestBody JsonNode jsonNode) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PutMapping(value = "/usertypes/sme/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> updateSMEProspect(@RequestBody JsonNode jsonNode, @PathVariable String prospectId) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/usertypes/{userType}/prospects/search", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> searchProspect(@RequestBody JsonNode jsonNode, @PathVariable String userType) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/usertypes/sme/prospects/{prospectId}", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getProspectById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/prospects/{prospectId}/documents/{documentId}", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getDocumentById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String documentId) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());
			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/prospects/{prospectId}/documents", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getProspectDocuments(@RequestBody JsonNode jsonNode,
			@PathVariable String prospectId) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> login(@RequestBody JsonNode jsonNode) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/otp", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> generateVerifyOTP(@RequestBody JsonNode jsonNode) {
		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		HttpHeaders headers = new HttpHeaders();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			RestTemplate restTemplate = new RestTemplate();
			HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

			String url = dehBaseUrl + dehURIs.get("createProspectPath").asText();
			ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
			return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
		} else {
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
