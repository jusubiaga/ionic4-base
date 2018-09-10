import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import { RouterModule } from '@angular/router';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'', component: DashboardPage}])
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
