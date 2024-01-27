import { NavController, Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {
   
  constructor(private platform: Platform, private route: ActivatedRoute,private navCtrl:NavController) {
    this.setupBackButton();
  }

  setupBackButton() {
    this.platform.backButton.subscribeWithPriority(0, () => {
      this.route.queryParams.subscribe(params => {
        if (window.location.pathname === '/expos' ) {
          if ((navigator as any)['app']) {
            (navigator as any)['app'].exitApp(); // Exit the app
          }
        } else {
          this.navCtrl.back(); 
        }
      });
    });
  }
}