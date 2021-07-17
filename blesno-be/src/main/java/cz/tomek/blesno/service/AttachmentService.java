package cz.tomek.blesno.service;

import java.nio.file.Path;
import java.util.List;

import org.springframework.data.domain.Pageable;

import cz.tomek.blesno.model.Attachment;

/**
 * Manages operations over {@link Attachment}.
 * 
 * @author tomek
 *
 */
public interface AttachmentService extends AppEntityService<Attachment> {
	
	/**
	 * Get all attachments of given {@code category}.
	 * 
	 * @param category
	 * @param pageRequest
	 * @return attachments of given {@code category}
	 */
	List<Attachment> getByCategory(String category, Pageable pageRequest);
	
	/**
	 * Get number of attachmets of given <code>category</code>.
	 * 
	 * @param category
	 * @return number of attachments of given category
	 */
	long countByCategory(String category);
	
	/**
	 * Get attachment categories.
	 * 
	 * @return attachment categories
	 */
	List<String> getCategories();
	
	/**
	 * Get images of attachments.
	 *
	 * @return images of attachments
	 */
	List<Path> getImages();
	
}
