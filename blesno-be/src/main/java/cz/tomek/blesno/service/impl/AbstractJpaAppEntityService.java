package cz.tomek.blesno.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;

import cz.tomek.blesno.model.AppEntity;
import cz.tomek.blesno.repository.AppEntityRepository;
import cz.tomek.blesno.service.AppEntityService;

/**
 * Default implementation of {@link AppEntityService}.
 * 
 * @author tomek
 *
 */
public abstract class AbstractJpaAppEntityService<T extends AppEntity> implements AppEntityService<T> {

	@Autowired
	private AppEntityRepository<T> repository;
	
	@Override
	public T save(T entity) {
		return repository.save(entity);
	}

	@Override
	public void delete(String id) {
		findOne(id).ifPresent(repository::delete);
	}

	@Override
	public Optional<T> findOne(String id) {
		return repository.findById(id);
	}

	@Override
	public List<T> getAll(Pageable pageable) {
		return repository.findAll(pageable).getContent();
	}
	
	@Override
	public boolean existsById(String id) {
		return repository.existsById(id);
	}

}
