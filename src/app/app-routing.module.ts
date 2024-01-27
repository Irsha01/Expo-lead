import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },
  {
    path: 'ocrview',
    loadChildren: () => import('./ocrpages/ocrview/ocrview.module').then( m => m.OcrviewPageModule)
  },
  {
    path: 'ocredit',
    loadChildren: () => import('./ocrpages/ocredit/ocredit.module').then( m => m.OcreditPageModule)
  },
  {
    path: 'expos',
    loadChildren: () => import('./expos/expos.module').then( m => m.ExposPageModule)
  },
  {
    path: 'createexpo',
    loadChildren: () => import('./createexpo/createexpo.module').then( m => m.CreateexpoPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
