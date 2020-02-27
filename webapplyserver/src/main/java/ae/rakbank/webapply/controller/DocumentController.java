package ae.rakbank.webapply.controller;

import ae.rakbank.webapply.client.DehClient;
import ae.rakbank.webapply.dto.JwtPayload;
import ae.rakbank.webapply.services.auth.AuthorizationService;
import ae.rakbank.webapply.util.EnvUtil;
import ae.rakbank.webapply.util.FileUtil;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/api/v1/prospects/{prospectId}/documents")
@PreAuthorize("isAuthenticated()")
@RequiredArgsConstructor
public class DocumentController {

    private final FileUtil fileUtil;
    private final DehClient dehClient;
    private final AuthorizationService authorizationService;

    private JsonNode dehURIs = null;
    private String dehBaseUrl = null;

    @PostConstruct
    public void init() {
        JsonNode appConfigJSON = fileUtil.getAppConfigJSON();
        dehURIs = appConfigJSON.get("DehURIs");
        dehBaseUrl = appConfigJSON.get("BaseURLs").get(EnvUtil.getEnv()).get("DehBaseUrl").asText();
    }

    @GetMapping(value = "", produces = "application/json")
    public ResponseEntity<Object> getProspectDocuments(HttpServletRequest httpRequest,
                                                  @AuthenticationPrincipal JwtPayload jwtPayload,
                                                  @PathVariable String prospectId) {
        log.info("Begin getProspectDocuments() method");
        log.debug(String.format("getProspectDocuments() method args, prospectId=[%s]", prospectId));

        String url = dehBaseUrl + dehURIs.get("getProspectDocumentsUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId);

        return dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, null,
                "getProspectDocuments()", MediaType.APPLICATION_JSON, jwtPayload.getOauthAccessToken());
    }

    @GetMapping(value = "/{documentId}")
    public ResponseEntity<Object> getProspectDocumentById(HttpServletRequest httpRequest,
                                                     @AuthenticationPrincipal JwtPayload jwtPayload,
                                                     @PathVariable String prospectId,
                                                     @PathVariable String documentId) {
        log.info("Begin getProspectDocumentById() method");
        log.debug(String.format("getProspectDocumentById() method args, prospectId=[%s], documentId=[%s]",
                prospectId, documentId));

        String url = dehBaseUrl + dehURIs.get("getProspectDocumentByIdUri").asText();
        UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(url).buildAndExpand(prospectId, documentId);

        return dehClient.invokeApiEndpoint(uriComponents.toString(), HttpMethod.GET, null,
                "getProspectDocumentById()", MediaType.APPLICATION_OCTET_STREAM, jwtPayload.getOauthAccessToken());
    }
}
