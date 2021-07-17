import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService, USER } from './service/auth/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

	title = 'blesno-fe';

	images: any[] = [];

	links: MenuItem[];

    constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.initGallery();
		this.initLinks();
    }

    ngOnDestroy(): void {
        this.authService.logout();
    }

	initGallery() {
		for (let i = 1; i <= 3; i++) {
			this.images.push({ source: `assets/gallery-item-${i}.jpg`, title: `Gallery Item ${i}` });
		}
	}

	initLinks() {
		this.links = [
			{ url: 'obecni-urad', label: 'Obecní úřad', styleClass: 'first-xxxxxxx' },
			{ url: 'obec-blesno', label: 'Obec Blešno' },
			{ url: 'zivot-v-obci', label: 'Život v obci' }
		];
	}

}
