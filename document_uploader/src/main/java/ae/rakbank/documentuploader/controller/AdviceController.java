package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.dto.ApiErrorInterface;
import ae.rakbank.documentuploader.dto.ApiErrorReduced;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.exception.S3ReadFileException;
import ae.rakbank.documentuploader.exception.AmazonS3FileNotFoundException;
import ae.rakbank.documentuploader.util.EnvUtil;
import ae.rakbank.documentuploader.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import io.undertow.server.RequestTooBigException;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestControllerAdvice
@RequiredArgsConstructor
public class AdviceController {

    private static final String REDIRECT = "redirect:/";
    private static final String MESSAGE_KEY = "message";

    private final FileUtil fileUtil;

    private Boolean shouldSendErrorDebugDetails;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        String errorDebugDetails = appConfigJSON.get("OtherConfigs")
                .get(EnvUtil.getEnv()).get("ShouldSendErrorDebugDetails").asText();
        if (!StringUtils.isEmpty(errorDebugDetails)) {
            shouldSendErrorDebugDetails = false;
        } else {
            shouldSendErrorDebugDetails = Boolean.getBoolean(errorDebugDetails);
        }
    }

    @ExceptionHandler({MaxUploadSizeExceededException.class, RequestTooBigException.class, MultipartException.class})
    public String handleError2(Exception e, RedirectAttributes redirectAttributes) {

        redirectAttributes.addFlashAttribute(MESSAGE_KEY, e.getCause().getMessage());
        return REDIRECT;
    }

    @ExceptionHandler(S3ReadFileException.class)
    public ApiErrorInterface handleAmazonS3ReadFileException(S3ReadFileException e) {
        ApiError apiError = new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Could not read file from the storage",
                e.getMessage(), e);
        if (shouldSendErrorDebugDetails) {
            return apiError;
        } else {
            return new ApiErrorReduced(apiError);
        }
    }

    @ExceptionHandler(AmazonS3FileNotFoundException.class)
    public ApiErrorInterface handleAmazonS3FileNotFoundException(AmazonS3FileNotFoundException e) {
        ApiError apiError = new ApiError(HttpStatus.NOT_FOUND, "File not found in the storage",
                e.getMessage(), e);
        if (shouldSendErrorDebugDetails) {
            return apiError;
        } else {
            return new ApiErrorReduced(apiError);
        }
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

        if (shouldSendErrorDebugDetails) {
            return new ResponseEntity<>(apiError.toJsonString(), headers, status);
        } else {
            return new ResponseEntity<>(new ApiErrorReduced(apiError).toJsonString(), headers, status);
        }

    }

    @SuppressWarnings("Duplicates")
    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handleException(Exception exception) {

        HttpHeaders headers = new HttpHeaders();
        headers.set("Exception", exception.getClass().getSimpleName());
        headers.set(HttpHeaders.CONTENT_TYPE, "application/json");

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        ApiError apiError = getDefaultApiError(exception, status, null);

        if (shouldSendErrorDebugDetails) {
            return new ResponseEntity<>(apiError.toJsonString(), headers, status);
        } else {
            return new ResponseEntity<>(new ApiErrorReduced(apiError).toJsonString(), headers, status);
        }
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
