package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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
import ae.rakbank.webapply.commons.FileHelper;

@RestController
@RequestMapping("/api/v1")
public class WebApplyController {

	private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

	@Autowired
	ServletContext servletContext;

	@Autowired
	FileHelper fileHelper;

	private JsonNode uiConfigJSON = null;

	private JsonNode appConfigJSON = null;

	private JsonNode navigationJSON = null;

	private JsonNode smeProspectJSON = null;

	@PostConstruct
	public void initAppState() {
		uiConfigJSON = fileHelper.loadJSONFile("uiConfig.json");
		appConfigJSON = fileHelper.loadJSONFile("appConfig.json");
		navigationJSON = fileHelper.loadJSONFile("navigationConfig.json");
		smeProspectJSON = fileHelper.loadJSONFile("smeProspect.json");

		try {
			loadAppInitialState();
		} catch (Exception e) {
			logger.error("unable to prepare config for web apply", e);
		}
	}

	@GetMapping(value = "/config", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getWebApplyConfig(@RequestParam String segment, @RequestParam String product,
			@RequestParam String role, @RequestParam(required = false, defaultValue = "desktop") String device)
			throws Exception {
		logger.info("begin getWebApplyConfigs");
		HttpHeaders headers = new HttpHeaders();
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
			return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
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

			} catch (IOException e) {
				logger.error("unable to reload configs", e);
				ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, e);
				return new ResponseEntity<Object>(error, headers, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}

		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode response = objectMapper.createObjectNode();
		response.put("message", "reload configs successful");
		return new ResponseEntity<Object>(response, headers, HttpStatus.OK);
	}

	private String buildAppInitialState(String segment, String product, String role, String device) throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode initStateJSON = objectMapper.createObjectNode();

		setWebApplyEndpoints(objectMapper, initStateJSON);
		initStateJSON.set("navigationConfig", navigationJSON.get(segment));
		initStateJSON.set("prospect", getProspect(segment, product));
		JsonNode datalist = getDatalistJSON(segment, initStateJSON);
		// deep clone the json nodes
		String uiConfig = objectMapper.writeValueAsString(uiConfigJSON);
		JsonNode uiConfigNode = objectMapper.readTree(uiConfig);

		ObjectNode uiFieldsObjNode = filterUIConfigFieldsByCriteria((ObjectNode) uiConfigNode, segment, product, role,
				device, datalist);

		initStateJSON.set("uiConfig", uiFieldsObjNode);

		String cacheKey = getCacheKey(segment, product, role, device);
		String configJSON = initStateJSON.toString();
		putCache(cacheKey, configJSON);

		return initStateJSON.toString();

	}

	private void setWebApplyEndpoints(ObjectMapper objectMapper, ObjectNode initStateJSON) {
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
	}

	private ObjectNode filterUIConfigFieldsByCriteria(ObjectNode uiConfigNode, String segment, String product,
			String role, String device, JsonNode datalist) {
		Iterator<Entry<String, JsonNode>> fields = uiConfigNode.fields();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode uiFields = objectMapper.createObjectNode();
		while (fields.hasNext()) {
			Entry<String, JsonNode> entry = fields.next();
			String uid = entry.getKey();
			ObjectNode fieldConfig = (ObjectNode) entry.getValue();
			boolean applicable = fieldConfig.has("label") && !fieldConfig.get("label").isNull()
					&& matchCriteria(fieldConfig, segment, product, role, device);

			if (applicable) {
				fieldConfig.put("applicable", true);
				fieldConfig.remove("criteria");
				uiFields.set(uid, fieldConfig);

				if (fieldConfig.has("datalistId") && fieldConfig.get("datalistId").isNull()) {
					fieldConfig.remove("datalistId");
				} else {
					String groupId = fieldConfig.get("datalistId").asText();
					fieldConfig.set("datalist", datalist.get(groupId));
				}

				if (fieldConfig.has("readOnlyFor")
						&& (fieldConfig.get("readOnlyFor").isNull() || fieldConfig.get("readOnlyFor").size() == 0)) {
					fieldConfig.remove("readOnlyFor");
				}

				if (fieldConfig.has("shortKeyNames")) {
					fieldConfig.remove("shortKeyNames");
				}
			}

		}
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

	private JsonNode getDatalistJSON(String segment, JsonNode initStateJSON) throws IOException {
		RestTemplate restTemplate = new RestTemplate();

		String dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
		JsonNode dehURIs = appConfigJSON.get("DehURIs");
		String url = dehBaseUrl + dehURIs.get("datalistUri").asText();

		UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(segment);

		ResponseEntity<JsonNode> response = restTemplate.exchange(uriComponents.toUri(), HttpMethod.GET, null,
				JsonNode.class);
		
		return response.getBody();
	}

	private String getCacheKey(String segment, String product, String role, String device) {
		return String.join("_", segment, product, role, device).toUpperCase();
	}
}