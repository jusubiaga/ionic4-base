import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: LoginPage}])
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
