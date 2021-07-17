import { Component, } from '@angular/core';
import { ADMIN_MENU_ITEMS } from '../admin.component';

@Component({
  selector: 'app-admin-guidepost',
  templateUrl: './admin-guidepost.component.html',
  styleUrls: [
	  '../../../styles/grid-menu.scss',
	  './admin-guidepost.component.scss'
	]
})
export class AdminGuidepostComponent {

	menuItems = ADMIN_MENU_ITEMS;

}
