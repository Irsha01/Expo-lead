import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateexpoPage } from './createexpo.page';

const routes: Routes = [
  {
    path: '',
    component: CreateexpoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateexpoPageRoutingModule {}
