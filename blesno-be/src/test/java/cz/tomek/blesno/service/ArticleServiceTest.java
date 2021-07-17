package cz.tomek.blesno.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;

import cz.tomek.blesno.model.Article;
import cz.tomek.blesno.service.impl.JpaArticleService;

@RunWith(SpringRunner.class)
@DataJpaTest
@Import(JpaArticleService.class)
public class ArticleServiceTest {
	
	@Autowired
	private ArticleService articleService;
	
	@Test
	public void shouldSaveArticle() {
		String articleId = "id";
		Article article = Article.builder().id(articleId).build();
		articleService.save(article);
		assertTrue("Saved article should exist in a storage!", articleService.existsById(articleId));
	}
	
	@Test
	public void shouldDeleteArticle() {
		String articleId = "id";
		Article article = Article.builder().id(articleId).build();
		articleService.save(article);
		articleService.delete(articleId);
		assertFalse("Removed article should not exist in a storage!", articleService.existsById(articleId));
	}

	@Test
	public void shouldGetArticleById() {
		String articleId = "id";
		Article article = Article.builder().id(articleId).build();
		articleService.save(article);
		Article fromDb = articleService.findOne(articleId).orElse(null);
		assertNotNull("Found article should not be null!", fromDb);
	}
	
	@Test
	@Sql("classpath:sql/ArticleServiceTest.sql")
	public void shouldGetNewestArticles() {
		Pageable pageRequest = PageRequest.of(0, 2, Direction.DESC, "pubDate");
		List<Article> articles = articleService.getAll(pageRequest);
		assertThat(articles)
			.extracting("id")
			.containsExactly("a1", "a2");
	}
	
	@Test
	@Sql("classpath:sql/ArticleServiceTest.sql")
	public void shouldGetArticlesByCategory() {
		Pageable pageRequest = PageRequest.of(0, 10, Direction.DESC, "pubDate");
		List<Article> articles = articleService.getByCategory("c1", pageRequest);
		assertThat(articles)
			.extracting("id")
			.containsExactly("a1", "a2");
	}
	
	@Test
	@Sql("classpath:sql/ArticleServiceTest.sql")
	public void shouldGetArticleCountByCategory() {
		long count = articleService.countByCategory("c1");
		assertThat(count).isEqualTo(2);
	}
	
	@Test
	@Sql("classpath:sql/ArticleServiceTest.sql")
	public void shouldGetCategories() {
		List<String> categories = articleService.getCategories();
		assertThat(categories).containsExactly("c1", "c2");
	}
	
	@Test
	@Sql("classpath:sql/ArticleServiceTest.sql")
	public void shouldGetIdsByPrefix() {
		List<String> ids = articleService.getIdsByPrefix("a");
		assertThat(ids).containsExactly("a1", "a2", "a3");
	}

}
