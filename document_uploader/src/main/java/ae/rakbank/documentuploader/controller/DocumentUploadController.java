package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.deh.DehClient;
import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.services.ProspectValidatorService;
import ae.rakbank.documentuploader.services.auth.AuthorizationService;
import ae.rakbank.documentuploader.services.DocumentUploadService;
import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.util.EnvUtil;
import ae.rakbank.documentuploader.util.FileUtil;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import java.time.LocalDateTime;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import static ae.rakbank.documentuploader.constants.AuthConstants.COUNT_EXCEEDED;
import static ae.rakbank.documentuploader.constants.AuthConstants.UPDATE_FAILED;
import static ae.rakbank.documentuploader.constants.AuthConstants.TOTAL_UPLOADNUM_OF_DOCS_;
import static ae.rakbank.documentuploader.constants.AuthConstants.MAX_NO_OF_DOCS_;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class DocumentUploadController {

    @Value("${build.date}")
    private String buildDate;
    @Value("${app.name}")
    private String appName;
    
    private final FileUtil fileUtil;
    private final DocumentUploadService docUploadService;
    private final AuthorizationService authorizationService;
    private final ProspectValidatorService prospectValidatorService;
    private final DehClient dehClient;
    
	  
    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
    	JsonNode docUploadConfig = fileUtil.getAppConfigJSON();
        dehURIs = docUploadConfig.get("DehURIs");
        dehBaseUrl = docUploadConfig.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }
    
    @GetMapping(value = "/health", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> health() {
        log.info("get /health method request");
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("buildDate", buildDate);
        if (!EnvUtil.isProd()) {
            response.put("project", appName);
        }
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/banks/RAK/prospects/{prospectId}/documents",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> handleUploadDocument(@RequestHeader String authorization,
                                                       @RequestParam("file") MultipartFile file,
                                                       @RequestParam("fileInfo") String fileInfo,
                                                       @PathVariable String prospectId,HttpServletRequest  request) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);
        prospectValidatorService.validate(jwtToken, prospectId);
        //getProspectById and compare the number of documents uploaded and the max limit
        //IF limit exceeds then throw error
        int totalUploadedDocCount = 0;
		JsonNode responseBody = getDocumentDetailsByProspectID(prospectId, request, jwtToken, fileInfo);
		if (checkCountExceeds(prospectId, request)) {
			totalUploadedDocCount = (Integer) request.getSession().getAttribute(TOTAL_UPLOADNUM_OF_DOCS_ + prospectId);
			return sendDocCountErrorResponse(prospectId, totalUploadedDocCount);
		}
        
        ResponseEntity<Object> response = docUploadService.processUploadRequest(file, fileInfo, prospectId);
		if (response.getStatusCode().is2xxSuccessful()) {
			totalUploadedDocCount = (Integer) request.getSession()
					.getAttribute(TOTAL_UPLOADNUM_OF_DOCS_ + prospectId);
				return updateCountForDocument(file, fileInfo, prospectId, request, jwtToken, responseBody,
						totalUploadedDocCount, response);
		}
		
        return response;
    }

	@PutMapping(value = "/banks/RAK/prospects/{prospectId}/documents",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> handleReUploadDocument(@RequestHeader String authorization,
                                                         @RequestParam("file") MultipartFile file,
                                                         @RequestParam(name = "fileInfo", required = false) String fileInfo,
                                                         @PathVariable String prospectId,HttpServletRequest  request) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);
        prospectValidatorService.validate(jwtToken, prospectId);

        if (StringUtils.isBlank(fileInfo)) {
            log.error(String.format("The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s",
                    prospectId, StringUtils.length(fileInfo)));
            ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, "The 'fileInfo' parameter must not be null or empty",
                    String.format("The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s",
                            prospectId, StringUtils.length(fileInfo)));

            throw new ApiException(apiError, HttpStatus.BAD_REQUEST);
        }
        
		// getProspectById and compare the number of documents uploaded and the
		// max limit
		// IF limit exceeds then throw error
		int totalUploadedDocCount = 0;
		JsonNode responseBody = getDocumentDetailsByProspectID(prospectId, request, jwtToken, fileInfo);
		if (checkCountExceeds(prospectId, request)) {
			totalUploadedDocCount = (Integer) request.getSession().getAttribute(TOTAL_UPLOADNUM_OF_DOCS_ + prospectId);
			return sendDocCountErrorResponse(prospectId, totalUploadedDocCount);
		}
        ResponseEntity<Object> response = docUploadService.processUploadRequest(file, fileInfo, prospectId);
		if (response.getStatusCode().is2xxSuccessful()) {
			totalUploadedDocCount = (Integer) request.getSession()
					.getAttribute(TOTAL_UPLOADNUM_OF_DOCS_ + prospectId);
				return updateCountForDocument(file, fileInfo, prospectId, request, jwtToken, responseBody,
						totalUploadedDocCount, response);
		}
		
        return response;
    }

    @GetMapping("/banks/RAK/prospects/{prospectId}/documents/{documentKey}")
    public ResponseEntity<byte[]> downloadFile(@RequestHeader String authorization,
                                               @SuppressWarnings("unused") @PathVariable String prospectId,
                                               @PathVariable String documentKey) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);
        prospectValidatorService.validate(jwtToken, prospectId);

        final FileDto file = docUploadService.findOneByDocumentKey(documentKey);
        return ResponseEntity.ok().headers(configureHttpHeadersForFile(file)).body(file.getContent());
    }

    private HttpHeaders configureHttpHeadersForFile(FileDto file) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(HttpHeaders.CONTENT_TYPE, file.getContentType());
        responseHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName());
        return responseHeaders;
    }

    private String getTokenFromAuthorizationHeader(String authorizationString) {
        return authorizationString.substring(7); // removes the "Bearer " prefix.
    }
    
	private ResponseEntity<Object> sendDocCountErrorResponse(String prospectId, int totalUploadedDocCount) {
		log.info("The max number of documents uploads has been reached for prospect = "+prospectId+".Throwing Error");
		 ObjectMapper objectMapper = new ObjectMapper();
		 ObjectNode responseJSON = objectMapper.createObjectNode();
		 responseJSON.put("docUploadedCount", totalUploadedDocCount);
		 responseJSON.put("statusCode",(HttpStatus.FORBIDDEN).value());
		 responseJSON.put("errorType", COUNT_EXCEEDED);
		 return new ResponseEntity<>(responseJSON, new HttpHeaders(), HttpStatus.FORBIDDEN);
	}

	private ResponseEntity<Object> updateCountForDocument(MultipartFile file, String fileInfo, String prospectId,
			HttpServletRequest request, String jwtToken, JsonNode responseBody, int totalUploadedDocCount,
			ResponseEntity<Object> response) {
		try{
			//Getting the latest value from session for the prospect.
			if(request.getSession().getAttribute(TOTAL_UPLOADNUM_OF_DOCS_+prospectId) != null){
				totalUploadedDocCount = (Integer)request.getSession().getAttribute(TOTAL_UPLOADNUM_OF_DOCS_+prospectId);
			}
			totalUploadedDocCount = totalUploadedDocCount +1;
			responseBody = docUploadService.getUpdateProspectBody(responseBody,  file,  fileInfo,String.valueOf(totalUploadedDocCount) ,  ((JsonNode)response.getBody()).get("fileName").asText());
			return updateProspect(prospectId, jwtToken, ((JsonNode)response.getBody()).get("fileName").asText(), request,responseBody,totalUploadedDocCount);
		}catch (Exception ex) {
			log.error("Exception while setting the number of documents." + ex);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, UPDATE_FAILED, ex.getMessage(), ex);
            throw new ApiException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	private ResponseEntity<Object> updateProspect(String prospectId, String jwtToken, String fileName, HttpServletRequest  request,JsonNode responseBody,int totalUploadedDocCount) {
		 ObjectMapper objectMapper = new ObjectMapper();
		 ObjectNode responseJSON = objectMapper.createObjectNode();
		 responseJSON.put("fileName", fileName);
		 
			ResponseEntity<Object> updateResponse = updateSMEProspect(jwtToken, responseBody, prospectId);
			 if(updateResponse.getStatusCode().is2xxSuccessful()){
				 request.getSession().setAttribute(TOTAL_UPLOADNUM_OF_DOCS_+prospectId,totalUploadedDocCount);
				 log.info("Set doc uploaded count as ::"+totalUploadedDocCount);
				 responseJSON.put("docUploadedCount", totalUploadedDocCount);
			 } else {
		         throw new ApiException(UPDATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
			 }
		 return new ResponseEntity<>(responseJSON, new HttpHeaders(), HttpStatus.OK);
	}
	

    private JsonNode getProspectDetails(String jwtToken, String prospectId) {
		// TODO Auto-generated method stub
    	log.info(
                String.format("getProspectById() method args, prospectId=[%s]", prospectId));
    	
        JwtPayload jwtPayload = authorizationService.getPrincipal(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand("sme", prospectId);
        ResponseEntity<Object> prospectDetails = dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, null,
                    "getProspectById()", MediaType.APPLICATION_JSON, jwtPayload);
        JsonNode responseBody = (JsonNode) prospectDetails.getBody();
        return responseBody;
        
	}
    
	public ResponseEntity<Object> updateSMEProspect(String jwtToken, JsonNode jsonNode, String prospectId) {
		log.info(String.format("updateSMEProspect() method args, prospectId=[%s]", prospectId));
		JwtPayload jwtPayload = authorizationService.getPrincipal(jwtToken);

		String url = dehBaseUrl + dehURIs.get("updateProspectUri").asText();
		UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand("sme", prospectId);

		return dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.PUT, jsonNode, "updateSMEProspect()",
				MediaType.APPLICATION_JSON, jwtPayload);
	}
	
	
	private JsonNode getProspectDocuments(String jwtToken, String prospectId) {
		log.info(String.format("getProspectDocuments() method args, prospectId=[%s]", prospectId));
		JwtPayload jwtPayload = authorizationService.getPrincipal(jwtToken);

		String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
		UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

		ResponseEntity<Object> prospectDetails =  dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, null, "getProspectDocuments()",
				MediaType.APPLICATION_JSON, jwtPayload);
		 JsonNode responseBody = (JsonNode) prospectDetails.getBody();
		return responseBody;
	}
	
	private JsonNode getDocumentDetailsByProspectID(String prospectId, HttpServletRequest request, String jwtToken, String fileInfo){
		log.info(
                String.format("getDocumentDetailsByProspectID() method args, prospectId=[%s]", prospectId));
		try {
			JsonNode prospectDocuments = null;
			JsonNode responseBody = getProspectDetails(jwtToken, prospectId);
			docUploadService.setDocumentCountInSession(responseBody, prospectId, request);
			if ((Integer) request.getSession().getAttribute(MAX_NO_OF_DOCS_ + prospectId) == 0) {
				//This is to get the count from getProspectDocumentsAPI since getProspectAPI returned none
				log.info("No value for document count from getProspectByID ::" + prospectId);
				prospectDocuments = getProspectDocuments(jwtToken, prospectId);
				docUploadService.setCountFromGetDocuments(prospectDocuments, prospectId, request,true);
				prospectDocuments = docUploadService.setDocumentKeyinBody(prospectDocuments, fileInfo);
				((ObjectNode) responseBody).set("documents", prospectDocuments);
			}
			return responseBody;
		} catch (Exception ex) {
			log.error("Exception while validating the number of documents." + ex);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR,
					"Exception while validating the number of documents.", ex.getMessage(), ex);
			throw new ApiException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private boolean checkCountExceeds(String prospectId, HttpServletRequest request)  {
		int maxDocCount = 0;
		int totalUploadedDocCount = 0;
		try {
			maxDocCount = (Integer) request.getSession().getAttribute(MAX_NO_OF_DOCS_ + prospectId);
			totalUploadedDocCount = (Integer) request.getSession().getAttribute(TOTAL_UPLOADNUM_OF_DOCS_ + prospectId);
			log.info("maxDocUploadCount ={},docUploadedCount={}", maxDocCount, totalUploadedDocCount);
			if (maxDocCount != 0 && totalUploadedDocCount >= maxDocCount) {
				log.info("Total number of documents  exceeded for prospectID :" + prospectId);
				return true;
			} else if (maxDocCount == 0) {
				log.error("Max Count is zero for prospect " + prospectId);
				throw new Exception("Max Count is zero");
			} else {
				log.info("Total number of documents not exceeded for prospectID :" + prospectId);
				return false;
			}
		} catch (Exception ex) {
			log.error("Exception while checking the count exceeds." + ex);
			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR,
					"Exception while checking the count exceeds..", ex.getMessage(), ex);
			throw new ApiException(error, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
    
}
