package ae.rakbank.documentuploader.deh;

import java.time.LocalDateTime;
import java.util.Collections;

import javax.annotation.PostConstruct;

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import ae.rakbank.documentuploader.dto.ApiError;
import ae.rakbank.documentuploader.dto.JwtPayload;
import ae.rakbank.documentuploader.exception.ApiException;
import ae.rakbank.documentuploader.util.DehUtil;
import ae.rakbank.documentuploader.util.EnvUtil;
import ae.rakbank.documentuploader.util.FileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static ae.rakbank.documentuploader.constants.ConfigurationKeys.OTHER_CONFIGS;
import static ae.rakbank.documentuploader.constants.AuthConstants.OAUTH_ACCESS_TOKEN_KEY;

@Slf4j
@Component
@RequiredArgsConstructor
public class DehClient {
	
	  private final FileUtil fileUtil;
	  
	  @Value("${webapply.env}")
	  private String webApplyEnv;
	  
	  private final DehUtil dehUtil;
	  private final RestTemplate restTemplate;
	  
	  private final OauthClient oauthClient;
	  
	  private String oauthUser;
	  private String oauthPassword;
	  
	  @PostConstruct
	  public void init(){
		  log.info("WEBAPPLY_ENV = {}", webApplyEnv);
		  JsonNode docUploadConfig = fileUtil.getAppConfigJSON();
		  JsonNode oAuthConfigs = docUploadConfig.get(OTHER_CONFIGS).get(webApplyEnv);
	      oauthUser = oAuthConfigs.get("OAuthUsername").asText();
	      oauthPassword = oAuthConfigs.get("OAuthPassword").asText();
	      log.info("Virtual user name: {}", oauthUser);
	  }
	  
	  public ResponseEntity<Object> invokeApiEndpoint(String url, HttpMethod httpMethod, JsonNode requestBodyJSON,
              String operationId, MediaType mediaType, JwtPayload jwtPayload) {
		  log.info("..Inside invokeApi Endpoint method...");
		  String oauthAccessToken = jwtPayload.getOauthAccessToken();
		  if(isOauthAccessTokenExpired(jwtPayload)){
			  ResponseEntity<JsonNode>  oAuthContextResponse = oauthClient.authorize(oauthUser, oauthPassword);
			  oauthAccessToken = oAuthContextResponse.getBody().get(OAUTH_ACCESS_TOKEN_KEY).asText();
		  }
		  if (requestBodyJSON != null) {
	            log.info(String.format("> Invoke API from %s method, Endpoint=[%s], requestBodyJSON:[%s]",
	                    operationId, url, ReflectionToStringBuilder.toString(requestBodyJSON)));
	            
	        } else {
	            log.info(String.format(">> Invoke API from %s method, Endpoint=[%s]", operationId, url));
	        }
		  
		  HttpEntity<JsonNode> request;
		  request = getHttpEntityRequest(requestBodyJSON, oauthAccessToken);
		  
		  ResponseEntity<?> response;
		  try{
			  if (MediaType.APPLICATION_JSON.equals(mediaType)) {
	                response = restTemplate.exchange(url, httpMethod, request, JsonNode.class);
	            } else {
	                response = restTemplate.exchange(url, httpMethod, request, Resource.class);
	            }
		  } catch(HttpClientErrorException e){
			  log.error(String.format("HttpClientErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
	                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
	          HttpStatus status = e.getStatusCode();
	          ApiError apiError = dehUtil.initApiError(e, status);

	            throw new ApiException(apiError, new HttpHeaders(), status);
		  } catch (HttpServerErrorException e){
			  log.error(String.format("HttpServerErrorException: Endpoint=[%s], HttpStatus=[%s], response=%s", url,
	                    e.getRawStatusCode(), e.getResponseBodyAsString()), e);
	          HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
	          ApiError apiError = dehUtil.initApiError(e, status);

	          throw new ApiException(apiError, new HttpHeaders(), status);
		  }

	        log.info(String.format("API call from %s method, Endpoint=[%s] HttpStatus=[%s] Response=[%s]",
	                operationId, url, response.getStatusCodeValue(), response.getBody()));

	        return new ResponseEntity<>(response.getBody(), new HttpHeaders(), response.getStatusCode());
		  
	  }
	  
	  private HttpEntity<JsonNode> getHttpEntityRequest(JsonNode requestBodyJSON, String oauthAccessToken) {
	        HttpHeaders headers = getOAuthHeaders(oauthAccessToken);
	        return new HttpEntity<>(requestBodyJSON, headers);
	    }
	  
	    HttpHeaders getOAuthHeaders(String oauthAccessToken) {
	        HttpHeaders headers = new HttpHeaders();
	        headers.set("Authorization", oauthAccessToken);
	        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
	        headers.setContentType(MediaType.APPLICATION_JSON);

	        ObjectMapper objectMapper = new ObjectMapper();
	        ObjectNode channelContext = objectMapper.createObjectNode();
	        ObjectNode authorizationDetails = objectMapper.createObjectNode();
	        authorizationDetails.put("primaryAccessCode", oauthPassword);
	        authorizationDetails.put("secondaryAccessCode", "");
	        authorizationDetails.put("userId", oauthUser);

	        channelContext.set("authorizationDetails", authorizationDetails);
	        headers.set("ChannelContext", channelContext.toString());
	        return headers;
	    }
	  
	    private boolean isOauthAccessTokenExpired(JwtPayload jwtPayload) {
	        return LocalDateTime.now()
	                .isAfter(LocalDateTime.parse(jwtPayload.getOauthTokenExpiryTime().toString()));
	    }

}
