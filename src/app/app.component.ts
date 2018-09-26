import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService, AUTH_STATE } from '@app/core';
import { TranslateService } from '@ngx-translate/core';

const DEFAULT_PAGE = '/main/tabs';
const LOGIN_PAGE = 'login';
const INIT_PAGE = 'init';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
 public appPages = [
    {
      title: 'home.title',
      url: '/main/tabs/(home:home)',
      icon: 'home',
      routerDirection: 'root'
    },
    {
      title: 'about.title',
      url: '/main/tabs/(about:about)',
      icon: 'information-circle',
      routerDirection: 'root'
    },
    {
      title: 'contact.title',
      url: '/main/tabs/(contact:contact)',
      icon: 'contact',
      routerDirection: 'forward'
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'trending-up',
      routerDirection: 'root'
    }
  ];  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // Init page
      this.router.navigate([INIT_PAGE]);

      // Listen form auth changes
      this.authService.authStatusChanged.subscribe((status) => {
        console.log(status);
        if (status.state === AUTH_STATE.DONE) {
          if (status.authenticated) {
            this.router.navigate([DEFAULT_PAGE]);
          } else {
            this.router.navigate([LOGIN_PAGE]);
          }
        }        
      });

      this.translate.setDefaultLang('en');
      
    });
  }
}
