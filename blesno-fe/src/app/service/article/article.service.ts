import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/model/article/article.model';

const BASE_URL = 'http://localhost:8080/articles';

export interface DocumentReference {

    name: string;

    url: string;

}

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private http: HttpClient) {}

	getAll(limit = 100): Observable<Article[]> {
        return this.http.get<Article[]>(BASE_URL, {
            params: {
                sort: 'title,desc',
                page: '0',
                size: String(limit)
            }
        });
	}

	getIdsByPrefix(prefix: string): Observable<string[]> {
		const params = new HttpParams().set('prefix', prefix);
		return this.http.get<string[]>(`${BASE_URL}/ids`, { params });
	}

	getNewest(limit = 4): Observable<Article[]> {
		return this.getByCategory('novinky', 0, limit);
	}

	getByCategory(category: string, page: number = 0, limit: number = 10): Observable<Article[]> {
		return this.http.get<Article[]>(BASE_URL, {
			params: {
				sort: 'pubDate,desc',
				page: '' + page,
				size: '' + limit,
				category
			}
		});
	}
	
	countByCategory(category: string): Observable<number> {
		const params = new HttpParams().set('category', category);
		return this.http.get<number>(`${BASE_URL}/count`, { params });
	}

	getById(id: string): Observable<Article> {
		return this.http.get<Article>(`${BASE_URL}/${id}`);
	}

	save(article: Article): Observable<void> {
		return this.http.post<void>(BASE_URL, article);
	}

	delete(id: string): Observable<void> {
		return this.http.delete<void>(`${BASE_URL}/${id}`);
    }

    loadDocumentReferences(id: string): Observable<DocumentReference[]> {
        return this.http.get<DocumentReference[]>(`${BASE_URL}/${id}/assets`, {
            params: {
                type: 'references'
             }
        });
    }

    deleteDocument(id: string, docName: string): Observable<void> {
        return this.http.delete<void>(`${BASE_URL}/${id}/assets/${docName}`);
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(`${BASE_URL}/categories`);
    }

}
