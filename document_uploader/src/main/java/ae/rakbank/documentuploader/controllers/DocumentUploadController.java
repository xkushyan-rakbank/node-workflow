package ae.rakbank.documentuploader.controllers;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.documentuploader.commons.ApiError;
import ae.rakbank.documentuploader.commons.DocumentUploadException;
import ae.rakbank.documentuploader.services.DocumentUploadService;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class DocumentUploadController {

	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadController.class);

	private final DocumentUploadService docUploadService;

	@Autowired
	public DocumentUploadController(DocumentUploadService docUploadService) {
		this.docUploadService = docUploadService;
	}

	@RequestMapping(value = "/banks/RAK/prospects/{prospectId}/documents", method = { RequestMethod.POST,
			RequestMethod.PUT }, consumes = {
					MediaType.MULTIPART_FORM_DATA_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> handleFileUpload(@RequestParam("file") MultipartFile file,
			@RequestParam("fileInfo") String fileInfo, @PathVariable String prospectId) {

		logger.error(String.format(
				"[Begin] handleFileUpload() method, prospectId=%s, originalFilename=[%s], filesize=%s, fileInfo= %s",
				prospectId, file.getOriginalFilename(), file.getSize(), fileInfo));

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode fileInfoJSON = null;
		try {
			fileInfoJSON = objectMapper.readValue(fileInfo, JsonNode.class);
		} catch (Exception e) {
			logger.error("Unable to parse fileInfo string into JsonNode.", e);

			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "fileInfo is not valid JSON string", e.getMessage(),
					e);
			return new ResponseEntity<Object>(error, null, HttpStatus.BAD_REQUEST);
		}
		return saveUploadedFile(file, fileInfoJSON, prospectId);

	}

	private ResponseEntity<Object> saveUploadedFile(MultipartFile file, JsonNode fileInfo, String prospectId) {

		logger.info(
				String.format("[Begin] saveUploadedFile() method, prospectId=%s, originalFilename=[%s], filesize=%s",
						prospectId, file.getOriginalFilename(), file.getSize()));

		try {

			docUploadService.store(file, fileInfo);

		} catch (DocumentUploadException e) {

			logger.error(String.format(
					"[End] saveUploadedFile() method, UPLOAD FAILED for prospectId=%s, originalFilename=[%s], filesize=%s",
					prospectId, file.getOriginalFilename(), file.getSize()));

			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getMessage(), e.getMessage(), e);
			return new ResponseEntity<Object>(error, null, HttpStatus.BAD_REQUEST);

		} catch (IOException e) {

			logger.info(String.format(
					"[End] saveUploadedFile() method, UPLOAD FAILED for prospectId=%s, originalFilename=[%s], filesize=%s",
					prospectId, file.getOriginalFilename(), file.getSize()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error", e.getMessage(), e);
			return new ResponseEntity<Object>(error, null, HttpStatus.INTERNAL_SERVER_ERROR);

		}

		logger.info(String.format(
				"[End] saveUploadedFile() method, UPLOAD SUCCESS for prospectId=%s, originalFilename=[%s], filesize=%s",
				prospectId, file.getOriginalFilename(), file.getSize()));

		HttpHeaders headers = new HttpHeaders();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode responseJSON = objectMapper.createObjectNode();
		responseJSON.put("fileName", file.getOriginalFilename());
		return new ResponseEntity<Object>(responseJSON, headers, HttpStatus.OK);
	}

}