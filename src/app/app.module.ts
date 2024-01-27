import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule ,HttpClientJsonpModule} from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ClipboardService } from 'ngx-clipboard';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';

import { DashboardPageModule } from './dashboard/dashboard.module';






//import { NgProgressModule } from '@ngx-progressbar/core';
@NgModule({
  declarations: [AppComponent,ImageViewerComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,HttpClientJsonpModule,DashboardPageModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },Camera,File,Device,SocialSharing,ClipboardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
