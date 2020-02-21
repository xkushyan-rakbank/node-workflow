package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.undertow.server.RequestTooBigException;

@RestControllerAdvice
public class AdviceController {

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
    public ApiError handleAmazonS3ReadFileException(S3ReadFileException e) {
        return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read file from the storage",
				e.getMessage(), e);
    }

    @ExceptionHandler(AmazonS3FileNotFoundException.class)
    public ApiError handleAmazonS3FileNotFoundException(AmazonS3FileNotFoundException e) {
		return new ApiError(HttpStatus.NOT_FOUND, "File not found in the storage",
				e.getMessage(), e);
    }
}
