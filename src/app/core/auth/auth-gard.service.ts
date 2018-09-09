import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

    constructor(private auth: AuthService, private router: Router) { }

    canActivate(): boolean | Promise<boolean> {
        if (this.auth.isAuthenticated()) {
            return true;
        }
        return false;
        // let token = this.auth.getToken();
        // let accessToken = this.auth.getAccessToken();

        // if (!token) {
        //     console.error("User is not authenticated.");
        //     this.redirectToLoginPage();
        //     return false;
        // }
        // else if (this.auth.isAuthenticated()) {
        //     return true;
        // }
        // else {
        //     this.auth.refreshToken();
        //     return true;
        // }
    }

    redirectToLoginPage() {
        this.router.navigate(['/login']);
    }

}