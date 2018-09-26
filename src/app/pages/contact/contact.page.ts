import { Component } from '@angular/core';
import { AuthService } from '@app/core';
import { ModalController } from '@ionic/angular';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  constructor(private authService: AuthService, public modalController: ModalController) {

  }

  logout() {
    this.authService.signOut();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ProfilePage
    });
    return await modal.present();
  }  
}
