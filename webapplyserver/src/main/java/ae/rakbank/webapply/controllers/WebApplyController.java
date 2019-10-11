package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
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

@RestController
@RequestMapping("/api/v1")
public class WebApplyController {

	private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

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

	@PostConstruct
	public void initAppState() {
		uiConfigJSON = fileHelper.getUIConfigJSON();
		appConfigJSON = fileHelper.getAppConfigJSON();
		smeProspectJSON = fileHelper.getSMEProspectJSON();

		try {
			loadAppInitialState();
		} catch (Exception e) {
			logger.error("error in preparing the config json and put the values in ServletContext", e);
		}
	}

	@GetMapping(value = "/config", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getWebApplyConfig(HttpServletRequest httpRequest, HttpServletResponse httpResponse,
			@RequestParam String segment, @RequestParam String product, @RequestParam String role,
			@RequestParam(required = false, defaultValue = "desktop") String device) throws Exception {
		logger.info("Begin getWebApplyConfig() method");

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
		for (String device : devices) {
			try {
				buildAppInitialState("sme", "checking", "customer", device);
				buildAppInitialState("sme", "checking", "agent", device);

			} catch (Exception e) {
				logger.error("unable to load/reload configs", e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
				return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
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

		setWebApplyEndpoints(objectMapper, initStateJSON);
		initStateJSON.set("prospect", getProspect(segment, product));

		// deep clone the json nodes
		String uiConfig = objectMapper.writeValueAsString(uiConfigJSON);
		JsonNode uiConfigNode = objectMapper.readTree(uiConfig);

		JsonNode datalist = getDatalistJSON(segment, initStateJSON);
		ObjectNode uiFieldsObjNode = filterUIConfigFieldsByCriteria((ObjectNode) uiConfigNode, segment, product, role,
				device, datalist);

		initStateJSON.set("uiConfig", uiFieldsObjNode);

		String cacheKey = getCacheKey(segment, product, role, device);
		String configJSON = initStateJSON.toString();
		putCache(cacheKey, configJSON);

		logger.info("End buildAppInitialState() method");

		return initStateJSON.toString();

	}

	private void setWebApplyEndpoints(ObjectMapper objectMapper, ObjectNode initStateJSON) {
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
						} else {
							String groupId = fieldConfig.get("datalistId").asText();
							fieldConfig.set("datalist", datalist.get(groupId));
						}

					}

					if (fieldConfig.has("readonlyFor") && (fieldConfig.get("readonlyFor").isNull()
							|| fieldConfig.get("readonlyFor").size() == 0)) {
						fieldConfig.remove("readonlyFor");
					}

					if (fieldConfig.has("shortKeyNames")) {
						fieldConfig.remove("shortKeyNames");
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

		JsonNode criteria = fieldConfig.get("criteria");

		List<String> roles = new ArrayList<>();
		((ArrayNode) criteria.get("roles")).forEach(node -> roles.add(node.asText()));

		List<String> segments = new ArrayList<>();
		((ArrayNode) criteria.get("segments")).forEach(node -> segments.add(node.asText()));

		List<String> products = new ArrayList<>();
		((ArrayNode) criteria.get("products")).forEach(node -> products.add(node.asText()));

		List<String> devices = new ArrayList<>();
		((ArrayNode) criteria.get("devices")).forEach(node -> devices.add(node.asText()));

		if (roles.contains(role) && segments.contains(segment) && products.contains(product)
				&& devices.contains(device)) {
			return true;
		}

		logger.info("End matchCriteria() method");

		return false;
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

		String methodName = "getDatalistJSON()";

		ResponseEntity<JsonNode> oauthResponse = oauthClient.getOAuthToken();

		if (oauthResponse != null && oauthResponse.getStatusCode().is2xxSuccessful()) {

			RestTemplate restTemplate = new RestTemplate();

			String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
			JsonNode dehURIs = appConfigJSON.get("DehURIs");
			String url = dehBaseUrl + dehURIs.get("datalistUri").asText();

			UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

			url = uriComponents.toString();

			HttpHeaders headers = new HttpHeaders();
			headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
			headers.setContentType(MediaType.APPLICATION_JSON);
			headers.set("Authorization", "Bearer " + oauthResponse.getBody().get("access_token").asText());

			HttpEntity<JsonNode> request = new HttpEntity<>(null, headers);
			logger.debug("GetDataList API request " + request.toString());

			logger.info(String.format("Invoke API from %s method, Endpoint=[%s] ", methodName, url));

			ResponseEntity<JsonNode> response = null;

			try {
				response = restTemplate.exchange(url, HttpMethod.GET, request, JsonNode.class);
			} catch (Exception e) {
				logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
			}

			logger.debug(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s], response=[%s]",
					methodName, url, response.getStatusCodeValue(), response.getBody()));

			if (response.getStatusCode().is2xxSuccessful()) {
				logger.info(String.format("API call from %s method is SUCCESSFUL, Endpoint=[%s] HttpStatus=[%s]",
						methodName, url, response.getStatusCodeValue()));

				return response.getBody();

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

	private String getCacheKey(String segment, String product, String role, String device) {
		return String.join("_", segment, product, role, device).toUpperCase();
	}
}