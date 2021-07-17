package cz.tomek.blesno.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import cz.tomek.blesno.model.Article;

/**
 * Repository for {@link Article} entities.
 * 
 * @author tomek
 *
 */
public interface ArticleRepository extends JpaRepository<Article, String> {
	
	/**
	 * Finds ids of articles whose ids starts with given {@code prefix}.
	 *
	 * @param prefix
	 * @return ids of matched articles
	 */
	@Query(value = "select coalesce(root_category || '/', '') || id from article where id like :prefix% order by id", nativeQuery = true)
	List<String> findIdByIdStartsWith(String prefix);

	/**
	 * Finds all articles of given category.
	 * 
	 * @param category
	 * @param pageable
	 * @return all articles of given category
	 */
	List<Article> findByCategory(String category, Pageable pageable);
	
	/**
	 * Get number of articles of given <code>category</code>.
	 * 
	 * @param category
	 * @return number of articles of given category
	 */
	long countByCategory(String category);
	
	/**
	 * Find all article categories.
	 * 
	 * @return all article categories
	 */
	@Query("select distinct category from Article order by category")
	List<String> findDistinctCategories();

}
