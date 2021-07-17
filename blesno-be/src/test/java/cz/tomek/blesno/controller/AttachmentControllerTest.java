package cz.tomek.blesno.controller;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Optional;

import org.junit.Test;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import cz.tomek.blesno.model.Attachment;
import cz.tomek.blesno.service.AttachmentService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = AttachmentController.class, secure = false)
public class AttachmentControllerTest {
	
	private static final String CONTEXT_URL = "/attachments";
	
	private static final String ATTACHMENT_ID = "id";
	
	private static final String ATTACHMENT_NAME = "name";
	
	private static final Attachment ATTACHMENT = Attachment.builder().id(ATTACHMENT_ID).name(ATTACHMENT_NAME).build();
	
	private static final String ATTACHMENT_URL = CONTEXT_URL + "/" + ATTACHMENT_ID;
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private AttachmentService attachmentService;
	
	private ObjectMapper mapper = new ObjectMapper();

	@Test
	@Ignore
	public void shouldGetAttachmentWhenAttachmentIsFound() throws Exception {
		when(attachmentService.findOne(ATTACHMENT_ID)).thenReturn(Optional.of(ATTACHMENT));
		mockMvc.perform(get(ATTACHMENT_URL))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.name", equalTo(ATTACHMENT_NAME)));
		verify(attachmentService).findOne(ATTACHMENT_ID);
	}
	
	@Test
	public void shouldReturnNotFoundStatusWhenAttachmentIsNotFound() throws Exception {
		when(attachmentService.findOne(ATTACHMENT_ID)).thenReturn(Optional.empty());
		mockMvc.perform(get(ATTACHMENT_URL))
			.andExpect(status().isNotFound());
		verify(attachmentService).findOne(ATTACHMENT_ID);
	}
	
	@Test
	@Ignore
	public void shouldSaveAttachment() throws Exception {
		mockMvc
			.perform(post(CONTEXT_URL).contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(ATTACHMENT)))
			.andExpect(status().isCreated())
			.andExpect(header().string(HttpHeaders.LOCATION, endsWith(ATTACHMENT_ID)));
		verify(attachmentService).save(ATTACHMENT);
	}
	
	@Test
	public void shouldDeleteAttachment() throws Exception {
		mockMvc
			.perform(delete(ATTACHMENT_URL))
			.andExpect(status().isNoContent());
		verify(attachmentService).delete(ATTACHMENT_ID);
	}
	
	@Test
	public void shouldGetAttachmentsByCategory() throws Exception {
		Pageable pageRequest = PageRequest.of(0, 10, Direction.ASC, "id");
		String category = "c1";
		mockMvc.perform(
			get(CONTEXT_URL)
				.param("sort", "id,asc")
				.param("page", "0")
				.param("size", "10")
				.param("category", category)
			).andExpect(status().isOk());
		verify(attachmentService).getByCategory(category, pageRequest);
	}
	
	@Test
	public void shouldGetCountByCategory() throws Exception {
		String category = "c1";
		mockMvc.perform(
			get(CONTEXT_URL + "/count")
			.param("category", category)
		).andExpect(status().isOk());
		verify(attachmentService).countByCategory(category);
	}
	
	@Test
	public void shouldGetCategories() throws Exception {
		when(attachmentService.getCategories()).thenReturn(Arrays.asList("c1", "c2"));
		mockMvc.perform(
			get(CONTEXT_URL + "/categories")
		).andExpect(status().isOk())
		.andExpect(jsonPath("$[0]", equalTo("c1")))
		.andExpect(jsonPath("$[1]", equalTo("c2")));
	}
	
}
