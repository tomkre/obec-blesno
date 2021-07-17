package cz.tomek.blesno.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;

import cz.tomek.blesno.model.AppEntity;

/**
 * Manages operations over {@link AppEntity}.
 * 
 * @author tomek
 *
 * @param <T> Application entity
 */
public interface AppEntityService<T extends AppEntity> {
	
	/**
	 * Saves an entity.
	 * 
	 * @param entity entity to save
	 * @return saved entity
	 */
	T save(T entity);

	/**
	 * Deletes an entity.
	 * 
	 * @param id id of an entity to delete
	 */
	void delete(String id);

	/**
	 * Finds an entity by id.
	 * 
	 * @param id
	 * @return optional of an found entity or null in case of not found entity
	 */
	Optional<T> findOne(String id);

	/**
	 * Gets all entities adjusted for given {@code pageRequest}.
	 * 
	 * @param pageable
	 * @return all articles adjusted for page request
	 */
	List<T> getAll(Pageable pageable);
	
	/**
	 * Check whether an  entity with given id exists in the storage.
	 * 
	 * @param id id of an entity
	 * @return flag indicating whether an entity with given id exists in storage
	 */
	boolean existsById(String id);

}
