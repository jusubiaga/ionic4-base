import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { ContactPage } from './contact.page';
import { ProfilePageModule } from '../profile/profile.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: ContactPage }]),
    ProfilePageModule
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
