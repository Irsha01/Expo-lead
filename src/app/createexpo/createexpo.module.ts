import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateexpoPageRoutingModule } from './createexpo-routing.module';

import { CreateexpoPage } from './createexpo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateexpoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateexpoPage]
})
export class CreateexpoPageModule {}
