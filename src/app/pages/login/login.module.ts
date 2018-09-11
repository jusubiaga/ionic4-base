import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginPage } from './login.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: LoginPage}]),
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
