import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
	
	constructor(private router: Router, private authService: AuthService) {}
	
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!this.authService.isLogged()) {
			const redirectUrl = this.getResolvedUrl(route);
			return this.router.parseUrl(`admin/login?redirectUrl=${redirectUrl}`);
		}
		return true;
    }

	private getResolvedUrl(route: ActivatedRouteSnapshot): string {
		return route.pathFromRoot
			.map(v => v.url.map(segment => segment.toString()).join('/'))
			.join('/');
	}
  
}
