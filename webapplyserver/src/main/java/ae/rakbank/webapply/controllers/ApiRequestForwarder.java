package ae.rakbank.webapply.controllers;

import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.commons.FileHelper;
import ae.rakbank.webapply.services.OAuthService;
import ae.rakbank.webapply.services.RecaptchaService;

@RestController
@RequestMapping("/api/v1")
public class ApiRequestForwarder {

	private static final Logger logger = LoggerFactory.getLogger(ApiRequestForwarder.class);

	@Autowired
	FileHelper fileHelper;

	@Autowired
	OAuthService oauthClient;

	@Autowired
	RecaptchaService captchaService;

	private JsonNode dehURIs = null;

	private String dehBaseUrl = null;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
		dehURIs = appConfigJSON.get("DehURIs");
		dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
	}

	@PostMapping(value = "/usertypes/{segment}/prospects/", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> createSMEProspect(@RequestBody JsonNode requestBodyJSON, @PathVariable String segment,
			HttpServletRequest servletRequest) {

		logger.info("Begin createSMEProspect() method");

		logger.debug(String.format("createSMEProspect() method args, RequestBody=[%s], segment=[%s]",
				requestBodyJSON.toString(), segment));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			if (requestBodyJSON.has("recaptchaToken")) {
				logger.info("Validate reCAPTCHA before saving applicant info.");
				String recaptchaResponse = requestBodyJSON.get("recaptchaToken").asText();
				String ip = servletRequest.getRemoteAddr();
				ResponseEntity<?> captchaResponse = captchaService.verifyRecaptcha(ip, recaptchaResponse);

				if (captchaResponse.getStatusCode().is2xxSuccessful()) {
					logger.debug("reCAPTCHA verify API response: " + captchaResponse.getBody());
				} else {
					logger.error(String.format("reCAPTCHA verify API response: HttpStatus=[%s], message=[%s]",
							captchaResponse.getStatusCodeValue(), captchaResponse.getBody()));
				}

				if (!captchaResponse.getStatusCode().is2xxSuccessful()) {
					return captchaResponse;
				}
			}

			HttpEntity<JsonNode> request = getHttpEntityRequest(requestBodyJSON, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();

			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			logger.info("Call createProspect endpoint: " + uriComponents.toString());

			try {
				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.POST, request, "createSMEProspect()",
						"createProspectUri");
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {

			logger.error(String.format("OAuth Error in createSMEProspect() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	private HttpEntity<JsonNode> getHttpEntityRequest(JsonNode requestBodyJSON,
			ResponseEntity<JsonNode> oauthResponse) {
		HttpHeaders headers = new HttpHeaders();
		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

		return new HttpEntity<>(requestBodyJSON, headers);
	}

	@PutMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> updateSMEProspect(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String segment) {
		logger.info("Begin updateSMEProspect() method");

		logger.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
				jsonNode.toString(), segment, prospectId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

			try {

				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.PUT, request, "updateSMEProspect()",
						"updateProspectUri");

			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in updateSMEProspect() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/usertypes/{userType}/prospects/search", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> searchProspect(@RequestBody JsonNode jsonNode, @PathVariable String segment) {
		logger.info("Begin searchProspect() method");

		logger.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
				segment));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			try {

				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.POST, request, "searchProspect()",
						"searchProspectUri");

			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in searchProspect() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> getProspectById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String segment) {
		logger.info("Begin getProspectById() method");

		logger.debug(String.format("getProspectById() method args, RequestBody=[%s], prospectId=[%s], segment=[%s]",
				jsonNode.toString(), prospectId, segment));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			try {
				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, request, "getProspectById()",
						"getProspectUri");

			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in getProspectById() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/prospects/{prospectId}/documents/{documentId}", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> getProspectDocumentById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String documentId) {

		logger.info("Begin getDocumentById() method");

		logger.debug(String.format("getDocumentById() method args, RequestBody=[%s], prospectId=[%s], documentId=[%s]",
				jsonNode.toString(), prospectId, documentId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("getProspectDocumentByIdUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId, documentId);

			try {
				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, request, "getProspectDocumentById()",
						"getProspectDocumentByIdUri");

			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in getDocumentById() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/prospects/{prospectId}/documents", produces = "application/json")
	@ResponseBody
	public ResponseEntity<?> getProspectDocuments(@RequestBody JsonNode jsonNode, @PathVariable String prospectId) {

		logger.info("Begin getProspectDocuments() method");

		logger.debug(String.format("getProspectDocuments() method args, RequestBody=[%s], prospectId=[%s]",
				jsonNode.toString(), prospectId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

			try {
				return invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, request, "getProspectDocuments()",
						"getProspectDocumentsUri");
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", uriComponents.toString(), e.getMessage()),
						e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + uriComponents.toString(), e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {

			logger.error(String.format("OAuth Error in getProspectDocuments() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/users/authenticate", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> login(@RequestBody JsonNode jsonNode) {

		logger.info("Begin login() method");

		logger.debug(String.format("login() method args, RequestBody=[%s]", jsonNode.toString()));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(jsonNode, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();

			try {
				return invokeApiEndpoint(url, HttpMethod.POST, request, "login()", "authenticateUserUri");
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + url, e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in login() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/otp", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> generateVerifyOTP(@RequestBody JsonNode requestJSON, HttpServletRequest servletRequest) {

		logger.info("Begin generateVerifyOTP() method");

		logger.debug(String.format("generateVerifyOTP() method args, RequestBody=[%s]", requestJSON.toString()));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			if (requestJSON.has("recaptchaToken")) {
				logger.info("begin verify recaptcha method");
				String recaptchaResponse = requestJSON.get("recaptchaToken").asText();
				String ip = servletRequest.getRemoteAddr();
				ResponseEntity<?> captchaResponse = captchaService.verifyRecaptcha(ip, recaptchaResponse);

				if (captchaResponse.getStatusCode().is2xxSuccessful()) {
					logger.debug("reCAPTCHA verify API response: " + captchaResponse.getBody());
				} else {
					logger.error(String.format("reCAPTCHA verify API response: HttpStatus=[%s], message=[%s]",
							captchaResponse.getStatusCodeValue(), captchaResponse.getBody()));
				}

				if (!captchaResponse.getStatusCode().is2xxSuccessful()) {
					return captchaResponse;
				}
			}

			HttpEntity<JsonNode> request = getHttpEntityRequest(requestJSON, oauthResponse);

			String url = dehBaseUrl + dehURIs.get("otpUri").asText();

			try {
				return invokeApiEndpoint(url, HttpMethod.POST, request, "generateVerifyOTP()", "otpUri");
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
						"Unable to call endpoint " + url, e);
				return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
			}

		} else {
			logger.error(String.format("OAuth Error in generateVerifyOTP() method , HttpStatus=[%s], message=[%s]",
					oauthResponse.getStatusCodeValue(), oauthResponse.getBody()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"oauth error, check logs for more info.");

			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private ResponseEntity<?> invokeApiEndpoint(String url, HttpMethod httpMethod, HttpEntity<JsonNode> request,
			String operationId, String uriId) {
		RestTemplate restTemplate = new RestTemplate();

		ResponseEntity<JsonNode> response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);

		if (response.getStatusCode().is2xxSuccessful()) {
			logger.debug(String.format("OperationId=[%s], UriId=[%s] HttpStatus=[%s], response=[%s]", operationId,
					uriId, response.getStatusCodeValue(), response.getBody()));
		} else {
			logger.error(String.format("OperationId=[%s], UriId=[%s] HttpStatus=[%s], response=[%s]", operationId,
					uriId, response.getStatusCodeValue(), response.getBody()));
		}

		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

}
