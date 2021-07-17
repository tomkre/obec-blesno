import { Article } from '../article/article.model';

export class Attachment {
	
	id: string;
	
	name: string;
	
	category: string;

	pubDate: Date;
	
	imageUrl: string;
	
	contentUrl: string;

	size: number;

	createdBy: string;
	
	article: Article = new Article();

}
