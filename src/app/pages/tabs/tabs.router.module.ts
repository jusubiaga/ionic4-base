import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/main/tabs/(home:home)',
        pathMatch: 'full',
      },
      {
        path: 'home',
        outlet: 'home',
        component: HomePage
      },
      {
        path: 'about',
        outlet: 'about',
        component: AboutPage
      },
      {
        path: 'contact',
        outlet: 'contact',
        component: ContactPage
      }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/(home:home)',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'tabs/home',
  //   redirectTo: '/tabs/(home:home)',
  //   pathMatch: 'full'
  // },  
  // {
  //   path: 'tabs/about',
  //   redirectTo: '/tabs/(about:about)',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'tabs/contact',
  //   redirectTo: '/tabs/(contact:contact)',
  //   pathMatch: 'full'
  // },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
