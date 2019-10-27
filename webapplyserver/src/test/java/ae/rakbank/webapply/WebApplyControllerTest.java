package ae.rakbank.webapply;

import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.ObjectMapper;

import ae.rakbank.webapply.controllers.WebApplyController;
import ae.rakbank.webapply.services.OAuthService;
import io.restassured.module.mockmvc.RestAssuredMockMvc;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class WebApplyControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Mock
	private OAuthService oauthClient;

	@InjectMocks
	private WebApplyController webApplyController;

	@Autowired
	private RestTemplate restTemplate;

	private ObjectMapper mapper = new ObjectMapper();

	@Before
	public void initialiseRestAssuredMockMvcStandalone() {
		RestAssuredMockMvc.standaloneSetup(webApplyController);
	}

	@Test
	@Ignore
	public void getConfig() throws Exception {

	}

}