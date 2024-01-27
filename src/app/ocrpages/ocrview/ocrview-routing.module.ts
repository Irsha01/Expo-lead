import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcrviewPage } from './ocrview.page';

const routes: Routes = [
  {
    path: '',
    component: OcrviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcrviewPageRoutingModule {}
