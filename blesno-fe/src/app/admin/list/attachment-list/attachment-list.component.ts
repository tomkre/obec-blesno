import { Component, OnInit, ViewChild } from '@angular/core';
import { AttachmentService } from 'src/app/service/attachment/attachment.service';
import { Attachment } from 'src/app/model/attachment/attachment.model';
import { SelectItem, LazyLoadEvent } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { NEW_ATTACHMENT_ID } from 'src/app/admin/form/attachment-form/attachment-form.component';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Table } from 'primeng/table';

@Component({
	selector: 'app-attachment-list',
	templateUrl: './attachment-list.component.html',
	styleUrls: ['../list.scss', '/attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit {

	attachments: Attachment[];
	
	categories: SelectItem[] = [];
	
	loading: boolean = true;
	
	numOfAttachments: number = -1;
	
	activeCategory: string;
	
	activateLazyLoadEvent: LazyLoadEvent;
	
	@ViewChild('table', { static: false })
	table: Table;

	constructor(private attachmentService: AttachmentService,
				private router: Router,
				private route: ActivatedRoute) {}

	ngOnInit() {
		this.loadCategories();
	}
	
	private loadCategories(): Observable<string[]> {
		return this.attachmentService.getCategories().pipe(
			tap(categories => {
				this.categories = categories
					.map(category => new Object({ label: category, value: category })) as SelectItem[];
				this.activeCategory = this.categories[0].value;
			})
		);
	}
	
	private loadNumOfAttachments(): Observable<number> {
		return this.attachmentService.countByCategory(this.activeCategory).pipe(
			tap(numOfAttachments => this.numOfAttachments = numOfAttachments)
		)
	}
	
	private loadAttachments(event: LazyLoadEvent) {
		let preTask: Observable<any>;
		if (!this.activeCategory || this.numOfAttachments < 0) {
			preTask = this.loadCategories().pipe(
				switchMap(() => this.loadNumOfAttachments())
			);
		} else {
			preTask = of(true);
		}
		preTask.subscribe(() => {
			this.loadAttachmentsInternal(event);
		});
	}
	
	private loadAttachmentsInternal(event: LazyLoadEvent) {
		this.activateLazyLoadEvent = event;
		const page = Math.floor(event.first / 10);
		const size = event.rows;
		this.loading = true;
		this.attachmentService.getByCategory(this.activeCategory, page, size).subscribe(attachments => {
			this.attachments = attachments;
			this.loading = false;
		});
		
	}
	
	handleCategoryChange({ value: category }) {
		this.activeCategory = category;
		this.loadNumOfAttachments().subscribe(() => {
			this.table.reset();
		});
	}
	
	createNew() {
		this.router.navigate([NEW_ATTACHMENT_ID], { relativeTo: this.route });
	}

}
