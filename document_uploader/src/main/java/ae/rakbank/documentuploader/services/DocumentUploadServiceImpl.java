package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.exception.DocumentUploadException;
import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.s3.S3FileUploader;
import ae.rakbank.documentuploader.util.EnvUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.NullNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import static ae.rakbank.documentuploader.constants.AuthConstants.MAX_NO_OF_DOCS_;
import static ae.rakbank.documentuploader.constants.AuthConstants.TOTAL_UPLOADNUM_OF_DOCS_;
import static ae.rakbank.documentuploader.constants.AuthConstants.UPDATE_FAILED;
import static ae.rakbank.documentuploader.constants.DocumentTypes.ALLOWED_DOCUMENT_TYPES;

@Slf4j
@Service
@RequiredArgsConstructor
public class DocumentUploadServiceImpl implements DocumentUploadService {

    private final S3FileUploader s3FileUploader;
    private final FileValidatorService fileValidatorService;

    @Override
    public FileDto findOneByDocumentKey(String documentKey) {
        return s3FileUploader.downloadFile(documentKey)
                .orElseThrow(() -> new AmazonS3FileNotFoundException(String.format("Document with key %s not found", documentKey)));
    }

    @Override
    public ResponseEntity<Object> processUploadRequest(MultipartFile file, String fileInfo, String prospectId) {
        if (file == null) {
            throw new ApiException("the file should not be null", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        log.info("[Begin] processUploadRequest() method, prospectId={}, originalFilename={}, filesize={}, fileInfo= {}",
                prospectId, file.getOriginalFilename(), file.getSize(), fileInfo);

        fileValidatorService.validate(file);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode fileInfoJSON;
        try {
            fileInfoJSON = objectMapper.readValue(fileInfo, JsonNode.class);
        } catch (Exception e) {
            log.error("Unable to parse fileInfo string into JsonNode.", e);
            ApiError error =
                    new ApiError(HttpStatus.BAD_REQUEST, "fileInfo is not valid JSON string", e.getMessage(), e);

            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
        validateFileInfo(fileInfoJSON);

        return saveUploadedFile(file, fileInfoJSON, prospectId);
    }

    private void validateFileInfo(JsonNode fileInfoJSON) {
        if (!ALLOWED_DOCUMENT_TYPES.contains(fileInfoJSON.get("documentType").asText())) {
            log.error("The document type is not allowed");
            throw new ApiException("The document type is not allowed", HttpStatus.BAD_REQUEST);
        }
    }

    private ResponseEntity<Object> saveUploadedFile(MultipartFile file, JsonNode fileInfo, String prospectId) {
        log.info("[Begin] saveUploadedFile() method, prospectId = {}, originalFilename = {}, filesize = {}",
                prospectId, file.getOriginalFilename(), file.getSize());

        String fileName;
        try {
            fileName = store(file, fileInfo, prospectId);

        } catch (DocumentUploadException e) {
            log.error(String.format(
                    "[End] saveUploadedFile() method, UPLOAD FAILED for prospectId=%s, originalFilename=[%s], filesize=%s",
                    prospectId, file.getOriginalFilename(), file.getSize()));

            ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getMessage(), e.getMessage(), e);
            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
        log.info("[End] saveUploadedFile() method, UPLOAD SUCCESS for prospectId = {}, originalFilename = {}, filesize = {}",
                prospectId, file.getOriginalFilename(), file.getSize());

        HttpHeaders headers = new HttpHeaders();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode responseJSON = objectMapper.createObjectNode();
        responseJSON.put("fileName", fileName);
        return new ResponseEntity<>(responseJSON, headers, HttpStatus.OK);
    }

    private String store(MultipartFile file, JsonNode fileInfo, String prospectId) {
        Date date = new Date();
        long time = date.getTime();
        String originalFilename = prospectId + "_" + sanitizeFilename(fileInfo.get("documentType").asText()) + "_" + time;
        String documentKey = originalFilename + "." + FilenameUtils.getExtension(file.getOriginalFilename());

        if (file.isEmpty()) {
            throw new DocumentUploadException("Failed to store empty file " + originalFilename);
        }
        if (originalFilename.contains("..")) {
            // This is a security check
            throw new DocumentUploadException(
                    "Cannot store file with relative path outside current directory " + originalFilename);
        }
        try (InputStream inputStream = file.getInputStream()) {
            log.info("Initialising uploads dir: " + EnvUtil.getUploadDir());
            Path uploadsDir = Paths.get(EnvUtil.getUploadDir());

            Files.copy(inputStream, uploadsDir.resolve(documentKey), StandardCopyOption.REPLACE_EXISTING);
            log.info(String.format("ProspectId=%s, File [%s] created/replaced.", prospectId, uploadsDir.resolve(documentKey)));

            return documentKey;
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return "";
    }

    private String sanitizeFilename(String fileName) {
        // Unix limit is 255 for a fileName, but let's make it 100:
        int maxLength = Math.min(fileName.length(), 100);
        return fileName
                .replaceAll("[:\\\\/*?|<>]", "_")
                .substring(0, maxLength);
    }
    
    
    public JsonNode getUpdateProspectBody(JsonNode responseBody, MultipartFile file, String fileInfo, String docUploadedCount, String fileName){
    	log.info("Inside updateSMEProspectBody");
    	ObjectMapper objectMapper = new ObjectMapper();
        JsonNode fileInfoJSON;
        try {
            fileInfoJSON = objectMapper.readValue(fileInfo, JsonNode.class);
        } catch (Exception e) {
            log.error("Unable to parse fileInfo string into JsonNode.", e);
            ApiError error =
                    new ApiError(HttpStatus.BAD_REQUEST, "fileInfo is not valid JSON string", e.getMessage(), e);

            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
    	if(fileInfoJSON.get("documentKey") != null ){
    		log.info("File Documents Document Key ::"+fileInfoJSON.get("documentKey").asText());
    	}
    	boolean isUpdated = false;
    	if(responseBody != null ){
    		JsonNode documents = responseBody.get("documents");
    		if(documents != null){
    			log.info("documents is not null");
    			JsonNode companyDocuments= documents.get("companyDocuments");
    			if(companyDocuments !=null && companyDocuments.get(0) !=null){
    				log.info("companyDocuments is not null");
    				if(companyDocuments.isArray()){
    					for(JsonNode objNode : companyDocuments){
    						if(objNode != null){
        						((ObjectNode)objNode).put("DocumentUplTotalCnt", docUploadedCount);
        						log.info("Company Documents Document Key ::"+objNode.get("documentKey").asText());
        						if(fileInfoJSON.get("documentType").asText().equalsIgnoreCase(objNode.get("documentType").asText()) && fileInfoJSON.get("documentKey").asText().equalsIgnoreCase(objNode.get("documentKey").asText())){
        							((ObjectNode)objNode).put("fileName", fileName);
        							((ObjectNode)objNode).put("fileSize", file.getSize());
        							((ObjectNode)objNode).put("fileDescription", file.getOriginalFilename());
        							((ObjectNode)objNode).put("fileFormat", file.getContentType());
        							((ObjectNode)objNode).put("uploadStatus", "Uploaded");
        							isUpdated = true;
        							log.info("company document updated with the documentdetails");
        							break;
        						}else{
        							log.info("Document key not matching.");
        						}
    						}
    						
    					}
    				}
    			}
    			
    			if(!isUpdated){
    				log.info("Document not updated in the body");
    				JsonNode stakeholdersDocuments= documents.get("stakeholdersDocuments");
    				if(stakeholdersDocuments !=null){
    					log.info("stakeholdersDocuments is not null");
    					 Iterator<Map.Entry<String,JsonNode>> fieldsIterator = stakeholdersDocuments.fields();
    		             while (fieldsIterator.hasNext()) {
    		            	 log.info("stakeholdersDocuments next entry");
    		            	 Map.Entry<String,JsonNode> field = fieldsIterator.next();
    		            	 if(field.getValue() !=null){
    		            		 JsonNode stakeDocuments= field.getValue().get("documents");
    		            		 if(stakeDocuments != null && stakeDocuments.isArray()){
    		            			 log.info("stakeDocuments entry is not null");
    		            			 for(JsonNode objNode : stakeDocuments){
    		            				 if(objNode != null){
    		            					 log.info("objNode is not null");
        		            				 ((ObjectNode)objNode).put("DocumentUplTotalCnt", docUploadedCount);
        		            				 log.info("Stake Documents Document Key ::"+objNode.get("documentKey").asText());
        		     						if(fileInfoJSON.get("documentType").asText().equalsIgnoreCase(objNode.get("documentType").asText()) && fileInfoJSON.get("documentKey").asText().equalsIgnoreCase(objNode.get("documentKey").asText())){
        		     							log.info("Inside stake document key matching");
        		     							((ObjectNode)objNode).put("fileName", fileName);
        		     							((ObjectNode)objNode).put("fileSize", file.getSize());
        		     							((ObjectNode)objNode).put("fileDescription", file.getOriginalFilename());
        	        							((ObjectNode)objNode).put("fileFormat", file.getContentType());
        		     							((ObjectNode)objNode).put("uploadStatus", "Uploaded");
        		     							isUpdated = true;
        		     							log.info("stakeholder document updated with the documentdetails");
        		     							break;
        		     						}else{
        		     							log.info("stakeholder documentkey not matching.");
        		     						}
    		            				 }
    		            				 
    		            			 }
    		            		 }
    		            	 }
    		             }
    				}
    			}
    			
				if (!isUpdated) {
					log.info("Document not updated in the body");
					if ("Others".equalsIgnoreCase(fileInfoJSON.get("documentType").asText())) {
						JsonNode otherDocuments = documents.get("otherDocuments");
						if (otherDocuments == null) {
							ObjectMapper mapper = new ObjectMapper();
							JsonNode arrayNode = mapper.createArrayNode();
							((ObjectNode) documents).set("otherDocuments", arrayNode);
							otherDocuments = documents.get("otherDocuments");
						}

						if (otherDocuments != null && otherDocuments.isArray()) {
							ObjectNode nodeNew = objectMapper.createObjectNode();
							((ObjectNode) nodeNew).put("DocumentUplTotalCnt", docUploadedCount);
							((ObjectNode) nodeNew).set("DocumentUploadCnt", null);
							((ObjectNode) nodeNew).put("avsCheck", false);
							((ObjectNode) nodeNew).set("avsCheckDt", null);
							((ObjectNode) nodeNew).put("documentKey", fileInfoJSON.get("documentKey").asText());
							((ObjectNode) nodeNew).set("documentTitle", null);
							((ObjectNode) nodeNew).put("documentType", fileInfoJSON.get("documentType").asText());
							((ObjectNode) nodeNew).set("encryptionDetails", null);
							((ObjectNode) nodeNew).set("fileData", null);
							((ObjectNode) nodeNew).put("fileDescription", file.getOriginalFilename());
							((ObjectNode) nodeNew).put("fileFormat", file.getContentType());
							((ObjectNode) nodeNew).put("fileName", fileName);
							((ObjectNode) nodeNew).set("filePath", null);
							((ObjectNode) nodeNew).put("fileSize", file.getSize());
							((ObjectNode) nodeNew).put("isEncrypted", false);
							((ObjectNode) nodeNew).put("required", true);
							((ObjectNode) nodeNew).set("signatoryId", null);
							((ObjectNode) nodeNew).set("signatoryName", null);
							((ObjectNode) nodeNew).set("submittedBy", null);
							((ObjectNode) nodeNew).set("submittedDt", null);
							((ObjectNode) nodeNew).set("updatedBy", null);
							((ObjectNode) nodeNew).set("updatedDt", null);
							((ObjectNode) nodeNew).put("uploadStatus", "Uploaded");
							((ObjectNode) nodeNew).set("url", null);
							((ObjectNode) nodeNew).put("verified", false);
							((ObjectNode) nodeNew).set("verifiedBy", null);
							((ArrayNode) otherDocuments).add(nodeNew);
							isUpdated = true;
							log.info("other document updated with the documentdetails");
						}
					}

				}
    		}
    		if(!isUpdated){
    			log.error("No document to update in the update request body. Throwing Exception");
    			ApiError error =
                        new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, UPDATE_FAILED,"update failed");
                throw new ApiException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    		} else{
    			log.info("Setting the values for actio Type and savetype as save and next");
    			JsonNode applicationInfo = responseBody.get("applicationInfo");
        		((ObjectNode)applicationInfo).put("actionType", "save");
    			((ObjectNode)applicationInfo).put("saveType", "next");
    		}
    		
    		
			
    	}
    	return responseBody;
    }
    
	public void setDocumentCountInSession(JsonNode responseBody,String prospectId,HttpServletRequest  request) {
		log.info(
                String.format("setDocumentCountInSession() method args, prospectId=[%s]", prospectId));
		int maxDocUploadCount = 0;
		 int docUploadedCount = 0;
		 boolean countReceived =false;
		if(responseBody != null ){
			JsonNode documents = responseBody.get("documents");
			log.info("documents from DEH for prospectID - "+prospectId+"::"+ documents);
		    if(documents != null){
		    	JsonNode companyDocuments= documents.get("companyDocuments");
		    	if(companyDocuments !=null && companyDocuments.isArray()){
		        		for(JsonNode objNode : companyDocuments){
		        			try{
		        				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
		            			docUploadedCount = Integer.parseInt(objNode.get("DocumentUplTotalCnt").asText());
		            			countReceived = true;
		            			log.info("Getting count from company Documents, maxDocUploadCount ={},docUploadedCount={}",maxDocUploadCount,docUploadedCount);
		            			break;
		            		} catch(Exception ex){//any null values or other values continue
		            			log.info("Getting count from company Documents any number format exception");
		            				continue;
		            		}
		        			
		        		}
		    	}
		    	
		    	if(!countReceived){
		    		 log.info("company Documents did not find the count for document upload.");
		    		JsonNode otherDocuments= documents.get("otherDocuments");
		        	if(otherDocuments !=null && otherDocuments.isArray()){
		            		for(JsonNode objNode : otherDocuments){
		            			try{
		            				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
		                			docUploadedCount = Integer.parseInt(objNode.get("DocumentUplTotalCnt").asText());
		                			countReceived = true;
		                			log.info("Getting count from other Documents, maxDocUploadCount ={},docUploadedCount={}",maxDocUploadCount,docUploadedCount);
		                			break;
		                		} catch(Exception ex){//any null values or other values continue
		                			log.info("Getting count from other Documents any number format exception");
		                				continue;
		                		}
		            			
		            		}
		        	}
		    	}
		    	
		    	if(!countReceived){
		    		 log.info("Other Documents did not find the count for document upload.");
		    		JsonNode stakeholdersDocuments= documents.get("stakeholdersDocuments");
		    		if(stakeholdersDocuments != null){
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
			                    			log.info("Getting count from stakes Documents, maxDocUploadCount ={},docUploadedCount={}",maxDocUploadCount,docUploadedCount);
			                    			break;
			                    		} catch(Exception ex){//any null values or other values continue
			                    			log.info("Getting count from stake Documents any number format exception");
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
		    		
		    	}
		    }
		} else {
			log.info("getProspect Response is Null");
		}
		request.getSession().setAttribute(MAX_NO_OF_DOCS_+prospectId,maxDocUploadCount);
		request.getSession().setAttribute(TOTAL_UPLOADNUM_OF_DOCS_+prospectId,docUploadedCount);
	}
	
	public void setCountFromGetDocuments(JsonNode responseBody,String prospectId,HttpServletRequest  request) throws Exception{
		log.info(
                String.format("setCountFromGetDocuments() method args, prospectId=[%s]", prospectId));
		int maxDocUploadCount = 0;
		 int docUploadedCount = 0;
		 boolean countReceived =false;
		 if(responseBody != null && responseBody.get("companyDocuments") != null){
			 JsonNode companyDocuments= responseBody.get("companyDocuments");
			 if(companyDocuments !=null && companyDocuments.isArray()){
	        		for(JsonNode objNode : companyDocuments){
	        			try{
	        				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
	            			docUploadedCount = Integer.parseInt(objNode.get("DocumentUplTotalCnt").asText());
	            			countReceived = true;
	            			log.info("Getting count from company Documents, maxDocUploadCount ={},docUploadedCount={}",maxDocUploadCount,docUploadedCount);
	            			break;
	            		} catch(Exception ex){//any null values or other values continue
	            			log.info("Getting count from company Documents any number format exception");
	            				continue;
	            		}
	        			
	        		}
	    	}
			 
		 }
		 
		 if(!countReceived){
    		 log.info("company Documents did not find the count for document upload.");
    		JsonNode otherDocuments= responseBody.get("otherDocuments");
        	if(otherDocuments !=null && otherDocuments.isArray()){
            		for(JsonNode objNode : otherDocuments){
            			try{
            				maxDocUploadCount = Integer.parseInt(objNode.get("DocumentUploadCnt").asText());
                			docUploadedCount = Integer.parseInt(objNode.get("DocumentUplTotalCnt").asText());
                			countReceived = true;
                			log.info("Getting count from other Documents, maxDocUploadCount ={},docUploadedCount={}",maxDocUploadCount,docUploadedCount);
                			break;
                		} catch(Exception ex){//any null values or other values continue
                			log.info("Getting count from other Documents any number format exception");
                				continue;
                		}
            			
            		}
        	}
    	}
		 
		 
		 if(!countReceived){
			 log.error("No Document Count available in the getProspectDocuments");
			 throw new Exception("No Document Count available");
		 } else{
			 request.getSession().setAttribute(MAX_NO_OF_DOCS_+prospectId,maxDocUploadCount);
			 request.getSession().setAttribute(TOTAL_UPLOADNUM_OF_DOCS_+prospectId,docUploadedCount);
		 }
	}
    
    public JsonNode setDocumentKeyinBody(JsonNode documents, String fileInfo){
    	log.info("Inside setDocumentKeyinBody");
    	ObjectMapper objectMapper = new ObjectMapper();
        JsonNode fileInfoJSON;
        try {
            fileInfoJSON = objectMapper.readValue(fileInfo, JsonNode.class);
        } catch (Exception e) {
            log.error("Unable to parse fileInfo string into JsonNode.", e);
            ApiError error =
                    new ApiError(HttpStatus.BAD_REQUEST, "fileInfo is not valid JSON string", e.getMessage(), e);

            throw new ApiException(error, HttpStatus.BAD_REQUEST);
        }
    	if(fileInfoJSON.get("documentKey") != null ){
    		log.info("File Documents Document Key ::"+fileInfoJSON.get("documentKey").asText());
    	}
    	if(fileInfoJSON.get("documentType") != null ){
    		log.info("File Documents Document Type ::"+fileInfoJSON.get("documentType").asText());
    	}
    	if(documents != null ){
    			JsonNode companyDocuments= documents.get("companyDocuments");
    			if(companyDocuments !=null && companyDocuments.get(0) !=null){
    				if(companyDocuments.isArray()){
    					int companyDocIndex = 0;
    					for(JsonNode objNode : companyDocuments){
    						if(objNode != null){
    							((ObjectNode)objNode).put("documentKey", objNode.get("documentType").asText()+'-'+companyDocIndex);
    							log.info("Document Key Updated as::"+objNode.get("documentType").asText()+'-'+companyDocIndex);
    							companyDocIndex = companyDocIndex+1;
    						}
    						
    					}
    				}
    			}
    			
    				JsonNode stakeholdersDocuments= documents.get("stakeholdersDocuments");
    				if(stakeholdersDocuments !=null){
    					 Iterator<Map.Entry<String,JsonNode>> fieldsIterator = stakeholdersDocuments.fields();
    		             while (fieldsIterator.hasNext()) {
    		            	 Map.Entry<String,JsonNode> field = fieldsIterator.next();
    		            	 if(field.getValue() !=null){
    		            		 JsonNode stakeDocuments= field.getValue().get("documents");
    		            		 if(stakeDocuments != null && stakeDocuments.isArray()){
    		            			 for(JsonNode objNode : stakeDocuments){
    		            				 int stakeDocIndex = 0;
    		            				 if(objNode != null){
    		            					 ((ObjectNode)objNode).put("documentKey", objNode.get("documentType").asText()+'-'+stakeDocIndex);
    		            					 log.info("Document Key Updated as::"+objNode.get("documentType").asText()+'-'+stakeDocIndex);
    		            					 stakeDocIndex = stakeDocIndex+1;
    		            				 }
    		            				 
    		            			 }
    		            		 }
    		            	 }
    		             }
    				}
    			
					if ("Others".equalsIgnoreCase(fileInfoJSON.get("documentType").asText())) {
						JsonNode otherDocuments = documents.get("otherDocuments");
						if (otherDocuments == null) {
							ObjectMapper mapper = new ObjectMapper();
							JsonNode arrayNode = mapper.createArrayNode();
							((ObjectNode) documents).set("otherDocuments", arrayNode);
							otherDocuments = documents.get("otherDocuments");
						}

						if (otherDocuments != null && otherDocuments.isArray()) {
							ObjectNode nodeNew = objectMapper.createObjectNode();
							((ObjectNode) nodeNew).put("documentKey", fileInfoJSON.get("documentKey").asText());
							((ArrayNode) otherDocuments).add(nodeNew);
							log.info("other document updated with the documentdetails");
						}
					}

    	}
    	return documents;
    }
}
