import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuItemService } from '../service/menu-item/menu-item.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	officeMenu: MenuItem[];

	municipalityMenu: MenuItem[];

	lifeMenu: MenuItem[];

	constructor(private menuItemService: MenuItemService) {
		this.initMenus();
	}

	initMenus() {
        const icon = 'pi pi-caret-right';
        this.officeMenu = this.menuItemService.getMenu('obecni-urad', true, icon);
        this.municipalityMenu = this.menuItemService.getMenu('obec-blesno', true, icon);
        this.lifeMenu = this.menuItemService.getMenu('zivot-v-obci', true, icon);
        [this.officeMenu, this.municipalityMenu, this.lifeMenu].forEach((menu: MenuItem[]) => {
            menu[0].items = menu[0].items.slice(0, 10);
        });
	}

}
