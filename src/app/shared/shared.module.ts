import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';



@NgModule({
  declarations: [
    CustomInputComponent,
    LogoComponent,
    LoadingComponent,
  ],
  exports: [
    CustomInputComponent,
    LogoComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
