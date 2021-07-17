package cz.tomek.blesno.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import cz.tomek.blesno.model.Article;
import cz.tomek.blesno.service.ArticleService;
import lombok.extern.slf4j.Slf4j;

/**
 * Controller exposing rest services for managing {@link Article} entities.
 * 
 * @author tomek
 *
 */
@RestController
@RequestMapping("articles")
@Slf4j
public class ArticleController {
	
	@Autowired
	private ArticleService articleService;
	
	@GetMapping("{id}")
	public ResponseEntity<Article> getOne(@PathVariable String id) {
		log.debug("getOne(): {}", id);
		return articleService
				.findOne(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public List<Article> getAll(Pageable pageable) {
		log.debug("getAll(): {}", pageable);
		return articleService.getAll(pageable);
	}
	
	@GetMapping(value = "ids", params = "prefix")
	public List<String> getIdsByPrefix(@RequestParam String prefix) {
		return articleService.getIdsByPrefix(prefix);
	}

	@GetMapping(params = "category")
	public List<Article> getAllByCategory(@RequestParam String category, Pageable pageable) {
		log.debug("getAllByCategory(): [category: {}], {}", category, pageable);
		return articleService.getByCategory(category, pageable);
	}
	
	@GetMapping(value = "count", params = "category")
	public long countByCategory(@RequestParam String category) {
		log.debug("countByCategory(): [category={}]", category);
		return articleService.countByCategory(category);
	}
	
	@PostMapping
	public ResponseEntity<Void> save(@RequestBody Article article, UriComponentsBuilder uriBuilder) {
		articleService.save(article);
		log.debug("Article '{}' has been successfully saved", article.getId());
		return ResponseEntity
				.created(uriBuilder.path("/articles/" + article.getId()).build(new Object[] {}))
				.build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> delete(@PathVariable String id) {
		articleService.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@GetMapping("categories")
	public List<String> getAllCategories() {
		return articleService.getCategories();
	}
	
}
