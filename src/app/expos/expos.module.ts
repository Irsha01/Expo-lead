import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExposPageRoutingModule } from './expos-routing.module';

import { ExposPage } from './expos.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExposPageRoutingModule
  ],
  declarations: [ExposPage]
})
export class ExposPageModule {}
