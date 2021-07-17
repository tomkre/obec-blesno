import { TitleService } from './../service/title.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuItemService } from '../service/menu-item/menu-item.service';
import { ARTICLE_ID } from './article/article.component';

export const SECTION_ID = 'sectionId';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: [
	  '../../styles/container-with-side-menu.scss',
	  './section.component.scss'
	]
})
export class SectionComponent implements OnInit {

	sideMenu: MenuItem[];

	bgClass: any;

	title: string;

    constructor(private route: ActivatedRoute,
                private menuItemService: MenuItemService,
                private titleService: TitleService) { }

	ngOnInit(): void {
		this.route.paramMap.subscribe((params: ParamMap) => {
			const sectionId = params.get(SECTION_ID);
			this.bgClass = { [sectionId + '-section']: true };
			const sideMenuParent = this.menuItemService.getMenu(sectionId)[0];
			this.title = sideMenuParent.label;
			this.sideMenu = sideMenuParent.items as MenuItem[];
			this.route.firstChild.paramMap.subscribe((nestedParams: ParamMap) => {
				if (nestedParams.has(ARTICLE_ID)) {
                    const articleId = nestedParams.get(ARTICLE_ID);
                    const sideMenuItem = this.sideMenu.find(mi => mi.url === `${sectionId}/${articleId}`);
                    if (sideMenuItem) {
                        this.title = sideMenuItem.label;
                    }
				}
			});
        });
        this.titleService.emitter.subscribe((title: string) => this.title = title);
	}

}
