import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: AboutPage }])
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
