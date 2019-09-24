package ae.rakbank.documentuploader.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import ae.rakbank.documentuploader.services.DocumentUploadService;


@Controller
@CrossOrigin
public class DocumentUploadController {

	private static final Logger logger = LoggerFactory.getLogger(DocumentUploadController.class);

	private final DocumentUploadService docUploadService;

	@Autowired
	public DocumentUploadController(DocumentUploadService docUploadService) {
		this.docUploadService = docUploadService;
	}

	@CrossOrigin
	@PostMapping("/banks/RAK/prospects/{prospectId}/documents")
	public ResponseEntity<Object> handleFileUpload(@RequestParam("file") MultipartFile[] file, 
			RedirectAttributes redirectAttributes, @PathVariable String prospectId) {
			HttpHeaders headers = new HttpHeaders();
		if(file.length > 0) {
			logger.info("Uploading document for "+prospectId);
			docUploadService.store(file[0]);
			redirectAttributes.addFlashAttribute("message", "You successfully uploaded " + file[0].getOriginalFilename() + "!");
			return new ResponseEntity<Object>(redirectAttributes.getFlashAttributes(), headers, HttpStatus.OK);
		} 
		else {
			return new ResponseEntity<Object>(redirectAttributes.getFlashAttributes(), headers, HttpStatus.NOT_FOUND);
		}
	}

}