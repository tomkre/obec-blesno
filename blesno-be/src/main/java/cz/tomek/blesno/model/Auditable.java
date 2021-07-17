package cz.tomek.blesno.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * Represents an entity with auditable data.
 * 
 * @author tomek
 *
 */
@NoArgsConstructor
@Getter @Setter
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auditable extends AppEntity {

	@CreatedDate
	@Column(columnDefinition = "timestamp default '2021-01-01 00:00:00'")
	private LocalDateTime createdDate;
	
	@CreatedBy
	@Column(columnDefinition = "varchar default 'admin'")
	private String createdBy;
	
	@LastModifiedDate
	private LocalDateTime updatedDate;
	
	@LastModifiedBy
	private String updatedBy;
	
}
