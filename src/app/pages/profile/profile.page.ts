import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  language = 'en';

  constructor(private modalCtrl: ModalController, private translateService: TranslateService) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss(null, undefined, null);
  }

  setEnLanguage() {
    this.translateService.use('en');
  }

  setEsLanguage() {
    this.translateService.use('es');
  }
}
