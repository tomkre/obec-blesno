export class Article {

	id: string;

	title: string;

	content: string;

	pubDate: Date;

	category: string;

	constructor(id: string = '', title: string = '', content: string = '', category: string = 'Obecné', pubDate: Date = new Date()) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.pubDate = pubDate;
		this.category = category;
	}
    
}