import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

	externalLinks: MenuItem[];

	constructor(private authService: AuthService, private router: Router) {
		this.initExternalLinks();
	}

	initExternalLinks() {
		this.externalLinks = [
			{ label: 'Mikroregion Třebechovicko', url: 'http://www.trebechovicko.cz', icon: 'pi pi-caret-right' },
			{ label: 'Královehradecký kraj', url: 'http://www.kr-kralovehradecky.cz', icon: 'pi pi-caret-right' },
			{ label: 'FC Blešno', url: 'https://fcblesno.cz', icon: 'pi pi-caret-right' }
		];
    }

    logout() {
        this.authService.logout();
		this.router.navigateByUrl('/admin/login');
    }

}
