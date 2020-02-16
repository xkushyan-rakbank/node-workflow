package ae.rakbank.documentuploader.controllers;

import ae.rakbank.documentuploader.commons.ApiError;
import ae.rakbank.documentuploader.commons.DocumentUploadException;
import ae.rakbank.documentuploader.commons.EnvironmentUtil;
import ae.rakbank.documentuploader.services.DocumentUploadService;
import ae.rakbank.documentuploader.dto.FileDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class DocumentUploadController {

	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadController.class);

	@Value("${build.date}")
	private String buildDate;

	@Value("${app.name}")
	private String appName;

	private final DocumentUploadService docUploadService;

	private final EnvironmentUtil environmentUtil;

	public DocumentUploadController(DocumentUploadService docUploadService, EnvironmentUtil environmentUtil) {
		this.docUploadService = docUploadService;
		this.environmentUtil = environmentUtil;
	}

	@GetMapping(value = "/health", produces = "application/json")
	@ResponseBody
	public ResponseEntity<Object> health() {
		logger.info("get /health method request");
		HttpHeaders headers = new HttpHeaders();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode response = objectMapper.createObjectNode();
		response.put("buildDate", buildDate);
		if (!environmentUtil.isWebApplyEnvProd()) {
			response.put("project", appName);
		}
		return new ResponseEntity<Object>(response, headers, HttpStatus.OK);
	}

	@PostMapping(value = "/banks/RAK/prospects/{prospectId}/documents", consumes = {
			MediaType.MULTIPART_FORM_DATA_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> handleUploadDocument(@RequestParam("file") MultipartFile file,
			@RequestParam("fileInfo") String fileInfo, @PathVariable String prospectId) {

		return processUploadRequest(file, fileInfo, prospectId);

	}

	@PutMapping(value = "/banks/RAK/prospects/{prospectId}/documents", consumes = {
			MediaType.MULTIPART_FORM_DATA_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Object> handleReUploadDocument(@RequestParam("file") MultipartFile file,
			@RequestParam(name = "fileInfo", required = false) String fileInfo, @PathVariable String prospectId) {

		if (StringUtils.isBlank(fileInfo)) {

			logger.error(String.format(
					"The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s", prospectId,
					StringUtils.length(fileInfo)));

			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "The 'fileInfo' parameter must not be null or empty",
					String.format(
							"The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s",
							prospectId, StringUtils.length(fileInfo)));

			return new ResponseEntity<Object>(error.toJson(), null, HttpStatus.BAD_REQUEST);
		}
		return processUploadRequest(file, fileInfo, prospectId);

	}

	@GetMapping("/banks/RAK/prospects/{prospectId}/documents/{documentKey}")
	public ResponseEntity<byte[]> downloadFile(@SuppressWarnings("unused") @PathVariable String prospectId, @PathVariable String documentKey) {
		final FileDto file = docUploadService.findOneByDocumentKey(documentKey);
		return ResponseEntity.ok().headers(configureHttpHeadersForFile(file))
				.body(file.getContent());
	}

	private HttpHeaders configureHttpHeadersForFile(FileDto file) {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set(HttpHeaders.CONTENT_TYPE, file.getContentType());
		responseHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName());
		return responseHeaders;
	}

	private ResponseEntity<Object> processUploadRequest(MultipartFile file, String fileInfo, String prospectId) {
		logger.info(String.format(
				"[Begin] processUploadRequest() method, prospectId=%s, originalFilename=[%s], filesize=%s, fileInfo= %s",
				prospectId, file.getOriginalFilename(), file.getSize(), fileInfo));

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode fileInfoJSON = null;
		try {
			fileInfoJSON = objectMapper.readValue(fileInfo, JsonNode.class);
		} catch (Exception e) {
			logger.error("Unable to parse fileInfo string into JsonNode.", e);

			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, "fileInfo is not valid JSON string", e.getMessage(),
					e);
			return new ResponseEntity<Object>(error.toJson(), null, HttpStatus.BAD_REQUEST);
		}
		return saveUploadedFile(file, fileInfoJSON, prospectId);
	}

	private ResponseEntity<Object> saveUploadedFile(MultipartFile file, JsonNode fileInfo, String prospectId) {
    String fileName;

		logger.info(
				String.format("[Begin] saveUploadedFile() method, prospectId=%s, originalFilename=[%s], filesize=%s",
						prospectId, file.getOriginalFilename(), file.getSize()));

		try {

			fileName = docUploadService.store(file, fileInfo, prospectId);

		} catch (DocumentUploadException e) {

			logger.error(String.format(
					"[End] saveUploadedFile() method, UPLOAD FAILED for prospectId=%s, originalFilename=[%s], filesize=%s",
					prospectId, file.getOriginalFilename(), file.getSize()));

			ApiError error = new ApiError(HttpStatus.BAD_REQUEST, e.getMessage(), e.getMessage(), e);
			return new ResponseEntity<Object>(error.toJson(), null, HttpStatus.BAD_REQUEST);

		} catch (IOException e) {

			logger.info(String.format(
					"[End] saveUploadedFile() method, UPLOAD FAILED for prospectId=%s, originalFilename=[%s], filesize=%s",
					prospectId, file.getOriginalFilename(), file.getSize()));

			ApiError error = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error", e.getMessage(), e);
			return new ResponseEntity<Object>(error.toJson(), null, HttpStatus.INTERNAL_SERVER_ERROR);

		}

		logger.info(String.format(
				"[End] saveUploadedFile() method, UPLOAD SUCCESS for prospectId=%s, originalFilename=[%s], filesize=%s",
				prospectId, file.getOriginalFilename(), file.getSize()));

		HttpHeaders headers = new HttpHeaders();
		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode responseJSON = objectMapper.createObjectNode();
		responseJSON.put("fileName", fileName);
		return new ResponseEntity<Object>(responseJSON, headers, HttpStatus.OK);
	}

}