package ae.rakbank.webapply.controllers;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

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

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class RecaptchaController {

	private static final Logger logger = LoggerFactory.getLogger(RecaptchaController.class);

	@Autowired
	RecaptchaService captchaService;

	@PostMapping("/recaptcha/siteverify")
	public ResponseEntity<?> verify(@RequestBody Map<String, String> payload, HttpServletRequest request) {
		logger.info("begin verify reCAPTCHA method");
		logger.debug("payload: " + payload);
		String reCaptchaResponse = payload.get("recaptchaToken");
		String ip = request.getRemoteAddr();
		return captchaService.invokeReCaptchaEndpoint(ip, reCaptchaResponse);
	}
}
