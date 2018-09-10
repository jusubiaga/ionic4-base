import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { Routes, RouterModule } from '@angular/router';
import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
