import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HowToGetHerePage } from './how-to-get-here.page';

const routes: Routes = [
  {
    path: '',
    component: HowToGetHerePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HowToGetHerePageRoutingModule {}
