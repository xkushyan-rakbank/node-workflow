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
    private final ServletContext servletContext;
    
	  
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
                                                       @PathVariable String prospectId) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);
        prospectValidatorService.validate(jwtToken, prospectId);
        //getProspectById and compare the number of documents uploaded and the max limit
        //IF limit exceeds then throw error
        JsonNode responseBody = null;
        int maxDocCount = 0;
		int totalUploadedDocCount = 0;
        try{
        	
        	if(servletContext.getAttribute("MAX_NO_OF_DOCS_"+prospectId) != null && servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId) != null){
        	 maxDocCount = (Integer)servletContext.getAttribute("MAX_NO_OF_DOCS_"+prospectId);
           	 totalUploadedDocCount = (Integer)servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId);
           	if(totalUploadedDocCount < maxDocCount){
	    		log.info("The max number of documents uploads not reached.");
	    	}else {
	    		log.info("The max number of documents uploads has been reached.");
	    		 throw new ApiException("The max number of documents uploads has been reached.", HttpStatus.FORBIDDEN);
	    	}
        	} else{
        		log.info("No values in session for doc count. Getting from DEH");
        		responseBody = getProspectDocuments(jwtToken, prospectId);
                validateNumberOfDocuments(responseBody, prospectId);
        	}
        	 
        } catch(Exception ex){
        	log.error("Exception while validating the number of documents."+ex);
        }
        
        ResponseEntity<Object> response = docUploadService.processUploadRequest(file, fileInfo, prospectId);
        try{
        	 if(response.getStatusCode().is2xxSuccessful()){
             	if(servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId) != null){
             		totalUploadedDocCount = (Integer)servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId);
             		servletContext.setAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId,totalUploadedDocCount+1);
             	}
             	
             }
        }catch(Exception ex){
        	log.error("Exception while setting the number of documents."+ex);
        }
       
        return response;
    }

	private void validateNumberOfDocuments(JsonNode responseBody,String prospectId) {
		int maxDocUploadCount = 0;
		 int docUploadedCount = 0;
		 boolean countReceived =false;
		if(responseBody != null ){
			JsonNode documents = responseBody.get("documents");
			log.info("documents from DEH::" + documents);
		    if(documents != null){
		    	JsonNode companyDocuments= documents.get("companyDocuments");
		    	if(companyDocuments !=null && companyDocuments.get(0) !=null){
		    		if(companyDocuments.isArray()){
		        		for(JsonNode objNode : companyDocuments){
		        			try{
		        				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
		            			docUploadedCount = Integer.parseInt(objNode.get(0).get("DocumentUplTotalCnt").asText());
		            			countReceived = true;
		            			break;
		            		} catch(Exception ex){//any null values or other values continue
		            				continue;
		            		}
		        			
		        		}
		        	}
		    	}
		    	if(!countReceived){
		    		JsonNode stakeholdersDocuments= documents.get("stakeholdersDocuments");
		    		 Iterator<Map.Entry<String,JsonNode>> fieldsIterator = stakeholdersDocuments.fields();
		             while (fieldsIterator.hasNext()) {

		                 Map.Entry<String,JsonNode> field = fieldsIterator.next();
		                 if(field.getValue() !=null){
		                 	JsonNode stakeDocuments= field.getValue().get("documents");
		                 	if(stakeDocuments != null && stakeDocuments.isArray()){
		                 		for(JsonNode objNode : stakeDocuments){
		                 			try{
		                				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
		                    			docUploadedCount = Integer.parseInt(objNode.get(0).get("DocumentUplTotalCnt").asText());
		                    			countReceived = true;
		                    			break;
		                    		} catch(Exception ex){//any null values or other values continue
		                    				continue;
		                    		}
		                 		}
		                 	}
		                 }
		                 if(countReceived){
		                	 break;
		                 }
		             }
		    	}
		    	
		    	if(!countReceived){
		    		JsonNode otherDocuments= documents.get("otherDocuments");
		        	if(otherDocuments !=null && otherDocuments.isArray()){
		            		for(JsonNode objNode : otherDocuments){
		            			try{
		            				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
		                			docUploadedCount = Integer.parseInt(objNode.get(0).get("DocumentUplTotalCnt").asText());
		                			countReceived = true;
		                			break;
		                		} catch(Exception ex){//any null values or other values continue
		                				continue;
		                		}
		            			
		            		}
		        	}
		    	}
		    	if(docUploadedCount < maxDocUploadCount){
		    		log.info("The max number of documents uploads not reached."); 
		    		servletContext.setAttribute("MAX_NO_OF_DOCS_"+prospectId,maxDocUploadCount);
		            servletContext.setAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId,docUploadedCount);
		    	}else {
		    		log.info("The max number of documents uploads has been reached.");
		    		 throw new ApiException("The max number of documents uploads has been reached.", HttpStatus.FORBIDDEN);
		    	}
		    }
		} else {
			log.info("getProspect Response is Null");
		}
	}

    private JsonNode getProspectDocuments(String jwtToken, String prospectId) {
		// TODO Auto-generated method stub
    	log.info("Begin getProspectById() method");
        log.debug(
                String.format("getProspectById() method args, prospectId=[%s]", prospectId));
        
        JwtPayload jwtPayload = authorizationService.getPrincipal(jwtToken);

        String url = dehBaseUrl + dehURIs.get("getProspectUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand("sme", prospectId);
        ResponseEntity<Object> prospectDocuments = dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, null,
                    "getProspectById()", MediaType.APPLICATION_JSON, jwtPayload);
        
        
        JsonNode responseBody = (JsonNode) prospectDocuments.getBody();
        log.info("Phone Number from getProsectID"+ responseBody.get("applicantInfo").get("mobileNo").asText());
        return responseBody;
        
	}
    

	@PutMapping(value = "/banks/RAK/prospects/{prospectId}/documents",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> handleReUploadDocument(@RequestHeader String authorization,
                                                         @RequestParam("file") MultipartFile file,
                                                         @RequestParam(name = "fileInfo", required = false) String fileInfo,
                                                         @PathVariable String prospectId) {
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
        
        //getProspectById and compare the number of documents uploaded and the max limit
        //IF limit exceeds then throw error
        JsonNode responseBody = null;
        int maxDocCount = 0;
		int totalUploadedDocCount = 0;
        try{
        	
        	if(servletContext.getAttribute("MAX_NO_OF_DOCS_"+prospectId) != null && servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId) != null){
        	 maxDocCount = (Integer)servletContext.getAttribute("MAX_NO_OF_DOCS_"+prospectId);
           	 totalUploadedDocCount = (Integer)servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId);
           	if(totalUploadedDocCount < maxDocCount){
	    		log.info("The max number of documents uploads not reached.");
	    	}else {
	    		log.info("The max number of documents uploads has been reached.");
	    		 throw new ApiException("The max number of documents uploads has been reached.", HttpStatus.FORBIDDEN);
	    	}
        	} else{
        		log.info("No values in session for doc count. Getting from DEH");
        		responseBody = getProspectDocuments(jwtToken, prospectId);
                validateNumberOfDocuments(responseBody, prospectId);
        	}
        	 
        } catch(Exception ex){
        	log.error("Exception while validating the number of documents."+ex);
        }
        
        
        ResponseEntity<Object> response = docUploadService.processUploadRequest(file, fileInfo, prospectId);
        try{
        	 if(response.getStatusCode().is2xxSuccessful()){
             	if(servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId) != null){
             		totalUploadedDocCount = (Integer)servletContext.getAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId);
             		servletContext.setAttribute("TOTAL_UPLOADNUM_OF_DOCS_"+prospectId,totalUploadedDocCount+1);
             	}
             	
             }
        }catch(Exception ex){
        	log.error("Exception while setting the number of documents."+ex);
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
}
