package cz.tomek.blesno.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import cz.tomek.blesno.model.AppEntity;

/**
 * Repository for {@link AppEntity} entites.
 * 
 * @author tomek
 *
 */
public interface AppEntityRepository<T extends AppEntity> extends JpaRepository<T, String> {

}
