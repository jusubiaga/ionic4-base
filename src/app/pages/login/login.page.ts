import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '@app/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = new FormGroup ({
    user: new FormControl(),
    password: new FormControl()
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService) { 
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: ['', [Validators.required, Validators.email ]],
      password: ['', [Validators.required , Validators.minLength(6)]]
    });
  }

  login(username, password) {    
    if (this.loginForm.valid) {
      console.log("Login!");
      this.authService.login(username, password);
      this.loginForm.reset();
    } else {
      console.log('Form error');
      //console.log(this.loginForm.get('user').hasError('required'));
      this.alertService.presentErrorAlert('Login Error');
    }
  }
}
