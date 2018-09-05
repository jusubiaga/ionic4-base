import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from '@app/core';

const DEFAULT_PAGE = 'tabs';
const LOGIN_PAGE = 'login';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService
  ) {

      // Listen form auth changes
      this.authService.authStatusChanged.subscribe((status) => {
        if (status.authenticated) {
          this.router.navigate([DEFAULT_PAGE]);          
        } else {
          this.router.navigate([LOGIN_PAGE]);
        }
        console.log(status);
      })
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
