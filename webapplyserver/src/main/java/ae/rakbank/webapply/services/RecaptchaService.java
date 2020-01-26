package ae.rakbank.webapply.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.commons.ErrorResponse;
import ae.rakbank.webapply.commons.RecaptchaUtil;
import ae.rakbank.webapply.helpers.FileHelper;

@Service
public class RecaptchaService {

	private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);

	@Autowired
	FileHelper fileHelper;

	String recaptchaSecret;

	String recaptchaEndpoint;

	@Autowired
	RestTemplateBuilder restTemplateBuilder;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileHelper.getAppConfigJSON();
		recaptchaSecret = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSecret").asText();
		recaptchaEndpoint = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("ReCaptchaUrl").asText()
				+ appConfigJSON.get("ReCaptchaURIs").get("siteVerifyUri").asText();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public ResponseEntity<JsonNode> verifyRecaptcha(String ip, String recaptchaToken) {
		Map<String, String> body = new HashMap<>();
		body.put("secret", recaptchaSecret);
		body.put("response", recaptchaToken);
		body.put("remoteip", ip);
		logger.debug("Request body for recaptcha: {}", body);

		ResponseEntity<Map> recaptchaResponse = null;
		String url = recaptchaEndpoint + "?secret={secret}&response={response}&remoteip={remoteip}";
		try {
			logger.info(String.format("Endpoint=[%s], Request=[%s]", url, body));

			recaptchaResponse = restTemplateBuilder.build().postForEntity(url, body, Map.class, body);

			logger.info(String.format("Endpoint=[%s], HttpStatus=[%s], verified=[%s]", url,
					recaptchaResponse.getStatusCodeValue(), recaptchaResponse.getBody().get("success")));

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

		Map<String, Object> responseBody = recaptchaResponse.getBody();
		boolean recaptchaTokenVerified = (Boolean) responseBody.get("success");

		logger.info(String.format("reCAPTCHA Response: IP=[%s] HttpStatus=[%s], tokenVerified=%s, response=[%s]", ip,
				recaptchaResponse.getStatusCodeValue(), recaptchaTokenVerified, recaptchaResponse.getBody()));

		if (recaptchaResponse.getStatusCode().is2xxSuccessful() && recaptchaTokenVerified) {
			return ResponseEntity.ok().build();
		} else if (recaptchaResponse.getStatusCode().is5xxServerError()) {

			JsonNode errorResponse = ErrorResponse.createJsonResponse(HttpStatus.INTERNAL_SERVER_ERROR,
					"ReCaptchaError", "Internal Server Error", null, null);

			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		} else if (recaptchaResponse.getStatusCode().is4xxClientError() || !recaptchaTokenVerified) {
			List<String> errorCodes = (List) responseBody.get("error-codes");
			String errorMessage = errorCodes.stream().map(s -> RecaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
					.collect(Collectors.joining(", "));

			errorMessage = StringUtils.defaultIfBlank(errorMessage, "The request is invalid or malformed");

			JsonNode errorResponse = ErrorResponse.createJsonResponse(HttpStatus.BAD_REQUEST, "ReCaptchaError",
					errorMessage, errorMessage, null);

			return ResponseEntity.badRequest().body(errorResponse);
		}
		return null;

	}
}