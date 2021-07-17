package cz.tomek.blesno.controller;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import cz.tomek.blesno.model.Article;
import cz.tomek.blesno.service.ArticleService;

@RunWith(SpringRunner.class)
@WebMvcTest(controllers = ArticleController.class, secure = false)
public class ArticleControllerTest {
	
	private static final String CONTEXT_URL = "/articles";
	
	private static final String ARTICLE_ID = "1";
	
	private static final String ARTICLE_TITLE = "title";
	
	private static final String ARTICLE_CONTENT = "content";
	
	private static final Article ARTICLE = 
		Article.builder().id(ARTICLE_ID).title(ARTICLE_TITLE).content(ARTICLE_CONTENT).build();
	
	private static final String ARTICLE_URL = CONTEXT_URL + "/" + ARTICLE_ID;
	
	@Autowired
	private MockMvc mockMvc;
	
	@MockBean
	private ArticleService articleService;
	
	private ObjectMapper mapper = new ObjectMapper();
	
	@Test
	public void shouldGetArticleWhenArticleIsFound() throws Exception {
		when(articleService.findOne(ARTICLE_ID)).thenReturn(Optional.of(ARTICLE));
		mockMvc
			.perform(get(ARTICLE_URL))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.title", equalTo(ARTICLE_TITLE)))
			.andExpect(jsonPath("$.content", equalTo(ARTICLE_CONTENT)));
		verify(articleService).findOne(ARTICLE_ID);
	}
	
	@Test
	public void shouldReturnNotFoundStatusWhenArticleIsNotFound() throws Exception {
		when(articleService.findOne(ARTICLE_ID)).thenReturn(Optional.empty());
		mockMvc
			.perform(get(ARTICLE_URL))
			.andExpect(status().isNotFound());
		verify(articleService).findOne(ARTICLE_ID);
	}
	
	@Test
	public void shouldSaveArticle() throws Exception {
		mockMvc
			.perform(post(CONTEXT_URL).contentType(MediaType.APPLICATION_JSON).content(mapper.writeValueAsString(ARTICLE)))
			.andExpect(status().isCreated())
			.andExpect(header().string(HttpHeaders.LOCATION, endsWith(ARTICLE_URL)));
		verify(articleService).save(ARTICLE);
	}
	
	@Test
	public void shouldDeleteArticle() throws Exception {
		mockMvc
			.perform(delete(ARTICLE_URL))
			.andExpect(status().isNoContent());
		verify(articleService).delete(ARTICLE_ID);
	}
	
	@Test
	public void shouldGetNewestArticles() throws Exception {
		Pageable pageRequest = PageRequest.of(0, 2, Direction.DESC, "pubDate");
		mockMvc
			.perform(
				get(CONTEXT_URL)
				.param("sort", "pubDate,desc")
				.param("page", "0")
				.param("size", "2")
			).andExpect(status().isOk());
		verify(articleService).getAll(pageRequest);
	}
	
	@Test
	public void shouldGetArticlesByCategory() throws Exception {
		Pageable pageRequest = PageRequest.of(0, 10, Direction.DESC, "pubDate");
		String category = "c1";
		mockMvc
			.perform(
				get(CONTEXT_URL)
				.param("sort", "pubDate,desc")
				.param("page", "0")
				.param("size", "10")
				.param("category", category)
			).andExpect(status().isOk());
		verify(articleService).getByCategory(category, pageRequest);
	}
	
	@Test
	public void shouldGetCountByCategory() throws Exception {
		String category = "c1";
		mockMvc.perform(
			get(CONTEXT_URL + "/count")
			.param("category", category)
		).andExpect(status().isOk());
		verify(articleService).countByCategory(category);
	}
	
	@Test
	public void shouldGetCategories() throws Exception {
		when(articleService.getCategories()).thenReturn(Arrays.asList("c1", "c2"));
		mockMvc.perform(
			get(CONTEXT_URL + "/categories")
		).andExpect(status().isOk())
		.andExpect(jsonPath("$[0]", equalTo("c1")))
		.andExpect(jsonPath("$[1]", equalTo("c2")));
	}

	@Test
	public void shouldGetIdsByPrefix() throws Exception {
		when(articleService.getIdsByPrefix(anyString())).thenReturn(Arrays.asList("a1", "a2", "a3"));
		mockMvc.perform(get(CONTEXT_URL + "/ids").param("prefix", anyString()))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$[0]", equalTo("a1")))
			.andExpect(jsonPath("$[1]", equalTo("a2")))
			.andExpect(jsonPath("$[2]", equalTo("a3")));
	}

}
