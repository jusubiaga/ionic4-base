import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuardService],
    loadChildren: './pages/tabs/tabs.module#TabsPageModule' 
  },
  { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule' 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
