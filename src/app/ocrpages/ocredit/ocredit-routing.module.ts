import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcreditPage } from './ocredit.page';

const routes: Routes = [
  {
    path: '',
    component: OcreditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcreditPageRoutingModule {}
