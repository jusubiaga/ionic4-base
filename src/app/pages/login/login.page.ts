import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService, AUTH_STATE } from '@app/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading;
  loginForm = new FormGroup ({
    user: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService, 
  private loadingController: LoadingController) { 
    console.log('Constructor');
    this.authService.authStatusChanged.subscribe((status) => {
      if (status.state === AUTH_STATE.DONE && this.loading) {
        this.loading.dismiss();
      } 
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required , Validators.minLength(6)]]
    });
  }

  ionViewDidEnter(){
      console.log("ionViewDidEnter");
      this.loginForm.reset();
  }

  login() {    
    if (this.loginForm.valid) {
      console.log("Login ...");

      this.presentLoading();

      const credentials = this.loginForm.value;
      this.authService.signInWithEmailAndPassword(credentials.user, credentials.password);
      // this.loginForm.reset();
    } else {
      console.log('Form error');
      //console.log(this.loginForm.get('user').hasError('required'));
      this.alertService.presentErrorAlert('Login Error');
    }
  }

  async presentLoading() {
      this.loading = await this.loadingController.create({
        message: `logging in ....`,
      });
      return await this.loading.present();
  }
  
}
