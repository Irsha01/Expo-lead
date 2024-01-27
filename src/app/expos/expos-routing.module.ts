import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExposPage } from './expos.page';

const routes: Routes = [
  {
    path: '',
    component: ExposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExposPageRoutingModule {}
