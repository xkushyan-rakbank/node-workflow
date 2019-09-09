package ae.rakbank.documentuploader.controllers;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import ae.rakbank.documentuploader.commons.DocumentUploadException;
import ae.rakbank.documentuploader.services.DocumentUploadService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Controller
public class DocumentUploadController {

	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadController.class);

	private final DocumentUploadService docUploadService;

	@Autowired
	public DocumentUploadController(DocumentUploadService docUploadService) {
		this.docUploadService = docUploadService;
	}

	@GetMapping("/files/{filename:.+}")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
		
		Resource file = docUploadService.loadAsResource(filename);
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
				.body(file);
	}

	@PostMapping("/banks/RAK/prospects/{prospectId}/documents")
	public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes,
			@PathVariable String prospectId) {
		logger.info("Uploading document for "+prospectId);
		docUploadService.store(file);
		redirectAttributes.addFlashAttribute("message",
				"You successfully uploaded " + file.getOriginalFilename() + "!");

		return "redirect:/";
	}

	@ExceptionHandler(DocumentUploadException.class)
	public ResponseEntity<?> handleStorageFileNotFound(DocumentUploadException exc) {
		return ResponseEntity.notFound().build();
	}

}