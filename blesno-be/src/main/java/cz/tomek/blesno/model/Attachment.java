package cz.tomek.blesno.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

/**
 * Represents an attachment attached to an article.
 * 
 * @author tomek
 *
 */
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@ToString
@Entity
public class Attachment extends Auditable {
	
	private static final String PDF_EXTENSION = ".pdf";
	
	private static final String DOC_EXTENSION = ".doc";

	private String name;
	
	private String category;
	
	private LocalDateTime pubDate;
	
	private String imageUrl;
	
	private String contentUrl;
	
	@Transient
	private long size;

	@ManyToOne
	@JoinColumn(name = "article_id")
	private Article article;
	
	public boolean isFile() {
		return contentUrl.endsWith(PDF_EXTENSION) || contentUrl.endsWith(DOC_EXTENSION);
	}

}
