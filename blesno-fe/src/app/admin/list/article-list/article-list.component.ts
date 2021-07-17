import { Component, ViewChild } from '@angular/core';
import { ArticleService } from 'src/app/service/article/article.service';
import { Article } from 'src/app/model/article/article.model';
import { SelectItem, LazyLoadEvent } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NEW_ARTICLE_ID } from '../../form/article-form/article-form.component';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { Table } from 'primeng/table';

export const ENTITIES = 'entities';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['../list.scss', './article-list.component.scss']
})
export class ArticleListComponent {

    articles: Article[];

    categories: SelectItem[];

	loading: boolean = true;
	
	numOfArticles: number = -1;
	
	activeCategory: string;
	
	activeLazyLoadEvent: LazyLoadEvent;
	
	@ViewChild('table', { static: false })
	table: Table;

	constructor(private articleService: ArticleService, 
				private router: Router, 
				private route: ActivatedRoute) {}
	
	private loadCategories(): Observable<string[]> {
        return this.articleService.getCategories().pipe(
			tap(categories => {
				this.categories = categories.map(c => ({ label: c, value: c }));
				this.activeCategory = this.categories[0].value;
	 		})
		);
	}

	private loadNumOfArticles(): Observable<number> {
		return this.articleService.countByCategory(this.activeCategory).pipe(
			tap(numOfArticles => {
				this.numOfArticles = numOfArticles;
			})
		);
	}
	
	loadArticles(event: LazyLoadEvent) {
		let preTask: Observable<any>;
		if (!this.activeCategory || this.numOfArticles < 0) {
			preTask = this.loadCategories().pipe(
				switchMap(() => this.loadNumOfArticles())
			);
		} else {
			preTask = of(true);
		}
		preTask.subscribe(() => {
			this.loadArticlesInternal(event);
		});
	}
	
	private loadArticlesInternal(event: LazyLoadEvent) {
		this.activeLazyLoadEvent = event;
		const page = Math.floor(event.first / 10);
		const size = event.rows;
		this.loading = true;
        this.articleService.getByCategory(this.activeCategory, page, size)
			.subscribe(articles => {
				this.articles = articles;
				this.loading = false;
			});
	}

    handleCategoryChange({ value: category }) {
		this.activeCategory = category;
		this.loadNumOfArticles().subscribe(() => {
			this.table.reset();
		});
    }

	createNew() {
		this.router.navigate([NEW_ARTICLE_ID], { relativeTo: this.route });
	}
	
	deleteArticle(id: string) {
		this.articleService.delete(id).subscribe(() => {
			this.loadArticlesInternal(this.activeLazyLoadEvent);
		});
	}

}
