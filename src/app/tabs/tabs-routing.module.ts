import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/secure/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'how-to-get-here',
        loadChildren: () => import('../pages/secure/how-to-get-here/how-to-get-here.module').then(m => m.HowToGetHerePageModule)
      },
      {
        path: 'clinic-map',
        loadChildren: () => import('../pages/secure/clinic-map/clinic-map.module').then(m => m.ClinicMapPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/secure/profile/profile.module').then(m => m.ProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
