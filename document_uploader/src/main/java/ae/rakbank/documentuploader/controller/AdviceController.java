package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.undertow.server.RequestTooBigException;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestControllerAdvice
public class AdviceController {

    private static final String REDIRECT = "redirect:/";
    private static final String MESSAGE_KEY = "message";

    // CommonsMultipartResolver, RequestTooBigException, StandardServletMultipartResolver
    @ExceptionHandler({MaxUploadSizeExceededException.class, RequestTooBigException.class, MultipartException.class})
    public String handleError2(Exception e, RedirectAttributes redirectAttributes) {

        redirectAttributes.addFlashAttribute(MESSAGE_KEY, e.getCause().getMessage());
        return REDIRECT;
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

    @SuppressWarnings("Duplicates")
    @ExceptionHandler({ApiException.class})
    public ResponseEntity<Object> handleApiException(ApiException apiException) {

        HttpHeaders headers;
        headers = new HttpHeaders();
        headers.set("Exception", apiException.getClass().getSimpleName());
        if (apiException.getHeaders() != null) {
            headers.putAll(apiException.getHeaders());
        }
        headers.set(HttpHeaders.CONTENT_TYPE, "application/json");
        headers.remove(HttpHeaders.CONTENT_LENGTH);

        HttpStatus status;
        if (apiException.getStatus() == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        } else {
            status = apiException.getStatus();
        }

        ApiError apiError;
        if (apiException.getApiError() == null) {
            apiError = getDefaultApiError(apiException, status, apiException.getTimestamp());
        } else {
            apiError = apiException.getApiError();
            apiError.setStackTrace(getReducedStackTrace(apiException.getStackTrace()));
            apiError.setExceptionClassName(apiException.getClass().getSimpleName());
        }

        return new ResponseEntity<>(apiError.toJsonString(), headers, status);
    }

    @SuppressWarnings("Duplicates")
    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleException(Exception exception) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Exception", exception.getClass().getSimpleName());
        headers.set(HttpHeaders.CONTENT_TYPE, "application/json");

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiError apiError = getDefaultApiError(exception, status, null);

        return new ResponseEntity<>(apiError.toJsonString(), headers, status);
    }

    private ApiError getDefaultApiError(Exception ex, HttpStatus status, String timestamp) {
        String actualTimestamp;
        if (timestamp != null) {
            actualTimestamp = timestamp;
        } else {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern(ApiError.TIMESTAMP_PATTERN);
            actualTimestamp = LocalDateTime.now().format(formatter);
        }

        return ApiError.builder()
                .exceptionClassName(ex.getClass().getSimpleName())
                .message(ex.getMessage())
                .timestamp(actualTimestamp)
                .stackTrace(getReducedStackTrace(ex.getStackTrace()))
                .status(status)
                .statusCode(status.value())
                .build();
    }

    private StackTraceElement[] getReducedStackTrace(StackTraceElement[] stackTrace) {
        return new StackTraceElement[]{stackTrace[0], stackTrace[1], stackTrace[2], stackTrace[3], stackTrace[4]};
    }
}
