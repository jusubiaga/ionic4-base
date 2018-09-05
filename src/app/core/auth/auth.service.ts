import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as Rx from "rxjs";

interface AuthStatus {
    authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // Initial Status
    authStatusChanged = new Rx.BehaviorSubject<AuthStatus>({authenticated: false});

    token = {
        refresh_token: 'refreshtokencode',
        exp: new Date((new Date().getDate() + 1)),
        access_token: {
            username: 'user',
            roles: ['Admin', 'RegisteredUser', 'Super User']
        }
    };

    tokenKey: string = "a6smm_utoken"

    constructor(private router: Router) { }

    login(username, password) {
        this.setToken(this.token);
        this.authStatusChanged.next({authenticated: true});
    }

    logout() {
        this.removeToken();
        this.authStatusChanged.next({authenticated: false});
    }

    getToken() {
        return JSON.parse(localStorage.getItem(this.tokenKey));
    }

    setToken(token) {
        localStorage.setItem(this.tokenKey, JSON.stringify(token));
    }

    getAccessToken() {
        let token = localStorage.getItem(this.tokenKey);
        if (token) {
            return JSON.parse(token)['access_token'];
        }
        return null;
    }

    isAuthenticated() {
        let token = localStorage.getItem(this.tokenKey);

        if (token) {
            return true;
        }
        else {
            return false;
        }
    }

    refreshToken() {
        this.token.exp = new Date((new Date().getDate() + 1));
        this.setToken(this.token);
    }

    removeToken() {
        localStorage.removeItem(this.tokenKey);
    }

}
