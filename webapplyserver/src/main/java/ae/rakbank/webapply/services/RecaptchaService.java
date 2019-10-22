package ae.rakbank.webapply.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.commons.EnvUtil;
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
	public ResponseEntity<?> verifyRecaptcha(String ip, String recaptchaToken) {
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
			
			logger.info(String.format("Endpoint=[%s], HttpStatus=[%s], Response=[%s]", url,
					recaptchaResponse.getStatusCodeValue(), recaptchaResponse.getBody()));
			
		} catch (Exception e) {
			logger.error(String.format("Endpoint=[%s], HttpStatus=[%s]", url, e.getMessage()), e);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					"Unable to call endpoint " + recaptchaEndpoint, e);
			return new ResponseEntity(error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		logger.info(String.format("reCAPTCHA Response: IP=[%s] HttpStatus=[%s], message=[%s]", ip,
				recaptchaResponse.getStatusCodeValue(), recaptchaResponse.getBody()));

		if (recaptchaResponse.getStatusCode().is2xxSuccessful()) {
			return ResponseEntity.ok().build();
		} else if (recaptchaResponse.getStatusCode().is4xxClientError()) {
			Map<String, Object> responseBody = recaptchaResponse.getBody();
			boolean recaptchaSucess = (Boolean) responseBody.get("success");
			if (!recaptchaSucess) {
				List<String> errorCodes = (List) responseBody.get("error-codes");
				String errorMessage = errorCodes.stream().map(s -> RecaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
						.collect(Collectors.joining(", "));

				Map<String, Object> response = new HashMap<>();
				response.put("errorType", "ReCaptchaError");
				response.put("message", errorMessage);

				return ResponseEntity.badRequest().body(response);
			}
		} else if (recaptchaResponse.getStatusCode().is5xxServerError()) {
			Map<String, Object> response = new HashMap<>();
			response.put("errorType", "ReCaptchaError");
			response.put("message", "Internal Server Error");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
		return recaptchaResponse;

	}
}