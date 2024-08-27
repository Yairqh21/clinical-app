import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicMapPageRoutingModule } from './clinic-map-routing.module';

import { ClinicMapPage } from './clinic-map.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicMapPageRoutingModule,
    SharedModule
  ],
  declarations: [ClinicMapPage]
})
export class ClinicMapPageModule {}
