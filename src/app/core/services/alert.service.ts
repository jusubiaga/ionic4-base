import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AlertService {
  constructor(public alertCtrl: AlertController, private translateService: TranslateService) { }

  async presentAlert(title: string, message: string) {
    title = this.translateService.instant(title);
    message = this.translateService.instant(message);

    const alert = await this.alertCtrl.create(
      {
        header: title,
        subHeader: message,
        buttons: ['OK']
      });
    return await alert.present();
  }

  presentErrorAlert(message: string, title?) {
    return this.presentAlert(title || 'login.alertErrorTitle', message);
  }

//   presentAlertWithCallback(title: string, message: string): Promise<boolean> {    
//     return new Promise((resolve, reject) => {
//       this.translateService.get([title, message, 'ALERT_BUTTON_YES', 'ALERT_BUTTON_NO']).subscribe(values => {
//         const confirm = this.alertCtrl.create({
//           title: values[title],
//           message: values[message],
//           buttons: [{
//             text: values['ALERT_BUTTON_NO'],
//             role: 'cancel',
//             handler: () => {
//               confirm.dismiss().then(() => resolve(false));
//               return false;
//             }
//           }, {
//             text: values['ALERT_BUTTON_YES'],
//             handler: () => {
//               confirm.dismiss().then(() => resolve(true));
//               return false;
//             }
//           }]
//         });

//         return confirm.present();

//       })

//     });
//   }
}
