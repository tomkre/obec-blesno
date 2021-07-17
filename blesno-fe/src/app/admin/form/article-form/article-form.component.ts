import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute,  } from '@angular/router';
import { SelectItem, LazyLoadEvent } from 'primeng/api';

import { Article } from 'src/app/model/article/article.model';
import { ArticleService, DocumentReference } from 'src/app/service/article/article.service';
import { ARTICLE_ID } from 'src/app/section/article/article.component';
import { Attachment } from 'src/app/model/attachment/attachment.model';
import { AttachmentService } from 'src/app/service/attachment/attachment.service';
import { Table } from 'primeng/table';
import { Observable, concat } from 'rxjs';
import { tap } from 'rxjs/operators';

export const NEW_ARTICLE_ID = 'new';

@Component({
	selector: 'app-article-form',
	templateUrl: './article-form.component.html',
	styleUrls: ['../form.scss', './article-form.component.scss']
})
export class ArticleFormComponent {

    editorConfig: any;

    assetsUploadUrl: string;

    documentReferences: DocumentReference[] = [];

    article: Article;

	categories: SelectItem[];

	attachments: Attachment[];

	numOfAttachments: number;

	attachmentsPerPage: number = 10;

	loadingAttachments: boolean = false;

	@ViewChild('attachmentsTable', { static: false })
	private attachmentsTable: Table;

	private articleId: string;

    constructor(private articleService: ArticleService,
				private attachmentService: AttachmentService,
				private router: Router,
				route: ActivatedRoute) {
        this.articleId = route.snapshot.paramMap.get(ARTICLE_ID);
		this.initCategories();
        this.initEditor();
		this.initArticle();
		this.initAttachments();
    }

	private initCategories() {
		this.articleService.getCategories().subscribe(categoryNames => {
				this.categories = categoryNames.map(categoryName => 
					new Object({ label: categoryName, value: categoryName }) as SelectItem)
			});
	}

	private initEditor() {
		this.assetsUploadUrl =  `http://localhost:8080/articles/${this.articleId}/assets`;
        this.editorConfig = {
            height: 500,
            plugins: [
                'lists image',
                'table link autolink hr'
            ],
            toolbar: `
                undo redo |
                formatselect |
                bold italic underline |
                hr |
                alignleft aligncenter alignright alignjustify |
                bullist numlist |
                outdent indent |
                image link table
            `,
            images_upload_url: this.assetsUploadUrl,
            file_picker_types: 'file',
            content_css: '/assets/public-styles/tinymce-custom.css'
        };
	}
	
	private initArticle() {
		if (this.articleId === NEW_ARTICLE_ID) {
			this.article = new Article();
		} else {
	       this. articleService.getById(this.articleId).subscribe(article => {
	            this.article = article;
	            this.updateDocumentReferences();
	        });
		}	
	}

    private updateDocumentReferences() {
        this.articleService
            .loadDocumentReferences(this.article.id)
            .subscribe(refs => {
                this.documentReferences = refs;
            });
    }

	private initAttachments() {
		this.updateNumOfAttachments().subscribe();
	}

	private updateNumOfAttachments(): Observable<number> {
		return this.attachmentService.countByCategory(this.articleId).pipe(
			tap(count => {
				this.numOfAttachments = count;
			})
		);
	}

	loadAttachments(event: LazyLoadEvent) {
		const page = Math.floor(event.first / this.attachmentsPerPage);
		this.attachmentService.getByCategory(this.articleId, page).subscribe((attachments: Attachment[]) => {
			this.attachments = attachments;
		});
	}

    handleDocumentUpload(event: any) {
        const name = event.files[0].name;
        const url = event.originalEvent.body.location;
        this.documentReferences.push({ name, url });
    }

    deleteDocument(name: string) {
        this.articleService.deleteDocument(this.article.id, name)
            .subscribe(() => this.updateDocumentReferences());
    }

	createNewAttachment() {
		this.router.navigate(['/admin/attachments/new'], { queryParams: { category: this.article.id } });
	}

	deleteAttachment(id: string) {
		concat(
			this.attachmentService.delete(id),
			this.updateNumOfAttachments()
		).subscribe(() => {
			this.attachmentsTable.reset();
		});
	}

	save() {
		if (!this.article.id) {
			this.article.id = this.article.title
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '')
				.replace(/\s/g, '-')
				.toLowerCase();
		}
		this.articleService.save(this.article).subscribe(() => {
			this.router.navigateByUrl('/admin/articles');
		});
	}

	back() {
		this.router.navigateByUrl('/admin/articles');
	}

}
