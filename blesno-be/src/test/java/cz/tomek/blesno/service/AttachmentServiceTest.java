package cz.tomek.blesno.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import cz.tomek.blesno.model.Attachment;
import cz.tomek.blesno.service.impl.JpaAttachmentService;

@RunWith(SpringRunner.class)
@DataJpaTest
@Import(JpaAttachmentService.class)
public class AttachmentServiceTest {

	@Autowired
	private AttachmentService attachmentService;
	
	@Test
	public void shouldSaveAttachment() {
		String id = "id";
		Attachment attachment = Attachment.builder().id(id).build();
		attachmentService.save(attachment);
		assertTrue("Saved attachment should exist in the storage!", attachmentService.existsById(id));
	}
	
	@Test
	public void shouldDeleteAttachment() {
		String id = "id";
		Attachment attachment = Attachment.builder().id(id).build();
		attachmentService.save(attachment);
		attachmentService.delete(id);
		assertFalse("Deleted attachment should not exist in the storage!", attachmentService.existsById(id));
	}
	
	@Test
	public void shouldGetAttachmentById() {
		String id = "id";
		Attachment attachment = Attachment.builder().id(id).build();
		attachmentService.save(attachment);
		Attachment fromDb = attachmentService.findOne(id).orElse(null);
		assertNotNull("Found attachment should not be null!", fromDb);
	}
	
	@Test
	@Sql("classpath:sql/AttachmentServiceTest.sql")
	@Ignore
	public void shouldGetAttachmentsByCategory() {
		Pageable pageRequest = PageRequest.of(0, 10, Direction.ASC, "id");
		List<Attachment> attachments = attachmentService.getByCategory("c1", pageRequest);
		assertThat(attachments)
			.extracting("id")
			.containsExactly("a1", "a2");
	}
	
	@Test
	@Sql("classpath:sql/AttachmentServiceTest.sql")
	public void shouldGetAttachmentCountByCategory() {
		long count = attachmentService.countByCategory("c1");
		assertThat(count).isEqualTo(2);
	}
	
	@Test
	@Sql("classpath:sql/AttachmentServiceTest.sql")
	public void shouldGetCategories() {
		List<String> categories = attachmentService.getCategories();
		assertThat(categories).containsExactly("c1", "c2");
	}
	
}
