package ae.rakbank.webapply.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ae.rakbank.webapply.services.RecaptchaService;

@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/api/v1")
public class RecaptchaController {

	private static final Logger logger = LoggerFactory.getLogger(RecaptchaController.class);

	@Autowired
	RecaptchaService captchaService;

	@PostMapping("/recaptcha/verify")
	public ResponseEntity<?> verify(@RequestBody Map<String, String> payload, HttpServletRequest request) {
		logger.info("begin verify recaptcha method");
		logger.debug("payload: " + payload);
		String recaptchaResponse = payload.get("recaptchaToken");
		String ip = request.getRemoteAddr();
		String captchaVerifyMessage = captchaService.verifyRecaptcha(ip, recaptchaResponse);

		if (StringUtils.isNotEmpty(captchaVerifyMessage)) {
			Map<String, Object> response = new HashMap<>();
			response.put("message", captchaVerifyMessage);
			return ResponseEntity.badRequest().body(response);
		}

		return ResponseEntity.ok().build();
	}

}