package ae.rakbank.documentuploader.integration;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import ae.rakbank.documentuploader.services.auth.JwtService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import static ae.rakbank.documentuploader.stub.JwtTokenStub.*;
import static ae.rakbank.documentuploader.stub.JwtPayloadStub.*;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class DocumentUploaderTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private JwtService jwtService;

	@Before
	public void init() {
		when(jwtService.decrypt(anyString())).thenReturn(getNotExpiredJwtPayload());
	}

	@Test
	public void shouldNotSaveNotOwnedProspect() throws Exception {
		String uri = "/api/v1/banks/RAK/prospects/cosme0001/documents";
		MockMultipartFile file =
				new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());

		ObjectNode fileInfo = new ObjectMapper().createObjectNode();
		fileInfo.put("incorrect key", "SampleDocFromTestCase");

		mockMvc.perform(MockMvcRequestBuilders.multipart(uri)
				.file(file)
				.header("authorization", getCustomerJwtTokenStub())
				.param("fileInfo", fileInfo.toString()))
				.andExpect(status().is(403));
	}

	@Test
	public void shouldSaveUploadedFile() throws Exception {
		String prospectId = "cosme0001";
		when(jwtService.decrypt(anyString())).thenReturn(getJwtPayloadForProspect(prospectId));
		String uri = "/api/v1/banks/RAK/prospects/" + prospectId + "/documents";
		MockMultipartFile file =
				new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());

		ObjectNode fileInfo = new ObjectMapper().createObjectNode();
		fileInfo.put("documentType", "SampleDocFromTestCase");

		mockMvc.perform(MockMvcRequestBuilders.multipart(uri)
				.file(file)
				.header("authorization", getCustomerJwtTokenStub())
				.param("fileInfo", fileInfo.toString()))
				.andExpect(status().is(200));
	}
}
