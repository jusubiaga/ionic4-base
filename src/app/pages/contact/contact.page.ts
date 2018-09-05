import { Component } from '@angular/core';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  constructor(private authService: AuthService) {

  }

  logout() {
    this.authService.logout();
  }
}
