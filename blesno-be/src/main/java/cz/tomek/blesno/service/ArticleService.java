package cz.tomek.blesno.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import cz.tomek.blesno.model.Article;

/**
 * Manages operations over {@link Article}.
 * 
 * @author tomek
 *
 */
public interface ArticleService {

	/**
	 * Saves an article.
	 * 
	 * @param article article to save
	 * @return saved article
	 */
	Article save(Article article);

	/**
	 * Removes an article.
	 * 
	 * @param id id of an article to remove
	 */
	void delete(String id);
	
	/**
	 * Checks whether article with given id exists.
	 * 
	 * @param id
	 * @return flag indicating existence of article with given id
	 */
	boolean existsById(String id);

	/**
	 * Finds an article by id.
	 * 
	 * @param id
	 * @return article with given id or null if not exists
	 */
	Optional<Article> findOne(String id);

	/**
	 * Gets all articles adjusted for given {@code pageRequest}.
	 * 
	 * @param pageable
	 * @return all articles adjusted for page request
	 */
	List<Article> getAll(Pageable pageable);

	/**
	 * Gets ids of articles whose ids start with given {@code prefix}.
	 *
	 * @param prefix
	 * @return ids of matched articles
	 */
	List<String> getIdsByPrefix(String prefix);

	/**
	 * Gets all articles of given category.
	 * 
	 * @param category
	 * @param pageable
	 * @return all articles of given category
	 */
	List<Article> getByCategory(String category, Pageable pageable);
	
	/**
	 * Get number of articles of given <code>category</code>.
	 * 
	 * @param category
	 * @return number of articles of given category
	 */
	long countByCategory(String category);
	
	/**
	 * Get all article categories.
	 * 
	 * @return all article categories
	 */
	List<String> getCategories();


}
