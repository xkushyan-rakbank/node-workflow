package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.dto.ApiError;
import ae.rakbank.webapply.dto.ApiErrorReduced;
import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class AdviceController extends ResponseEntityExceptionHandler {

    private final FileUtil fileUtil;

    private boolean shouldSendErrorDebugDetails;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        String errorDebugDetails = appConfigJSON.get("OtherConfigs")
                .get(EnvUtil.getEnv()).get("ShouldSendErrorDebugDetails").asText();
        if (StringUtils.isEmpty(errorDebugDetails)) {
            shouldSendErrorDebugDetails = false;
        } else {
            shouldSendErrorDebugDetails = Boolean.parseBoolean(errorDebugDetails);
        }
    }

    @SuppressWarnings("Duplicates")
    @ExceptionHandler({ ApiException.class })
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
            ApiErrorReduced apiErrorReduced = new ApiErrorReduced(apiError);
            return new ResponseEntity<>(apiErrorReduced.toJsonString(), headers, status);
        }
    }

    @ExceptionHandler(AccessDeniedException.class)
    public void accessDeniedExceptionHandler(AccessDeniedException e) {
        log.error(e.getMessage(), e);
        throw e;
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
            ApiErrorReduced apiErrorReduced = new ApiErrorReduced(apiError);
            return new ResponseEntity<>(apiErrorReduced.toJsonString(), headers, status);
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
