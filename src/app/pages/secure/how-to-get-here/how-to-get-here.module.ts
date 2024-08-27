import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HowToGetHerePageRoutingModule } from './how-to-get-here-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ZoomControlComponent } from './components/zoom-control/zoom-control.component';
import { IndicatorsComponent } from './components/indicators/indicators.component';
import { HowToGetHerePage } from './how-to-get-here.page';
import { CustomPercentagePipe } from './pipes/custom-percentage.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HowToGetHerePageRoutingModule,
    SharedModule,
  ],
  declarations: [
    HowToGetHerePage,
    ZoomControlComponent,
    IndicatorsComponent,

    CustomPercentagePipe,

  ]
})
export class HowToGetHerePageModule {}
