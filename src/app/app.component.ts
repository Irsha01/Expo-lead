import { Component } from '@angular/core';
import { AlertController, LoadingController, Platform, NavController, ToastController } from '@ionic/angular';

import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Device } from '@ionic-native/device/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform,
    private navCtrl: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router,
    private http: HttpClient,
    private toastController: ToastController,
    private camera: Camera,
    private device:Device
    ) {}

url:any='https://client.eaceprep.com/ocrscanner/api/api.php';
username: string = "";
osVersion: string = "";
uuid: string = "";
model:string="";
platform1: string="";
manufacturer: string="";
isVirtual: any;
serial: string="";
//url='https://merck.eaceprep.com/test.php'
async Alert(msg:any) {
  const alert = await this.alertController.create({
    header: 'Alert',
    message: msg,
    buttons: ['OK']
  });

  await alert.present();
}

ngOnInit(): void {
//   this.platform.ready().then(() => {
  this.platform.ready().then(() => {
    // Delay the navigation after 5 seconds
    setTimeout(() => {
      this.storedevice();
    }, 5000); // Adjust the delay time as needed
  });

}

async presentPageLoading() {
  const loading = await this.loadingController.create({
    message: 'Please Wait111...' // Set your loading message
  });

  await loading.present();

  // Simulate an asynchronous operation (adjust timing as needed)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
      loading.dismiss(); // Dismiss the loading after the operation completes
    }, 3000); // Example: Simulating an operation for 3 seconds
  });
}



storedevice(){
  this.osVersion = this.device.version;
  this.uuid = this.device.uuid;
  this.model=this.device.model;
  this.platform1=this.device.platform;
  this.manufacturer=this.device.manufacturer;
  this.isVirtual=this.device.isVirtual;
  this.serial=this.device.serial;
  if (this.device && (window as any).device && (window as any).device.name) {
    this.username = (window as any).device.name;
 } else {
    // Handle the case where 'name' is not available
  //  this.name = (window as any).device.name;
  console.log('name not found');
  
 }
 
console.log('devicedetails',this.device);

localStorage.setItem('devicedetails',JSON.stringify(this.device));
}


async Loading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Please wait...',
  });
  return await loading;
}

//   callApi(params:any) {
//     if(!params)return;
      
// console.log('params',params);

//         this.Loading().then(lod => {

//           lod.present();

//           let httpHeaders = new HttpHeaders()
//             .set('Content-Type', 'application/json')
//             .set('Access-Control-Allow-Origin', '*')

//           let options = { headers: httpHeaders };

//          // let ud = localStorage.getItem("macmainuser");

//           console.log("paramsToAPI", params['params'])


//           this.http.post(this.url , params['params'], options).subscribe(res => {

//             lod.dismiss();
//             console.log('heere',res);
            

//             // if (res.'status'].toLowerCase() == "success") {
//             //   this.Toast(res["message"]);
//             //   params['ths'][params['callBack']](res);
//             // } else {
//             //   this.Alert(res["message"]);
//             // }
//           }, err => {
//             console.log('heere111');
//             lod.dismiss();

//             // this.Alert("ERROR. CONTACT ADMIN");
//           })
//         })

//       }
//   // Toast(arg0: any) {
//   //   throw new Error('Method not implemented.');
//   // }
  async Toast(message: string,position: 'top' | 'bottom' | 'middle') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duration in milliseconds
      position: position // You can adjust the position as needed
    });
    toast.present();
  }
}
