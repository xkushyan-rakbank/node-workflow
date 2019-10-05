package ae.rakbank.webapply.controllers;

import java.util.Collections;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
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
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.CSRFTokenHelper;
import ae.rakbank.webapply.helpers.CookieHelper;
import ae.rakbank.webapply.helpers.FileHelper;
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

	@Autowired
	CSRFTokenHelper csrfTokenHelper;

	@Autowired
	CookieHelper cookieHelper;

	private JsonNode dehURIs = null;

	private String dehBaseUrl = null;

	private JsonNode appConfigJSON = null;

	@PostConstruct
	public void init() {
		appConfigJSON = fileHelper.getAppConfigJSON();
		dehURIs = appConfigJSON.get("DehURIs");
		dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
	}

	@PostMapping(value = "/usertypes/{segment}/prospects/", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> createSMEProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestBody JsonNode requestBodyJSON, @PathVariable String segment, HttpServletRequest servletRequest) {

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

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, requestBodyJSON, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("createProspectUri").asText();

			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			logger.info("Call createProspect endpoint: " + uriComponents.toString());

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.POST, request,
						"createSMEProspect()", "createProspectUri", MediaType.APPLICATION_JSON, segment);
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

	@PutMapping(value = "/usertypes/{segment}/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> updateSMEProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestBody JsonNode jsonNode, @PathVariable String prospectId, @PathVariable String segment) {
		logger.info("Begin updateSMEProspect() method");

		logger.debug(String.format("updateSMEProspect() method args, RequestBody=[%s], segment=[%s], prospectId=[%s]",
				jsonNode.toString(), segment, prospectId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, jsonNode, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

			try {

				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.PUT, request,
						"updateSMEProspect()", "updateProspectUri", MediaType.APPLICATION_JSON, segment);

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

	@PostMapping(value = "/usertypes/{segment}/prospects/search", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<?> searchProspect(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestBody JsonNode jsonNode, @PathVariable String segment) {
		logger.info("Begin searchProspect() method");

		logger.debug(String.format("searchProspect() method args, RequestBody=[%s], segment=[%s]", jsonNode.toString(),
				segment));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, jsonNode, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("searchProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			try {

				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.POST, request,
						"searchProspect()", "searchProspectUri", MediaType.APPLICATION_JSON, segment);

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
	public ResponseEntity<?> getProspectById(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@PathVariable String segment, @PathVariable String prospectId) {
		logger.info("Begin getProspectById() method");

		logger.debug(
				String.format("getProspectById() method args, prospectId=[%s], segment=[%s]", prospectId, segment));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, null, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment, prospectId);

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
						"getProspectById()", "getProspectUri", MediaType.APPLICATION_JSON, segment);

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

	@GetMapping(value = "/prospects/{prospectId}/documents/{documentId}")
	@ResponseBody
	public ResponseEntity<?> getProspectDocumentById(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@PathVariable String prospectId, @PathVariable String documentId) {

		logger.info("Begin getProspectDocumentById() method");

		logger.debug(String.format("getProspectDocumentById() method args, prospectId=[%s], documentId=[%s]",
				prospectId, documentId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, null, oauthResponse,
					MediaType.APPLICATION_OCTET_STREAM);

			String url = dehBaseUrl + dehURIs.get("getProspectDocumentByIdUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId, documentId);

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
						"getProspectDocumentById()", "getProspectDocumentByIdUri", MediaType.APPLICATION_OCTET_STREAM,
						null);

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
	public ResponseEntity<?> getProspectDocuments(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@PathVariable String prospectId) {

		logger.info("Begin getProspectDocuments() method");

		logger.debug(String.format("getProspectDocuments() method args, prospectId=[%s]", prospectId));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, null, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, uriComponents.toString(), HttpMethod.GET, request,
						"getProspectDocuments()", "getProspectDocumentsUri", MediaType.APPLICATION_JSON, null);
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
	public ResponseEntity<?> login(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestBody JsonNode jsonNode) {

		logger.info("Begin login() method");

		logger.debug(String.format("login() method args, RequestBody=[%s]", jsonNode.toString()));

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, jsonNode, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("authenticateUserUri").asText();

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, url, HttpMethod.POST, request, "login()",
						"authenticateUserUri", MediaType.APPLICATION_JSON, null);
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
	public ResponseEntity<?> generateVerifyOTP(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestBody JsonNode requestJSON, HttpServletRequest servletRequest) {

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

			HttpEntity<JsonNode> request = getHttpEntityRequest(httpRequest, requestJSON, oauthResponse,
					MediaType.APPLICATION_JSON);

			String url = dehBaseUrl + dehURIs.get("otpUri").asText();

			try {
				return invokeApiEndpoint(httpRequest, httpResponse, url, HttpMethod.POST, request,
						"generateVerifyOTP()", "otpUri", MediaType.APPLICATION_JSON, null);
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

	private HttpEntity<JsonNode> getHttpEntityRequest(HttpServletRequest httpRequest, JsonNode requestBodyJSON,
			ResponseEntity<JsonNode> oauthResponse, MediaType mediaType) {
		HttpHeaders headers = new HttpHeaders();
		/*
		 * Enumeration<String> enumeration = httpRequest.getHeaderNames(); while
		 * (enumeration.hasMoreElements()) { String headerName =
		 * enumeration.nextElement(); String headerValue =
		 * httpRequest.getHeader(headerName); headers.add(headerName, headerValue); }
		 */

		headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
		if (mediaType != null) {
			headers.setContentType(mediaType);
		}

		headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

		return new HttpEntity<>(requestBodyJSON, headers);
	}

	private ResponseEntity<?> invokeApiEndpoint(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			String url, HttpMethod httpMethod, HttpEntity<JsonNode> request, String operationId, String uriId,
			MediaType mediaType, String segment) {
		logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", operationId, url));

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<?> response = null;
		if (MediaType.APPLICATION_JSON.equals(mediaType)) {
			response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);
		} else {
			response = restTemplate.exchange(url, httpMethod, request, Resource.class);
		}

		// ResponseEntity headers is immutable, so create new HttpHeaders object
		HttpHeaders headers = new HttpHeaders();
		headers.addAll(response.getHeaders());

		logger.debug(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s], response=[%s]", operationId,
				url, response.getStatusCodeValue(), response.getBody()));

		if (response.getStatusCode().is2xxSuccessful()) {
			logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
					operationId, url, response.getStatusCodeValue()));

			csrfTokenHelper.createCSRFToken(httpRequest, headers);

			cookieHelper.createWebApplyJWT(httpResponse);

			if (MediaType.APPLICATION_JSON.equals(mediaType) && StringUtils.isNotBlank(segment)) {
				updateHrefValue((JsonNode) response.getBody(), segment);
			}

		} else {
			logger.error(String.format("API call from %s method is UNSUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
					operationId, url, response.getStatusCodeValue()));
		}

		return new ResponseEntity<Object>(response.getBody(), headers, response.getStatusCode());
	}

	private void updateHrefValue(JsonNode parent, String segment) {
		if (parent.has("prospectId") && parent.has("_links")) {
			String prospectId = parent.get("prospectId").asText();
			String getProspectUri = appConfigJSON.get("WebApplyURIs").get("getProspectUri").asText();

			UriComponents uriComponents = UriComponentsBuilder.fromUriString(getProspectUri).buildAndExpand(segment,
					prospectId);

			((ObjectNode) parent.get("_links").get("self")).put("href", uriComponents.toString());

		}

		// Now, recursively invoke this method on all properties
		for (JsonNode child : parent) {
			updateHrefValue(child, segment);
		}

	}

}
