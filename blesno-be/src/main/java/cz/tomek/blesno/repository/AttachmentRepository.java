package cz.tomek.blesno.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cz.tomek.blesno.model.Attachment;

/**
 * Repository for {@link Attachment} entities.
 * 
 * @author tomek
 *
 */
public interface AttachmentRepository extends JpaRepository<Attachment, String> {
	
	/**
	 * Finds all attachments of given {@code category}.
	 * 
	 * @param category
	 * @param pageRequest
	 * @return attachments of given {@code category}
	 */
	List<Attachment> findByCategory(String category, Pageable pageRequest);
	
	/**
	 * Get number of attachments of given <code>category</code>.
	 * 
	 * @param category
	 * @return number of attachments of given <code>category</code>.
	 */
	long countByCategory(String category);
	
	/**
	 * Find all attachment categories.
	 * 
	 * @return all attachment categories
	 */
	@Query("select distinct category from Attachment order by category")
	List<String> findDistinctCategories();

}
