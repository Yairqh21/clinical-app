import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicMapPage } from './clinic-map.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicMapPageRoutingModule {}
