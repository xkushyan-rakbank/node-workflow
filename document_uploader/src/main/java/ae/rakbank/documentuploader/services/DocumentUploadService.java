package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.dto.FileDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface DocumentUploadService {

    ResponseEntity<Object> processUploadRequest(MultipartFile file, String fileInfo, String prospectId);

    FileDto findOneByDocumentKey(String documentKey);
}
