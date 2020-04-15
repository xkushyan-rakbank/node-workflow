package ae.rakbank.documentuploader.services;

import ae.rakbank.documentuploader.constants.DocumentTypes;
import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.exception.DocumentUploadException;
import ae.rakbank.documentuploader.dto.FileDto;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.s3.S3FileUploader;
import ae.rakbank.documentuploader.util.EnvUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
}
