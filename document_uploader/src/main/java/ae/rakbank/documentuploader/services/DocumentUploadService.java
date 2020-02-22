package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.exception.DocumentUploadException;
import ae.rakbank.documentuploader.dto.FileDto;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface DocumentUploadService {

    String store(MultipartFile file, JsonNode requestBodyJSON, String prospectId) throws IOException, DocumentUploadException;

    FileDto findOneByDocumentKey(String documentKey);
}