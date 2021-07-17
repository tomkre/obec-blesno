import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attachment } from 'src/app/model/attachment/attachment.model';
import { TreeNode } from 'primeng/api';
import { tap } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8080/attachments';

const SORT_BY_LABEL = (treeNode1: TreeNode, treeNode2: TreeNode) => {
	if (treeNode1.label < treeNode2.label) {
		return -1;
	} else if (treeNode1.label > treeNode2.label) {
		return 1;
	} else {
		return 0;
	}
};

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

   	constructor(private http: HttpClient) {}

	getByCategory(category: string, page: number = 0, limit: number = 10): Observable<Attachment[]> {
		const params = new HttpParams()
			.set('category', category)
			.set('page', String(page))
			.set('size', String(limit))
			.set('sort', 'pubDate,desc');
		return this.http.get<Attachment[]>(BASE_URL, { params });
	}
	
	countByCategory(category: string): Observable<number> {
		const params = new HttpParams().set('category', category);
		return this.http.get<number>(`${BASE_URL}/count`, { params });
	}
	
	getById(id: string): Observable<Attachment> {
		return this.http.get<Attachment>(`${BASE_URL}/${id}`);
	}
	
	save(attachment: Attachment): Observable<void> {
		return this.http.post<void>(`${BASE_URL}`, attachment);
	}
	
	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${BASE_URL}/${id}`);
	}
	
	getCategories(): Observable<string[]> {
		return this.http.get<string[]>(`${BASE_URL}/categories`);
	}

	getImages(): Observable<TreeNode[]> {
		return this.http.get<TreeNode[]>(`${BASE_URL}/images`).pipe(
			tap(treeNodes => treeNodes.sort(SORT_BY_LABEL))
		);
	}

}
