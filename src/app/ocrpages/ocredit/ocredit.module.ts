import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcreditPageRoutingModule } from './ocredit-routing.module';

import { OcreditPage } from './ocredit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcreditPageRoutingModule
  ],
  declarations: [OcreditPage]
})
export class OcreditPageModule {}
