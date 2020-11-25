package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.dto.FileDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;

public interface DocumentUploadService {

	ResponseEntity<Object> processUploadRequest(MultipartFile file, String fileInfo, String prospectId);

    FileDto findOneByDocumentKey(String documentKey);
    
    JsonNode getUpdateProspectBody(JsonNode responseBody, MultipartFile file, String fileInfo, String docUploadedCount, String fileName);
}
