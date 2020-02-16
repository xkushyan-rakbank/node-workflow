package ae.rakbank.documentuploader.advices;

import ae.rakbank.documentuploader.commons.ApiError;
import ae.rakbank.documentuploader.s3.S3ReadFileException;
import ae.rakbank.documentuploader.services.AmazonS3FileNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.undertow.server.RequestTooBigException;

@ControllerAdvice
public class FileUploadExceptionAdvice {

	// StandardServletMultipartResolver
	@ExceptionHandler(MultipartException.class)
	public String handleError1(MultipartException e, RedirectAttributes redirectAttributes) {

		redirectAttributes.addFlashAttribute("message", e.getCause().getMessage());
		return "redirect:/";

	}

	// CommonsMultipartResolver
	@ExceptionHandler(MaxUploadSizeExceededException.class)
	public String handleError2(MaxUploadSizeExceededException e, RedirectAttributes redirectAttributes) {

		redirectAttributes.addFlashAttribute("message", e.getCause().getMessage());
		return "redirect:/";

	}

	// RequestTooBigException
	@ExceptionHandler(RequestTooBigException.class)
	public String handleError3(MaxUploadSizeExceededException e, RedirectAttributes redirectAttributes) {

		redirectAttributes.addFlashAttribute("message", e.getCause().getMessage());
		return "redirect:/";

    }

    @ExceptionHandler(S3ReadFileException.class)
    public ApiError handleAmazonS3ReadFileException() {
        return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read file from storage");
    }

    @ExceptionHandler(AmazonS3FileNotFoundException.class)
    public ResponseEntity handleAmazonS3FileNotFoundException() {
    	return ResponseEntity.notFound().build();
    }

}