package ae.rakbank.webapply.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import ae.rakbank.webapply.commons.RecaptchaUtil;

@Service
public class RecaptchaService {

	private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);

	@Value("${google.recaptcha.secret}")
	String recaptchaSecret;

	@Value("${google.recaptcha.endpoint}")
	String recaptchaEndpoint;

	@Autowired
	RestTemplateBuilder restTemplateBuilder;

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String verifyRecaptcha(String ip, String recaptchaResponse) {
		Map<String, String> body = new HashMap<>();
		body.put("secret", recaptchaSecret);
		body.put("response", recaptchaResponse);
		body.put("remoteip", ip);
		logger.debug("Request body for recaptcha: {}", body);
		ResponseEntity<Map> recaptchaResponseEntity = restTemplateBuilder.build().postForEntity(
				recaptchaEndpoint + "?secret={secret}&response={response}&remoteip={remoteip}", body, Map.class, body);
		logger.debug("Response from recaptcha: {}", recaptchaResponseEntity);
		Map<String, Object> responseBody = recaptchaResponseEntity.getBody();
		boolean recaptchaSucess = (Boolean) responseBody.get("success");
		if (!recaptchaSucess) {
			List<String> errorCodes = (List) responseBody.get("error-codes");
			String errorMessage = errorCodes.stream().map(s -> RecaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
					.collect(Collectors.joining(", "));
			return errorMessage;
		} else {
			return StringUtils.EMPTY;
		}
	}
}