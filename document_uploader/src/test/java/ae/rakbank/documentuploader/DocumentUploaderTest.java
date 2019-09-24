package ae.rakbank.documentuploader;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
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

import ae.rakbank.documentuploader.commons.DocumentNotFoundException;
import ae.rakbank.documentuploader.services.DocumentUploadService;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class DocumentUploaderTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private DocumentUploadService docUploadService;

	@Test
	public void shouldSaveUploadedFile() throws Exception {
		MockMultipartFile multipartFile = new MockMultipartFile("file", "test.txt", "text/plain",
				"Spring Framework".getBytes());
		this.mvc.perform(multipart("/banks/RAK/prospects/cosme0001/documents").file(multipartFile))
				.andExpect(status().isOk());

		then(this.docUploadService).should().store(multipartFile);
	}

	@Test
	public void should404WhenMissingFile() throws Exception {
		given(this.docUploadService.loadAsResource("test.txt")).willThrow(DocumentNotFoundException.class);

		this.mvc.perform(get("/files/test.txt")).andExpect(status().isNotFound());
	}

}