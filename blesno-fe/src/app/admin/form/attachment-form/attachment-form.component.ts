import { Component, ViewChild } from '@angular/core';
import { Attachment } from 'src/app/model/attachment/attachment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachmentService } from 'src/app/service/attachment/attachment.service';
import { SelectItem, TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { OverlayPanel } from 'primeng/overlaypanel';
import { ArticleService } from 'src/app/service/article/article.service';

export const ATTACHMENT_ID = 'attachmentId';

export const NEW_ATTACHMENT_ID = 'new';

const ASSETS_URL = 'http://localhost:8080';

@Component({
  selector: 'app-attachment-form',
  templateUrl: './attachment-form.component.html',
  styleUrls: ['../form.scss', './attachment-form.component.scss']
})
export class AttachmentFormComponent {
	
	attachment: Attachment = new Attachment();
	
	attachmentId: string;
	
	categories: SelectItem[];
	
	images: TreeNode[];
	
	selectedImages: TreeNode[];
	
	pathToSelectedImage: string = 'Please select an image!'

	@ViewChild('imagesOverlayPanel', { static: false })
	imagesOverlayPanel: OverlayPanel;

	articleIdsSuggestions: string[];

	constructor(private attachmentService: AttachmentService,
				private articleService: ArticleService,
				private router: Router,
				private route: ActivatedRoute) {
		this.attachmentId = this.route.snapshot.paramMap.get(ATTACHMENT_ID);
		this.initCategories().subscribe(() => {
			this.initAttachment();
		});
		this.initImagesTree();
	}
	
	private initCategories(): Observable<string[]> {
		return this.attachmentService.getCategories().pipe(
			tap(categoryNames => {
				this.categories = categoryNames
					.map(category => new Object({ label: category, value: category }) as SelectItem);
			})
		);
	}
	
	private initAttachment(): void {
		if (this.isNewAttachment()) {
			this.attachment.category = this.categories[0].value;
		} else {
			this.attachmentService.getById(this.attachmentId).subscribe(attachment => {
				this.attachment = attachment;
			})
		}
	}
	
	private isNewAttachment() {
		return this.attachmentId === NEW_ATTACHMENT_ID;
	}

	private initImagesTree() {
		this.attachmentService.getImages().pipe(
			tap(treeNodes => treeNodes.forEach(treeNode => {
				treeNode.data = `${treeNode.label}-data`;
				treeNode.collapsedIcon = 'pi pi-folder';
				treeNode.expandedIcon = 'pi pi-folder-open';
			}))
		).subscribe(treeNodes => this.images = treeNodes);
	}

	selectImage(event: any) {
		if (this.selectedImages.length === 2) {
			this.selectedImages.shift();
		}
		const node = event.node;
		this.pathToSelectedImage = `articles/${node.parent.label}/assets/${node.label}`;
		this.attachment.imageUrl = this.pathToSelectedImage;
	}

	showImageTree(event: any) {
		this.imagesOverlayPanel.toggle(event);
	}

	searchArticles(event: any) {
		const query = event.query;
		this.articleService.getIdsByPrefix(query).subscribe(articleIds => {
			this.articleIdsSuggestions = articleIds;
		});
	}

	save() {
		if (this.isNewAttachment()) {
			this.attachment.id = 
				this.attachment.name
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.replace(/\s/g, '-')
					.toLowerCase();
		}
		this.attachmentService.save(this.attachment).subscribe(() => {
			this.router.navigateByUrl('/admin/attachments');
		})
	}
	
	back() {
		this.router.navigateByUrl('/admin/attachments');
	}

}
