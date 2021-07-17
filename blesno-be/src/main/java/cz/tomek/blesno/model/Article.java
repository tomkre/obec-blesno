package cz.tomek.blesno.model;

import java.time.LocalDateTime;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Article.
 * 
 * @author tomek
 *
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@ToString(exclude = "content")
@Entity
public class Article {
	
	@Id
	private String id;

	private String title;
	
	private String category;

	private String rootCategory;

	private LocalDateTime pubDate;
	
	@Column(columnDefinition = "text")
	private String content;
	
	@OneToMany(mappedBy = "article")
	private List<Attachment> attachments;
	
}
