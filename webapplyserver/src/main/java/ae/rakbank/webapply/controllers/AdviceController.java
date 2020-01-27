package ae.rakbank.webapply.controllers;

import ae.rakbank.webapply.commons.ApiError;
import ae.rakbank.webapply.exception.ApiException;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestControllerAdvice
public class AdviceController extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ ApiException.class })
    public ResponseEntity<Object> handleApiException(ApiException apiException) {

        HttpHeaders headers;
        if (apiException.getHeaders() == null) {
            headers = new HttpHeaders();
            headers.set("Exception", apiException.getClass().getSimpleName());
        } else {
            headers = apiException.getHeaders();
            headers.set("Exception", apiException.getClass().getSimpleName());
        }
        headers.set(HttpHeaders.CONTENT_TYPE, "application/json");

        HttpStatus status;
        if (apiException.getStatus() == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            status = apiException.getStatus();
        }

        ApiError apiError;
        if (apiException.getApiError() == null) {
            apiError = getDefaultApiError(apiException, status);
        } else {
            apiError = apiException.getApiError();
            apiError.setStackTrace(apiException.getStackTrace());
        }
        return sendResponse(apiException, headers, status, apiError);
    }

    @ExceptionHandler({ Exception.class })
    public ResponseEntity<Object> handleException(Exception apiException) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Exception", apiException.getClass().getSimpleName());
        headers.set(HttpHeaders.CONTENT_TYPE, "application/json");

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiError apiError = getDefaultApiError(apiException, status);
        return sendResponse(apiException, headers, status, apiError);
    }

    private ResponseEntity<Object> sendResponse(Exception apiException, HttpHeaders headers, HttpStatus status, ApiError apiError) {
        try {
            String jsonString = apiError.toJsonString();
            log.error(jsonString, apiException);
            return new ResponseEntity<>(jsonString, headers, status);
        } catch (JsonProcessingException e) {
            log.error(e.getMessage(), e);
            return new ResponseEntity<>("Failed to convert ApiError object to json: " + e.getMessage(), headers, status);
        }
    }

    private ApiError getDefaultApiError(Exception ex, HttpStatus status) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(ApiError.timestampPattern);
        return ApiError.builder()
                .exception(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now().format(formatter))
                .stackTrace(ex.getStackTrace())
                .message("Unexpected error")
                .status(status)
                .statusCode(status.value())
                .build();
    }
}
