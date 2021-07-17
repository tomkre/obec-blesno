import { TitleService } from './../../service/title.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/service/article/article.service';
import { Article } from 'src/app/model/article/article.model';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Attachment } from 'src/app/model/attachment/attachment.model';
import { AttachmentService } from 'src/app/service/attachment/attachment.service';
import { LazyLoadEvent } from 'primeng/api';

export const ARTICLE_ID = 'articleId';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {

	readonly apiUrl = 'http://localhost:8080';

	articleId: string;

	article: Article;

	numOfAttachments: number = 0;

	attachments: Attachment[];

	constructor(private articleService: ArticleService,
				private attachmentService: AttachmentService,
				private route: ActivatedRoute,
				private titleService: TitleService) {
		this.loadArticle();
	}

	loadArticle() {
		this.route.paramMap.subscribe(params => {
			this.articleId = params.get(ARTICLE_ID);
			this.articleService.getById(this.articleId).pipe(
				catchError(() => of(new Article('', '', 'Článek nenalezen.')))
			)
			.subscribe(article => {
                if (article.title) {
                    this.titleService.emitter.emit(article.title);
                }
                this.article = article;
            });
			this.loadNumOfAttachments();
		});
	}

	loadNumOfAttachments() {
		this.attachmentService.countByCategory(this.articleId).subscribe(numOfAttachments => {
			this.numOfAttachments = numOfAttachments;
		});
	}

	loadAttachments(event: LazyLoadEvent) {
		const page = Math.floor(event.first / event.rows);
		this.attachmentService.getByCategory(this.articleId, page).subscribe(attachments => {
			this.attachments = attachments;
		});
	}

	get showAttachmentsTable() {
		return this.numOfAttachments > 0;
	}

	getAssetUrl(pathToAsset: string) {
		return `${this.apiUrl}${pathToAsset}`;
	}

	isAttachmentFile(url: string): boolean {
		return url.endsWith('.pdf') || url.endsWith('.doc');
	}

	getFileType(url: string) {
		return url.slice(url.indexOf('.') + 1).toUpperCase();
	}

}

