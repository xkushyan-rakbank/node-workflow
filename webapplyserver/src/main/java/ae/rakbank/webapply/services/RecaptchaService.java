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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.commons.EnvUtil;
import ae.rakbank.webapply.commons.RecaptchaUtil;
import ae.rakbank.webapply.helpers.FileHelper;

@Service
public class RecaptchaService {

	private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);

	@Autowired
	FileHelper fileHelper;

	@Value("${google.recaptcha.secret}")
	String recaptchaSecret;

	@Value("${google.recaptcha.endpoint}")
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
	public ResponseEntity<?> verifyRecaptcha(String ip, String recaptchaResponse) {
		Map<String, String> body = new HashMap<>();
		body.put("secret", recaptchaSecret);
		body.put("response", recaptchaResponse);
		body.put("remoteip", ip);
		logger.debug("Request body for recaptcha: {}", body);
		ResponseEntity<Map> recaptchaResponseEntity = restTemplateBuilder.build().postForEntity(
				recaptchaEndpoint + "?secret={secret}&response={response}&remoteip={remoteip}", body, Map.class, body);
		logger.debug("Response from recaptcha: {}", recaptchaResponseEntity);

		String errorMessage = "";
		if (recaptchaResponseEntity.getStatusCode().is5xxServerError()) {
			errorMessage = "SERVER_ERROR";
		} else {
			Map<String, Object> responseBody = recaptchaResponseEntity.getBody();
			boolean recaptchaSucess = (Boolean) responseBody.get("success");
			if (!recaptchaSucess) {
				List<String> errorCodes = (List) responseBody.get("error-codes");
				errorMessage = errorCodes.stream().map(s -> RecaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
						.collect(Collectors.joining(", "));
			}
		}

		if (StringUtils.isBlank(errorMessage)) {
			logger.debug("reCAPTCHA Response:  HttpStatus: 200, Message: OK");
			return ResponseEntity.ok().build();
		} else {
			logger.error("reCAPTCHA verification failed");
			Map<String, Object> response = new HashMap<>();
			response.put("errorType", "ReCaptchaError");

			if ("SERVER_ERROR".equalsIgnoreCase(errorMessage)) {
				response.put("message", "Internal Server Error");
				logger.error("reCAPTCHA verification failed, HttpStatus=500, response: " + response);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
			} else {
				response.put("message", errorMessage);
				logger.error("reCAPTCHA verification failed, HttpStatus=400, response: " + response);
				return ResponseEntity.badRequest().body(response);
			}
		}

	}
}