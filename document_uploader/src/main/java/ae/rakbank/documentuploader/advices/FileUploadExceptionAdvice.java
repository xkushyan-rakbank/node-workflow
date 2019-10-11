package ae.rakbank.documentuploader.advices;

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
}