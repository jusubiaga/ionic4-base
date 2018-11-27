import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as Rx from "rxjs";
import { AngularFireAuth } from '@angular/fire/auth';

export enum AUTH_STATE {
    CHECKING_USER,
    AUTHENTICATING,
    AUTHORIZATING,
    DONE
}

interface AuthStatus {
    state?: AUTH_STATE;
    authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    // Initial Status
    authStatusChanged = new Rx.BehaviorSubject<AuthStatus>({state: AUTH_STATE.CHECKING_USER, authenticated: false}); 

    token = {
        refresh_token: 'refreshtokencode',
        exp: new Date((new Date().getDate() + 1)),
        access_token: {
            username: 'user',
            roles: ['Admin', 'RegisteredUser', 'Super User']
        }
    };

    tokenKey: string = "currentUser"

    constructor(private router: Router, private storage: Storage, private platform: Platform, private angularFireAuth : AngularFireAuth) {
        this.angularFireAuth.auth.onAuthStateChanged((firebaseUser) => {
            console.log('onAuthStateChanged!');
            if(firebaseUser) {
                console.log('Logged In!');
                console.log(firebaseUser);
                this.validateUser(firebaseUser)
                .then((user) => {
                    this.authStatusChanged.next({state: AUTH_STATE.DONE, authenticated: true});
                })
                .catch((err) => {
                    console.log(err);
                    this.signOut();
                })
                
            } else {
                console.log('Logged Out!');
                this.authStatusChanged.next({state: AUTH_STATE.DONE, authenticated: false});
            }
        })

        this.platform.ready().then(() => {
            console.log('Auth Service Ready');
        })
    }

    signInWithEmailAndPassword(username, password) {
        this.authStatusChanged.next({state: AUTH_STATE.AUTHENTICATING, authenticated: false});
        this.angularFireAuth.auth.signInWithEmailAndPassword(username, password)
        .catch((err) => {
            console.log(err);
        })
    }

    signOut() {
        this.angularFireAuth.auth.signOut();
    }

    async validateUser(firebaseUser) {
        console.log('Validating user ...');
        this.authStatusChanged.next({state: AUTH_STATE.AUTHORIZATING, authenticated: false});
        const token = await firebaseUser.getIdToken();
        console.log(token);
        return true;
    }

    registerUser (user) {
        // TBD
        console.log(user);
        this.angularFireAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .catch((err) => {
            if (err.code == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(err.message);
            }
            console.log(err);
        });
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
        // const authStatus = this.authStatusChanged.value;
        // return authStatus.authenticated ? authStatus.authenticated : false;
        return this.angularFireAuth.auth.currentUser !== null;
    }

    refreshToken() {
        this.token.exp = new Date((new Date().getDate() + 1));
        this.setToken(this.token);
    }

    private removeToken() {
        return Rx.of(this.storage.remove(this.tokenKey));
    }

    private checkToken() {
        // this.storage.get(this.tokenKey).then((token) => {
        //     if (token) {
        //         this.authStatusChanged.next({authenticated: true})
        //     }            
        // })
        if (this.isAuthenticated()) {
            this.authStatusChanged.next({authenticated: true});
        }
    }
}
