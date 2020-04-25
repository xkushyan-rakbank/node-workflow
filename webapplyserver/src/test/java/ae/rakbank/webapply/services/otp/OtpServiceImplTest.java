package ae.rakbank.webapply.services.otp;

import ae.rakbank.webapply.exception.ApiException;
import ae.rakbank.webapply.services.auth.OAuthService;
import ae.rakbank.webapply.stub.RequestFactory;
import com.fasterxml.jackson.databind.JsonNode;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.mock.http.client.MockClientHttpResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.ServletContext;

import static ae.rakbank.webapply.constants.AuthConstants.OAUTH_CONTEXT_OBJECT_KEY;
import static ae.rakbank.webapply.constants.MessageConstants.TOO_MANY_REQUEST_MESSAGE;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@RunWith(SpringRunner.class)
public class OtpServiceImplTest {

    @Autowired
    private OtpService otpService;
    @Autowired
    private ServletContext servletContext;

    @MockBean
    private RestTemplate restTemplate;
    @MockBean
    private OAuthService oAuthService;

    @Before
    public void init() {
        when(oAuthService.getAndUpdateContextOauthToken())
                .thenReturn("someAccessToken");

        MockClientHttpResponse httpResponse = new MockClientHttpResponse(new byte[]{'a'}, HttpStatus.OK);
        servletContext.setAttribute(OAUTH_CONTEXT_OBJECT_KEY, httpResponse);

        HttpClientErrorException httpClientErrorException = new HttpClientErrorException(HttpStatus.TOO_MANY_REQUESTS);
        when(restTemplate.exchange(anyString(), isA(HttpMethod.class), isA(HttpEntity.class), eq(JsonNode.class)))
                .thenThrow(httpClientErrorException);
    }

    @Test
    public void verifyOrGenerateTooManyRequests() {
        JsonNode requestJSON = RequestFactory.newGenerateOtpValidationRequest();
        try {
            otpService.verifyOrGenerate(requestJSON);
        } catch (ApiException e) {
            assertEquals(HttpStatus.TOO_MANY_REQUESTS, e.getStatus());
            assertEquals(HttpStatus.TOO_MANY_REQUESTS, e.getApiError().getStatus());
            assertEquals(HttpStatus.TOO_MANY_REQUESTS.value(), e.getApiError().getStatusCode().intValue());
            assertEquals(TOO_MANY_REQUEST_MESSAGE, e.getApiError().getMessage());
        }
    }
}
