package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.helpers.CSRFTokenHelper;
import ae.rakbank.webapply.helpers.CookieHelper;
import ae.rakbank.webapply.helpers.FileHelper;
import ae.rakbank.webapply.services.OAuthService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class WebApplyController {

	private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

	@Value("${build.date}")
	private String buildDate;

	@Value("${app.name}")
	private String appName;

	@Autowired
	ServletContext servletContext;

	@Autowired
	FileHelper fileHelper;

	@Autowired
	OAuthService oauthClient;

	@Autowired
	CSRFTokenHelper csrfTokenHelper;

	@Autowired
	CookieHelper cookieHelper;

	private JsonNode uiConfigJSON = null;

	private JsonNode appConfigJSON = null;

	private JsonNode smeProspectJSON = null;

	private String[] roles = { "customer", "agent" };

	private String[] products = { "RAKstarter", "Current Account", "RAKelite" };

	private String[] segments = { "sme", "retail" };

	private String[] devices = { "desktop", "mobile", "tablet" };

	private ObjectNode defaultDatalist = null;

	@PostConstruct
	public void initAppState() {
		uiConfigJSON = fileHelper.getUIConfigJSON();
		appConfigJSON = fileHelper.getAppConfigJSON();
		smeProspectJSON = fileHelper.getSMEProspectJSON();
		defaultDatalist = new ObjectMapper().createObjectNode();

		try {
			loadAppInitialState();
		} catch (Exception e) {
			logger.error("error in preparing the config json and put the values in ServletContext", e);
		}
	}

	private String validCriteriaParams(String segment, String product, String role, String device) {
		if (StringUtils.isNotBlank(segment) && !ArrayUtils.contains(segments, segment)) {
			return String.format("'%s' is invalid, allowed values [%s]", segment, ArrayUtils.toString(segments));
		}
		if (StringUtils.isNotBlank(product) && !ArrayUtils.contains(products, product)) {
			return String.format("'%s' is invalid, allowed values [%s]", product, ArrayUtils.toString(products));
		}
		if (StringUtils.isNotBlank(role) && !ArrayUtils.contains(roles, role)) {
			return String.format("'%s' is invalid, allowed values [%s]", role, ArrayUtils.toString(roles));
		}
		if (StringUtils.isNotBlank(device) && !ArrayUtils.contains(devices, device)) {
			return String.format("'%s' is invalid, allowed values [%s]", device, ArrayUtils.toString(devices));
		}

		return null;
	}

	@GetMapping(value = "/health", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> health() {
		HttpHeaders headers = new HttpHeaders();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode response = objectMapper.createObjectNode();
		response.put("buildDate", buildDate);
		if (!EnvUtil.isProd()) {
			response.put("project", appName);
		}
		return new ResponseEntity<Object>(response, headers, HttpStatus.OK);
	}

	@GetMapping(value = "/config", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getWebApplyConfig(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestParam(required = false, defaultValue = "") String segment,
			@RequestParam(required = false, defaultValue = "") String product, @RequestParam String role,
			@RequestParam(required = false, defaultValue = "desktop") String device) throws Exception {
		logger.info("Begin getWebApplyConfig() method");

		String invalidCriteriaError = validCriteriaParams(segment, product, role, device);
		if (StringUtils.isNotBlank(invalidCriteriaError)) {
			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "Invalid segment, product or role.",
					invalidCriteriaError);
			return new ResponseEntity<Object>(error, null, HttpStatus.BAD_REQUEST);
		}

		HttpHeaders headers = new HttpHeaders();
		csrfTokenHelper.createCSRFToken(httpRequest, headers);
		cookieHelper.createWebApplyJWT(httpResponse);

		String cacheKey = getCacheKey(segment, product, role, device);
		String cachedValue = getCachedData(cacheKey);
		if (StringUtils.isNotBlank(cachedValue)) {
			logger.info("cached data found for key - " + cacheKey);
			return new ResponseEntity<Object>(cachedValue, headers, HttpStatus.OK);

		}
		String webApplyConfig = null;
		try {
			webApplyConfig = buildAppInitialState(segment, product, role, device);
		} catch (IOException e) {
			logger.error("error occured while loading config files", e);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<Object>(webApplyConfig, headers, HttpStatus.OK);
	}

	@PostMapping(value = "/config/reload", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> loadAppInitialState() {
		logger.info("reload config files and cache again");
		HttpHeaders headers = new HttpHeaders();
		// (Assumption) WebApply & MobileApply will have same set of fields otherwise
		// add "mobile" to devices array
		String[] devices = { "desktop" };
		String[] segments = { "sme" };
		String[] products = { "RAKstarter", "Current Account", "RAKelite" };
		String[] roles = { "customer", "agent" };
		for (String device : devices) {
			for (String segment : segments) {
				for (String product : products) {
					for (String role : roles) {
						try {
							buildAppInitialState(segment, product, role, device);

						} catch (Exception e) {
							logger.error(String.format(
									"unable load/reload config for web apply for device=[%s] segment=[%s], product=[%s], role=[%s]",
									device, segment, product, role));
							ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
							return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
						}
					}
				}
			}
		}

		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode response = objectMapper.createObjectNode();
		response.put("message", "reload configs successful");
		return new ResponseEntity<Object>(response, headers, HttpStatus.OK);
	}

	private String buildAppInitialState(String segment, String product, String role, String device) throws Exception {
		logger.info("Begin buildAppInitialState() method");
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode initStateJSON = objectMapper.createObjectNode();

		setWebApplyEndpoints(objectMapper, initStateJSON, role);
		initStateJSON.set("prospect", getProspect(segment, product));

		String recaptchaSiteKey = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSiteKey")
				.asText();
		JsonNode baseUrls = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv());
		initStateJSON.put("reCaptchaSiteKey", recaptchaSiteKey);
		initStateJSON.put("termsConditionsUrl", baseUrls.get("TermsConditionsUrl").asText());
		initStateJSON.put("servicePricingGuideUrl", baseUrls.get("ServicePricingGuideUrl").asText());

		ResponseEntity<?> pkResponse = getRSAPublicKey();
		if (pkResponse.getStatusCode().is2xxSuccessful()) {
			initStateJSON.put("rsaPublicKey", ((JsonNode) pkResponse.getBody()).get("body").asText());
		} else {
			logger.error(String.format("error in GET RSA Public Key. HttpStatus=%s, response=%s",
					pkResponse.getStatusCodeValue(), pkResponse.getBody().toString()));
			throw new Exception(String.format("error in GET RSA Public Key. HttpStatus=%s, response=%s",
					pkResponse.getStatusCodeValue(), pkResponse.getBody().toString()));
		}
		// deep clone the json nodes
		String uiConfig = objectMapper.writeValueAsString(uiConfigJSON);
		JsonNode uiConfigNode = objectMapper.readTree(uiConfig);

		JsonNode datalist = getDatalistJSON(segment, initStateJSON);

		if (datalist == null || datalist.size() == 0) {
			logger.error("datalist is null or no elements found in datalist object");
			throw new Exception("datalist is null or no elements found in datalist object");
		}

		ObjectNode uiFieldsObjNode = filterUIConfigFieldsByCriteria((ObjectNode) uiConfigNode, segment, product, role,
				device, datalist);

		initStateJSON.set("uiConfig", uiFieldsObjNode);

		String cacheKey = getCacheKey(segment, product, role, device);
		String configJSON = initStateJSON.toString();
		putCache(cacheKey, configJSON);

		logger.info("End buildAppInitialState() method");

		return initStateJSON.toString();

	}

	private void setWebApplyEndpoints(ObjectMapper objectMapper, ObjectNode initStateJSON, String role) {

		logger.info("Begin setWebApplyEndpoints() method");
		ObjectNode endpointsJSON = objectMapper.createObjectNode();
		endpointsJSON.put("baseUrl",
				appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("WebApplyBaseUrl").asText());
		JsonNode webApplyURIs = appConfigJSON.get("WebApplyURIs");
		Iterator<String> uris = webApplyURIs.fieldNames();
		while (uris.hasNext()) {
			String uriName = uris.next();
			endpointsJSON.set(uriName, webApplyURIs.get(uriName));
		}

		// remove agent specific URIs
		String[] agentURIs = { "searchProspectUri", "authenticateUserUri" };
		if (StringUtils.isBlank(role) || StringUtils.equalsIgnoreCase("customer", role)) {
			for (String uri : agentURIs) {
				endpointsJSON.remove(uri);
			}
		}
		initStateJSON.set("endpoints", endpointsJSON);
		logger.info("End setWebApplyEndpoints() method");
	}

	private ObjectNode filterUIConfigFieldsByCriteria(ObjectNode uiConfigNode, String segment, String product,
			String role, String device, JsonNode datalist) {
		logger.info("Begin filterUIConfigFieldsByCriteria() method");

		Iterator<Entry<String, JsonNode>> fields = uiConfigNode.fields();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode uiFields = objectMapper.createObjectNode();
		while (fields.hasNext()) {
			Entry<String, JsonNode> entry = fields.next();
			String uid = entry.getKey();

			try {

				ObjectNode fieldConfig = (ObjectNode) entry.getValue();
				boolean applicable = fieldConfig.has("label") && !fieldConfig.get("label").isNull()
						&& matchCriteria(fieldConfig, segment, product, role, device);
				if (applicable) {
					fieldConfig.put("applicable", true);
					fieldConfig.remove("criteria");
					uiFields.set(uid, fieldConfig);

					if (fieldConfig.has("datalistId")) {
						if (fieldConfig.get("datalistId").isNull()) {
							fieldConfig.remove("datalistId");
						} else if (datalist != null) {
							String groupId = fieldConfig.get("datalistId").asText();

							if (datalist.has(groupId)) {
								fieldConfig.set("datalist", datalist.get(groupId));
							} else {
								String label = fieldConfig.get("label").asText();
								logger.error(String.format(
										"LOVs not found in getDatalist API response for datalistId=[%s], label=[%s]",
										groupId, label));
//								throw new Exception(String.format(
//										"LOVs not found in getDatalist API response for datalistId=[%s], label=[%s]",
//										groupId, label));
							}

						}

					}

					if (fieldConfig.has("readonlyFor") && (fieldConfig.get("readonlyFor").isNull()
							|| fieldConfig.get("readonlyFor").size() == 0)) {
						fieldConfig.remove("readonlyFor");
					}

					if (fieldConfig.has("shortKeyNames")) {
						fieldConfig.remove("shortKeyNames");
					}

					if (fieldConfig.has("description")) {
						fieldConfig.remove("description");
					}
				}
			} catch (Exception e) {
				logger.error("Error while processing UID= " + uid, e);
			}

		}

		logger.info("End filterUIConfigFieldsByCriteria() method");

		return uiFields;

	}

	private boolean matchCriteria(JsonNode fieldConfig, String segment, String product, String role, String device) {
		if (fieldConfig.has("criteria")) {
			JsonNode criteria = fieldConfig.get("criteria");
			boolean roleMatched = true;
			boolean segmentMatched = true;
			boolean productMatched = true;
			boolean deviceMatched = true;

			if (criteria.has("roles")) {
				List<String> roles = new ArrayList<>();
				((ArrayNode) criteria.get("roles")).forEach(node -> roles.add(node.asText()));
				if (roles.isEmpty() || (StringUtils.isNotBlank(role) && roles.contains(role))) {
					roleMatched = true;
				} else {
					roleMatched = false;
				}
			}

			if (criteria.has("segments")) {
				List<String> segments = new ArrayList<>();
				((ArrayNode) criteria.get("segments")).forEach(node -> segments.add(node.asText()));
				if (segments.isEmpty() || (StringUtils.isNotBlank(segment) && segments.contains(segment))) {
					segmentMatched = true;
				} else {
					segmentMatched = false;
				}
			}

			if (criteria.has("products")) {
				List<String> products = new ArrayList<>();
				((ArrayNode) criteria.get("products")).forEach(node -> products.add(node.asText()));
				if (products.isEmpty() || (StringUtils.isNotBlank(product) && products.contains(product))) {
					productMatched = true;
				} else {
					productMatched = false;
				}
			}

			if (criteria.has("devices")) {
				List<String> devices = new ArrayList<>();
				((ArrayNode) criteria.get("devices")).forEach(node -> devices.add(node.asText()));
				if (devices.isEmpty() || (StringUtils.isNotBlank(device) && devices.contains(device))) {
					deviceMatched = true;
				} else {
					deviceMatched = false;
				}
			}
			return roleMatched && segmentMatched && productMatched && deviceMatched;

		}

		return true;
	}

	private String getCachedData(String key) {
		logger.info("retrieve data from cache for key - " + key);
		return (String) servletContext.getAttribute(key);
	}

	private void putCache(String key, String data) {
		logger.info("adding data to cache key - " + key);
		servletContext.setAttribute(key, data);

	}

	private JsonNode getProspect(String segment, String product) {
		if ("sme".equalsIgnoreCase(segment)) {
			return smeProspectJSON;
		}
		return null;
	}

	private JsonNode getDatalistJSON(String segment, JsonNode initStateJSON) throws Exception {
		logger.info("Begin getDatalistJSON() method, segment=" + segment);

		if (StringUtils.isBlank(segment)) {
			logger.info("segment is null, return defaultDatalist");
			return defaultDatalist;
		}

		String methodName = "getDatalistJSON()";

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			RestTemplate restTemplate = new RestTemplate();

			String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
			JsonNode dehURIs = appConfigJSON.get("DehURIs");
			String url = dehBaseUrl + dehURIs.get("datalistUri").asText();

			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			url = uriComponents.toString();

			HttpHeaders headers = oauthClient.getOAuthHeaders(oauthResponse, MediaType.APPLICATION_JSON);

			HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);

			logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", methodName, url));

			logger.info(String.format("Endpoint=[%s], request=%s", url, request.toString()));

			ResponseEntity<JsonNode> response = null;

			try {
				response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
			}

			JsonNode datalist = response.getBody();
			logger.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s], response=[%s]",
					methodName, url, response.getStatusCodeValue(), datalist));

			if (response.getStatusCode().is2xxSuccessful()) {
				logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
						methodName, url, response.getStatusCodeValue()));
				populateDefaultDatalist(datalist);
				return datalist;

			} else {
				logger.error(String.format("API call from %s method is UNSUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
						methodName, url, response.getStatusCodeValue()));
			}

		} else {
			logger.error("Unable to call datalist API due to oauth error.");
			throw new Exception("Unable to call datalist API due to oauth error.");
		}
		logger.info("End getDatalistJSON() method, segment=" + segment);
		return null;
	}

	private ResponseEntity<?> getRSAPublicKey() {
		logger.info("Begin getRSAPublicKey()");
		String baseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("RSAPublicKeyUrl").asText();
		JsonNode uris = appConfigJSON.get("RSAPublicKeyURIs");
		String url = baseUrl + uris.get("rsaPublicKeyUri").asText();

		HttpHeaders headers = new HttpHeaders();
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> reqEntity = new HttpEntity<>(null, headers);
		ResponseEntity<JsonNode> response = null;
		try {
			response = restTemplate.exchange(url, HttpMethod.GET, reqEntity, JsonNode.class);
		} catch (Exception e) {
			logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"Unable to call endpoint " + url, e);
			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		logger.info("END getRSAPublicKey()");
		return response;
	}

	private void populateDefaultDatalist(JsonNode datalist) {
		if (datalist != null) {
			defaultDatalist.set("countryCode", datalist.get("countryCode"));
		}
		logger.info("defaultDatalist size = " + defaultDatalist.size());
	}

	private String getCacheKey(String segment, String product, String role, String device) {
		return String.join("_", segment, product, role, device).toUpperCase().replace(" ", "_");
	}
}