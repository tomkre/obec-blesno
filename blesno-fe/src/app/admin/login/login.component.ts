import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    username: string;

    password: string;

	loginFailed = false;

    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

    login() {
        this.authService.login(this.username, this.password).subscribe(() => {
			const redirectUrl = this.route.snapshot.queryParamMap.get('redirectUrl');
			this.router.navigateByUrl(redirectUrl);
		}, () => {
			this.loginFailed = true;
		});
    }

}
