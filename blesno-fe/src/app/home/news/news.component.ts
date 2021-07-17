import { Component } from '@angular/core';
import { Article } from 'src/app/model/article/article.model';
import { ArticleService } from 'src/app/service/article/article.service';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss']
})
export class NewsComponent {

	news: Article[];

	constructor(articleService: ArticleService) {
		articleService.getNewest().subscribe(articles => this.news = articles);
	 }

}
