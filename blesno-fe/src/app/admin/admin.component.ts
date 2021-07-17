import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

export const ADMIN_MENU_ITEMS: MenuItem[] = [
	{ url: '/admin/menu-items', label: 'Položky menu' },
	{ url: '/admin/articles', label: 'Články' },
	{ url: '/admin/attachments', label: 'Přílohy' },
	{ url: '/admin/events', label: 'Události' }
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
	  '../../styles/container-with-side-menu.scss',
	  './admin.component.scss'
	]
})
export class AdminComponent {

	menuItems = ADMIN_MENU_ITEMS;

}
