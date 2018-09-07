import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core';

const routes: Routes = [
  { 
    path: 'login', 
    loadChildren: './pages/login/login.module#LoginPageModule' 
  },
  { 
    path: 'register', 
    loadChildren: './pages/register/register.module#RegisterPageModule' 
  },
  { 
    path: '', 
    // canActivate: [AuthGuardService],
    loadChildren: './pages/tabs/tabs.module#TabsPageModule' 
  },  
  { 
    path: 'dashboard', 
    loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' 
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
