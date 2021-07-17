import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const AUTH_URL = 'http://localhost:8080/auth';
const LOGIN_URL = `${AUTH_URL}/login`;
export const USER = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(user: string, password: string): Observable<any> {
		console.log('login');
        const authToken = btoa(`${user}:${password}`);
        const headers = new HttpHeaders()
            .set('Authorization', `Basic ${authToken}`);
        return this.http.get(LOGIN_URL, { headers }).pipe(
            tap(() => {
                console.log(`User ${user} has been successfully logged in`);
                localStorage.setItem('user', user);
            })
        );
    }

    logout(): void {
        const loggedUser = localStorage.getItem(USER);
        localStorage.removeItem(USER);
        console.log(`User ${loggedUser} has been successfully logged out`);
    }

    isLogged(): boolean {
        const loggedUser = localStorage.getItem(USER);
        if (loggedUser) {
            return true;
        }
        return false;
    }
}
