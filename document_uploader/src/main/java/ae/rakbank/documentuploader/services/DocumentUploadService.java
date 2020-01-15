package ae.rakbank.documentuploader.services;

import java.io.IOException;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;

import ae.rakbank.documentuploader.commons.DocumentUploadException;

public interface DocumentUploadService {

	String store(MultipartFile file, JsonNode requestBodyJSON, String prospectId) throws IOException, DocumentUploadException;
}