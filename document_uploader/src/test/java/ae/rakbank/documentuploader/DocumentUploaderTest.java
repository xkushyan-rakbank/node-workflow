package ae.rakbank.documentuploader;

import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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

import ae.rakbank.documentuploader.services.DocumentUploadService;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class DocumentUploaderTest {

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private DocumentUploadService docUploadService;

	@Test
	public void shouldSaveUploadedFile() throws Exception {
		String uri = "/api/v1/banks/RAK/prospects/cosme0001/documents";
		MockMultipartFile file = new MockMultipartFile("file", "filename.txt", "text/plain", "some xml".getBytes());

		ObjectMapper objectMapper = new ObjectMapper();
		ObjectNode fileInfo = objectMapper.createObjectNode();
		fileInfo.put("documentKey", "SampleDocFromTestCase");

		mockMvc.perform(MockMvcRequestBuilders.multipart(uri).file(file).param("fileInfo", fileInfo.toString()))
				.andExpect(status().is(200));

		then(this.docUploadService).should().store(file, fileInfo);

	}

}