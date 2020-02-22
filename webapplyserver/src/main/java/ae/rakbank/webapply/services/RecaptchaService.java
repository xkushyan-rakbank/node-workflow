package ae.rakbank.webapply.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import ae.rakbank.webapply.exception.ApiException;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.RecaptchaUtil;
import ae.rakbank.webapply.util.FileUtil;

import static ae.rakbank.webapply.constants.AuthConstants.RECAPTCHA_TOKEN_REQUEST_KEY;

@Service
@RequiredArgsConstructor
public class RecaptchaService {
	private static final Logger logger = LoggerFactory.getLogger(RecaptchaService.class);

	private final FileUtil fileUtil;
	private final RestTemplateBuilder restTemplateBuilder;

	private String recaptchaSecret;
	private String recaptchaEndpoint;

	@PostConstruct
	public void init() {
		JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
		recaptchaSecret = appConfigJSON.get("OtherConfigs").get(EnvUtil.getEnv()).get("ReCaptchaSecret").asText();
		recaptchaEndpoint = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("ReCaptchaUrl").asText()
				+ appConfigJSON.get("ReCaptchaURIs").get("siteVerifyUri").asText();
	}

	public void validateReCaptcha(@RequestBody JsonNode requestBodyJSON, HttpServletRequest httpRequest) {

		if(EnvUtil.isRecaptchaEnable() && !requestBodyJSON.has(RECAPTCHA_TOKEN_REQUEST_KEY)) {
			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "reCAPTCHA Token is required",
					"recaptchaToken is required");
			throw new ApiException(error, HttpStatus.BAD_REQUEST);
		} else if (!EnvUtil.isRecaptchaEnable()) {
			((ObjectNode) requestBodyJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
			return;
		}

		logger.info("Validate reCAPTCHA before saving applicant info.");

		String recaptchaInRequest = requestBodyJSON.get(RECAPTCHA_TOKEN_REQUEST_KEY).asText();
		String ip = httpRequest.getRemoteAddr();

		verifyRecaptcha(ip, recaptchaInRequest);
		((ObjectNode) requestBodyJSON).remove(RECAPTCHA_TOKEN_REQUEST_KEY);
	}

	private void verifyRecaptcha(String ip, String recaptchaToken) {
		ResponseEntity<Map> recaptchaResponse = invokeReCaptchaEndpoint(ip, recaptchaToken);
		validateReCaptchaResponse(ip, recaptchaResponse);
	}

	private ResponseEntity<Map> invokeReCaptchaEndpoint(String ip, String recaptchaToken) {
		ResponseEntity<Map> recaptchaResponse;
		Map<String, String> recaptchaMapRequest = new HashMap<>();
		recaptchaMapRequest.put("secret", recaptchaSecret);
		recaptchaMapRequest.put("response", recaptchaToken);
		recaptchaMapRequest.put("remoteip", ip);
		logger.debug("Request body for recaptcha: {}", recaptchaMapRequest);

		String url = recaptchaEndpoint + "?secret={secret}&response={response}&remoteip={remoteip}";
		try {
			logger.info(String.format("Endpoint=[%s], Request=[%s]", url, recaptchaMapRequest));

			recaptchaResponse = restTemplateBuilder.build().postForEntity(url, recaptchaMapRequest, Map.class, recaptchaMapRequest);

			logger.info(String.format("Endpoint=[%s], HttpStatus=[%s], verified=[%s]", url,
					recaptchaResponse.getStatusCodeValue(), recaptchaResponse.getBody().get("success")));

		} catch (HttpClientErrorException e) {
			logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
					e.getRawStatusCode(), e.getResponseBodyAsString()), e);
			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getResponseBodyAsString(),
					e.getResponseBodyAsString(), e);
			throw new ApiException(e, error, null, HttpStatus.BAD_REQUEST);
		} catch (HttpServerErrorException e) {
			logger.error(String.format("Endpoint=[%s], HttpStatus=[%s], response=%s", url,
					e.getRawStatusCode(), e.getResponseBodyAsString()), e);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error",
					e.getResponseBodyAsString(), e);
			throw new ApiException(e, error, null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return recaptchaResponse;
	}

	private void validateReCaptchaResponse(String ip, ResponseEntity<Map> recaptchaResponse) {
		Map<String, Object> responseBody = recaptchaResponse.getBody();
		boolean recaptchaTokenVerified = (Boolean) responseBody.get("success");

		logger.info(String.format("reCAPTCHA Response: IP=[%s] HttpStatus=[%s], tokenVerified=%s, response=[%s]", ip,
				recaptchaResponse.getStatusCodeValue(), recaptchaTokenVerified, recaptchaResponse.getBody()));

		if (!recaptchaTokenVerified) {
			logger.error("ReCaptcha was not verified successfully, the verify result is: "
					+ responseBody.get("error-codes").toString());
			List<String> errorCodes = (List) responseBody.get("error-codes");
			String errorMessage = errorCodes.stream().map(s -> RecaptchaUtil.RECAPTCHA_ERROR_CODE.get(s))
					.collect(Collectors.joining(", "));
			errorMessage = StringUtils.defaultIfBlank(errorMessage, "The validation of reCaptcha is not succeed");

			ApiError error = new ApiError(HttpStatus.UNPROCESSABLE_ENTITY, "The validation of reCaptcha is not succeed",
					errorMessage);
			throw new ApiException(error, HttpStatus.UNPROCESSABLE_ENTITY);
		}
	}
}
