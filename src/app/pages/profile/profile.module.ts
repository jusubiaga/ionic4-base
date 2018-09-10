import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { ProfilePage } from './profile.page';


@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: ProfilePage}])
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
