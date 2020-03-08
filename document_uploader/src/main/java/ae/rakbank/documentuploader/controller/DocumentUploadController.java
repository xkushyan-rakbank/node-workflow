package ae.rakbank.documentuploader.controller;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.services.auth.AuthorizationService;
import ae.rakbank.documentuploader.util.EnvironmentUtil;
import ae.rakbank.documentuploader.services.DocumentUploadService;
import ae.rakbank.documentuploader.dto.FileDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin
public class DocumentUploadController {

    @Value("${build.date}")
    private String buildDate;
    @Value("${app.name}")
    private String appName;

    private final DocumentUploadService docUploadService;
    private final EnvironmentUtil environmentUtil;
    private final AuthorizationService authorizationService;

    @GetMapping(value = "/health", produces = "application/json")
    @ResponseBody
    public ResponseEntity<Object> health() {
        log.info("get /health method request");
        HttpHeaders headers = new HttpHeaders();
        ObjectMapper objectMapper = new ObjectMapper();
        ObjectNode response = objectMapper.createObjectNode();
        response.put("buildDate", buildDate);
        if (!environmentUtil.isWebApplyEnvProd()) {
            response.put("project", appName);
        }
        return new ResponseEntity<>(response, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/banks/RAK/prospects/{prospectId}/documents", consumes = {
            MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> handleUploadDocument(@RequestHeader String authorization,
                                                       @RequestParam("file") MultipartFile file,
                                                       @RequestParam("fileInfo") String fileInfo,
                                                       @PathVariable String prospectId) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);

        return docUploadService.processUploadRequest(file, fileInfo, prospectId);
    }

    @PutMapping(value = "/banks/RAK/prospects/{prospectId}/documents",
            consumes = {MediaType.MULTIPART_FORM_DATA_VALUE},
            produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Object> handleReUploadDocument(@RequestHeader String authorization,
                                                         @RequestParam("file") MultipartFile file,
                                                         @RequestParam(name = "fileInfo", required = false) String fileInfo,
                                                         @PathVariable String prospectId) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);

        if (StringUtils.isBlank(fileInfo)) {
            log.error(String.format("The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s",
                    prospectId, StringUtils.length(fileInfo)));
            ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, "The 'fileInfo' parameter must not be null or empty",
                    String.format("The 'fileInfo' parameter must not be null or empty, prospectId=%s, fileInfo length=%s",
                            prospectId, StringUtils.length(fileInfo)));

            throw new ApiException(apiError, HttpStatus.BAD_REQUEST);
        }
        return docUploadService.processUploadRequest(file, fileInfo, prospectId);
    }

    @GetMapping("/banks/RAK/prospects/{prospectId}/documents/{documentKey}")
    public ResponseEntity<byte[]> downloadFile(@RequestHeader String authorization,
                                               @SuppressWarnings("unused") @PathVariable String prospectId,
                                               @PathVariable String documentKey) {
        String jwtToken = getTokenFromAuthorizationHeader(authorization);
        authorizationService.validateJwtToken(jwtToken);

        final FileDto file = docUploadService.findOneByDocumentKey(documentKey);
        return ResponseEntity.ok().headers(configureHttpHeadersForFile(file)).body(file.getContent());
    }

    private HttpHeaders configureHttpHeadersForFile(FileDto file) {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set(HttpHeaders.CONTENT_TYPE, file.getContentType());
        responseHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName());
        return responseHeaders;
    }

    private String getTokenFromAuthorizationHeader(String authorizationString) {
        return authorizationString.substring(7); // removes the "Bearer " prefix.
    }
}
