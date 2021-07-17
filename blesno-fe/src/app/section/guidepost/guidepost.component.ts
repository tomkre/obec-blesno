import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MenuItemService } from 'src/app/service/menu-item/menu-item.service';
import { MenuItem } from 'primeng/api';
import { SECTION_ID } from '../section.component';

@Component({
  selector: 'app-guidepost',
  templateUrl: './guidepost.component.html',
  styleUrls: [
	  '../../../styles/grid-menu.scss',
	  './guidepost.component.scss'
	]
})
export class GuidepostComponent implements OnInit {

	menuItems: MenuItem[];

	constructor(private route: ActivatedRoute, private menuItemService: MenuItemService) {
	}

	ngOnInit() {
		this.route.parent.paramMap.subscribe((params: ParamMap) => {
			const sectionId = params.get(SECTION_ID);
			this.menuItems = this.menuItemService.getMenu(sectionId, true)[0].items as MenuItem[];
		});
	}

}
