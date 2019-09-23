package ae.rakbank.webapply.controllers;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
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

import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.commons.FileHelper;

@RestController
@RequestMapping("/api/v1")
public class ApiRequestForwarder {

	@Autowired
	FileHelper fileHelper;

	private JsonNode endpoints = null;

	private String dehHost = null;

	@PostConstruct
	public void initAppState() {
		JsonNode appConfigJSON = fileHelper.loadJSONFile("appConfig.json");
		endpoints = appConfigJSON.get(EnvUtil.getEnv()).get("dehEndpoints");
		dehHost = endpoints.get("host").asText();
	}

	@PostMapping(value = "/banks/RAK/usertypes/sme/prospects/", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> createSMEProspect(@RequestBody JsonNode jsonNode) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@PutMapping(value = "/banks/RAK/usertypes/sme/prospects/", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> updateSMEProspect(@RequestBody JsonNode jsonNode) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@GetMapping(value = "/banks/RAK/usertypes/{userType}/prospects/search", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> searchProspect(@RequestBody JsonNode jsonNode, @PathVariable String userType) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@GetMapping(value = "/banks/RAK/usertypes/sme/prospects/{prospectId}", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getProspectById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@GetMapping(value = "/banks/RAK/prospects/{prospectId}/documents/{documentId}", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getDocumentById(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String documentId) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@GetMapping(value = "/banks/RAK/prospects/{prospectId}/documents", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> getDocumentsByProspectId(@RequestBody JsonNode jsonNode,
			@PathVariable String prospectId) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@PostMapping(value = "/banks/RAK/users/authenticate", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> login(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String documentId) {

		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

	@PostMapping(value = "/banks/RAK/otp", produces = "application/json", consumes = "application/json")
	@ResponseBody
	public ResponseEntity<Object> generateVerifyOTP(@RequestBody JsonNode jsonNode, @PathVariable String prospectId,
			@PathVariable String documentId) {
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<JsonNode> request = new HttpEntity<>(jsonNode);

		String url = dehHost + endpoints.get("createProspectPath").asText();
		ResponseEntity<JsonNode> response = restTemplate.exchange(url, HttpMethod.POST, request, JsonNode.class);
		return new ResponseEntity<Object>(response.getBody(), response.getHeaders(), response.getStatusCode());
	}

}
