package ae.rakbank.webapply.controller;

import java.util.Objects;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.webapply.client.KycClient;
import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.ProspectValidatorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class KycController {

	private final KycClient kycClient;
	private final ProspectValidatorService prospectValidatorService;

	@PreAuthorize("isAuthenticated()")
	@PostMapping(value = "/products/{product}/kyc-transactions", produces = "application/json", consumes = "application/json")
	public ResponseEntity<Object> initKycTransaction(@AuthenticationPrincipal JwtPayload jwtPayload,
			@RequestBody JsonNode jsonNode, @PathVariable String product) {

		log.info("Begin initKycTransaction() method for prospectId: {}", jwtPayload.getProspectId());

		if (Objects.isNull(jsonNode.get("prospectId")) || Objects.isNull(jsonNode.get("prospectId").asText())) {
			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "ProspectId is required", "ProspectId is required");
			throw new ApiException(error, HttpStatus.BAD_REQUEST);
		}

		String prospectId = jsonNode.get("prospectId").asText();
		if (Objects.nonNull(jwtPayload)) {
			prospectValidatorService.checkOwnerProspectId(prospectId, jwtPayload);
		}
		
		// Create KYC App Token
    	JsonNode kycAppTokenResponse = kycClient.generateAppToken();

		JsonNode response = kycClient.initKycTransaction(kycAppTokenResponse.get("accessToken").asText(), jwtPayload.getProspectId(), product);

		log.info("End initKycTransaction() method for prospectId: {}", jwtPayload.getProspectId());
		return new ResponseEntity<>(response, new HttpHeaders(), HttpStatus.CREATED);

	}

}
