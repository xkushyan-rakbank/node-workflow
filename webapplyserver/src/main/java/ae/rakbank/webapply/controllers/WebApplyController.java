package ae.rakbank.webapply.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;

@Controller
public class WebApplyController {

	private static final Logger logger = LoggerFactory.getLogger(WebApplyController.class);

	@Autowired
	private ResourceLoader resourceLoader;

	@Autowired
	ServletContext servletContext;

	private JsonNode uiConfigJSON = null;

	private JsonNode appConfigJSON = null;

	private JsonNode navigationJSON = null;

	private JsonNode smeProspectJSON = null;

	@PostConstruct
	public void initAppState() {
		uiConfigJSON = loadJSONConfigFile("uiConfig.json");
		appConfigJSON = loadJSONConfigFile("appConfig.json");
		navigationJSON = loadJSONConfigFile("navigationConfig.json");
		smeProspectJSON = loadJSONConfigFile("smeProspect.json");

		try {
			loadAppInitialState();
		} catch (Exception e) {
			logger.error("unable to prepare config for web apply", e);
		}
	}

	private JsonNode loadJSONConfigFile(String filename) {
		try {
			logger.info("loading " + filename);
			ObjectMapper objectMapper = new ObjectMapper();
			Resource resource = resourceLoader.getResource("classpath:" + filename);
			System.out.println(resource.getFile().toString());
			String fileContent = FileUtils.readFileToString(resource.getFile(), "UTF-8");
			return objectMapper.readTree(fileContent);
		} catch (IOException e) {
			logger.error("error loading " + filename, e);
		}
		return null;
	}

	@GetMapping(value = "/api/v1/config", produces = "application/json")
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

	@PostMapping(value = "/api/v1/config/reload", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> loadAppInitialState() {
		logger.info("reload config files and cache again");
		HttpHeaders headers = new HttpHeaders();
		// [Sep 8, 2019], Web Apply & MobileApply same set of controls/fields. Add
		// 'mobile' to devices if MobileApply has different set of fields
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
		initStateJSON.set("endpoints", appConfigJSON.get(EnvUtil.getEnv()).get("endpoints"));
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
		String hostValue = initStateJSON.get("endpoints").get("host").asText();
		String scheme = hostValue.substring(0, hostValue.indexOf(':'));
		String host = hostValue.substring(hostValue.indexOf("://") + 3);
		String path = initStateJSON.get("endpoints").get("datalistPath").asText();

		UriComponents uriComponents = UriComponentsBuilder.newInstance().scheme(scheme).host(host).path(path)
				.buildAndExpand(segment);

		String endpoint = uriComponents.toUriString();

		logger.info("invoke api endpoint - " + endpoint);

		RestTemplate restTemplate = new RestTemplate();
		ResponseEntity<String> response = restTemplate.getForEntity(endpoint, String.class);
		ObjectMapper mapper = new ObjectMapper();
		logger.info("Status of api - " + endpoint + " is  " + response.getStatusCode());
		JsonNode datalistJSON = mapper.readTree(response.getBody());
		logger.debug("datalist ", datalistJSON.toString());
		return datalistJSON;
	}

	private String getCacheKey(String segment, String product, String role, String device) {
		return String.join("_", segment, product, role, device).toUpperCase();
	}
}