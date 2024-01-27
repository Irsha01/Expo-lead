import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcrviewPageRoutingModule } from './ocrview-routing.module';

import { OcrviewPage } from './ocrview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcrviewPageRoutingModule
  ],
  declarations: [OcrviewPage]
})
export class OcrviewPageModule {}
