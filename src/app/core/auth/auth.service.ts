import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
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

    constructor(private router: Router, private storage: Storage, private platform: Platform) { 
        this.platform.ready().then(() => {
            console.log('Auth Service Ready')
            this.checkToken();
        })
    }

    login(username, password) {
        this.setToken(this.token).subscribe(() => {
            this.authStatusChanged.next({authenticated: true});
        });        
    }

    logout() {
        this.removeToken().subscribe(() => {
            this.authStatusChanged.next({authenticated: false});
        })
        
    }

    getToken() {
        return Rx.of(this.storage.get(this.tokenKey));
    }

    private setToken(token) {
        return Rx.of(this.storage.set(this.tokenKey, JSON.stringify(token)));
    }

    getAccessToken() {
        let token = localStorage.getItem(this.tokenKey);
        if (token) {
            return JSON.parse(token)['access_token'];
        }
        return null;
    }

    isAuthenticated() {
        const authStatus = this.authStatusChanged.value;
        return authStatus.authenticated ? authStatus.authenticated : false;
    }

    refreshToken() {
        this.token.exp = new Date((new Date().getDate() + 1));
        this.setToken(this.token);
    }

    private removeToken() {
        return Rx.of(this.storage.remove(this.tokenKey));
    }

    private checkToken() {
        this.storage.get(this.tokenKey).then((token) => {
            if (token) {
                this.authStatusChanged.next({authenticated: true})
            }            
        })
    }
}
