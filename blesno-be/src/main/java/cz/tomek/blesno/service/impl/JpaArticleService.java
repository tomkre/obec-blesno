package cz.tomek.blesno.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import cz.tomek.blesno.model.Article;
import cz.tomek.blesno.repository.ArticleRepository;
import cz.tomek.blesno.service.ArticleService;

/**
 * Default implementation of {@link ArticleService}.
 * 
 * @author tomek
 *
 */
@Service
public class JpaArticleService implements ArticleService {
	
	@Autowired
	private ArticleRepository articleRepository;

	@Override
	public Article save(Article article) {
		return articleRepository.save(article);
	}
	
	@Override
	public void delete(String id) {
		articleRepository.deleteById(id);
	}

	@Override
	public boolean existsById(String id) {
		return articleRepository.existsById(id);
	}

	@Override
	public Optional<Article> findOne(String id) {
		return articleRepository.findById(id);
	}

	@Override
	public List<Article> getAll(Pageable pageable) {
		return articleRepository.findAll(pageable).getContent();
	}

	@Override
	public List<String> getIdsByPrefix(String prefix) {
		return articleRepository.findIdByIdStartsWith(prefix);
	}

	@Override
	public List<Article> getByCategory(String category, Pageable pageable) {
		return articleRepository.findByCategory(category, pageable);
	}
	
	@Override
	public long countByCategory(String category) {
		return articleRepository.countByCategory(category);
	}

	@Override
	public List<String> getCategories() {
		return articleRepository.findDistinctCategories();
	}

}
