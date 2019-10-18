/**
 * 
 */
package ae.rakbank.apisecurity.base.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import ae.rakbank.apisecurity.base.response.GenericResponse;
import ae.rakbank.apisecurity.base.util.MessagesResource;

/**
 * @author Sumanth V
 *
 * Apr 29, 2019
 */
public class BaseExceptionHandler extends ResponseEntityExceptionHandler {
	
	/** The messages resource. */
	@Autowired
	private MessagesResource messagesResource;

	@ExceptionHandler(BaseApplicationException.class)
	public final ResponseEntity<GenericResponse> handleBaseException(BaseApplicationException ex, WebRequest request) {
		return new ResponseEntity<>(
				GenericResponse.getFailedResponse(messagesResource.getMessage("common.api.error", null),
						ex.getMessageDesc(), ex.getErrorCode(), ex.getApiCode()),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@ExceptionHandler(Exception.class)
	public final ResponseEntity<GenericResponse> handleCommonException(Exception ex, WebRequest request) {
		return new ResponseEntity<>(
				GenericResponse.getFailedResponse(messagesResource.getMessage("common.api.error", null),
						ex.getMessage()),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@Override
    protected ResponseEntity<Object> handleServletRequestBindingException(ServletRequestBindingException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        return new ResponseEntity<>(
        		GenericResponse.getFailedResponse(messagesResource.getMessage("common.api.error", null),
						messagesResource.getMessage("common.request.auth.token.missing", null)),status);
    }
	
	@Override
	protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
            HttpHeaders headers, HttpStatus status, WebRequest request) {
        return new ResponseEntity<>(
        		GenericResponse.getFailedResponse(messagesResource.getMessage("common.api.error", null),
						messagesResource.getMessage("common.request.payload.missing", null)),status);
    }
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, 
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		return new ResponseEntity<>(
        		GenericResponse.getFailedResponse(messagesResource.getMessage("common.api.error", null),
						ex.getMessage()),status);
	}
	
}
