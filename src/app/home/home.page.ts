import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Camera, PictureSourceType,CameraOptions } from '@ionic-native/camera/ngx';

//import * as Tesseract from 'tesseract.js';
//import { OcrService } from '../ocr.service';
//import { NgProgress } from '@ngx-progressbar/core';
//import { RecognizeResult } from 'tesseract.js';
import { AppComponent } from '../app.component';
import { HttpClient,HttpHeaders,HttpClientJsonpModule } from '@angular/common/http';
import { Device } from '@ionic-native/device/ngx';
//import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Observable } from 'rxjs';
import { ClipboardService } from 'ngx-clipboard';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
//import { BackButtonService } from '../service/exitapp..service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from '../service/dataservice';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: any;
   uuid:any
   ws_func:any;
   expoid?:number
   exponame:any
  
   @ViewChild('popover') popover!:any;

   isOpen = false;
 
   presentPopover(e: Event) {
     this.popover.event = e;
     this.isOpen = true;
   }

  
  
  constructor(public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController,private loading:LoadingController,private App:AppComponent,private http:HttpClient,private device:Device,private SocialSharing:SocialSharing,private copytext:ClipboardService,private alertController:AlertController,private modalController:ModalController,private router:Router,private  route:ActivatedRoute,private loadingCtrl:LoadingController,private dataservice:DataService) {

    const devicedetails=JSON.parse(localStorage.getItem('devicedetails') ||'');
    console.log('devicedetails',devicedetails);
    //this.uuid=devicedetails.uuid;
    this.uuid = this.device.uuid;

    this.route.queryParams.subscribe(params => {
      this.expoid= params['id'];
      this.exponame= params['name'];
      console.log('ID from queryParams:',  this.expoid);
    });
  }
ngOnInit(): void {
  
 }


ionViewWillEnter(){
  
  
  this.uuid = this.device.uuid;
  
  this.fetchdata();
 }

 async presentPageLoading() {
  const loading = await this.loadingCtrl.create({
    message: 'Please Wait...' // Set your loading message
  });

  await loading.present();

  // Simulate an asynchronous operation (adjust timing as needed)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
      loading.dismiss(); // Dismiss the loading after the operation completes
    }, 5000); // Example: Simulating an operation for 3 seconds
  });
}



navigateToViewPage(sendarray:any) {
  this.dataservice.bigDataArray =sendarray; /* Your large data array */
  const navigationExtras: NavigationExtras = {
    queryParams: { id: this.expoid,name:this.exponame }
  };
  this.router.navigate(["/ocrview"],navigationExtras)
}

navigateToEdit(sendarray:any) {
  this.dataservice.bigDataArray =sendarray; /* Your large data array */
  const navigationExtras: NavigationExtras = {
    queryParams: { id: this.expoid,name:this.exponame }
  };
  this.router.navigate(["/ocredit"],navigationExtras)
}

async fetchdata(){

  const params= {
    uuid: this.uuid,//='e4f2b8846be4ae40',
    wsfunc:'list_of_records',
    expoid:this.expoid
  }

  this.App.Loading().then(lod => {

    lod.present();

    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')

    let options = { headers: httpHeaders };
    console.log("paramsToAPI", params)
      this.http.post(this.App.url,params ,options).subscribe((res:any) => {

      lod.dismiss();
      console.log('heere',res);
      
   // this.items=res;
      if (res['status'].toLowerCase() == "success") {
        this.items=res['data'];
      } else {
        this.App.Alert(res["message"]);
      }
    }, err => {
      console.log('heere111');
      this.App.Alert("ERROR. CONTACT ADMIN");
      lod.dismiss();
    })
  })

      
}


copyToClipboard(text: string) {
  this.copytext.copyFromContent(text);
  this.App.Toast("Copied!",'bottom');
}



shareText(imageText:any) {
  this.SocialSharing
    .share(imageText, 'OcrScanner')
    .then(() => {
      console.log('Shared successfully');
      this.App.Toast('Shared successfully','bottom')
    })
    .catch((error) => {
      console.error('Error sharing:', error);
    });
}



UpdateChanges(id?:number,result?:any){

    const  params= {
        
        result: result,
        id:id,
        wsfunc:'update_record'
      }
           this.App.Loading().then(lod => {
  
            lod.present();
  
            let httpHeaders = new HttpHeaders()
              .set('Content-Type', 'application/json')
              .set('Access-Control-Allow-Origin', '*')
  
            let options = { headers: httpHeaders };
  
           // let ud = localStorage.getItem("macmainuser");
  
            console.log("paramsToAPI", params)
  
  
            this.http.post(this.App.url , params, options).subscribe((res:any) => {
  
              lod.dismiss();
              console.log('heere',res);
              
            
              if (res['status'].toLowerCase() == "success") {
                
              
                this.App.Toast(res["message"],'bottom');
                //this.router.navigate(["/home"])
                //params['ths'][params['callBack']](res);
                this.fetchdata();
              } else {
               
               
                this.App.Alert(res["message"]);
                //this.router.navigate(["/home"])
                this.fetchdata();
              }
            }, err => {
              console.log('heere111');
              lod.dismiss();
              this.App.Alert("ERROR. CONTACT ADMIN");
              this.fetchdata();
              this.navCtrl.navigateForward('/home', { queryParams: {} });
           
              // this.Alert("ERROR. CONTACT ADMIN");
            })
          })
    
}


async confirmDelete(deleteid?:number) {
  const alert = await this.alertController.create({
    header: 'Confirm Deletion',
    message: 'Are you sure you want to delete?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          // Handle cancel action (if needed)
        }
      },
      {
        text: 'Delete',
        handler: () => {
          // Call your delete function/method here
          this.deleteItem(deleteid);
        }
      }
    ]
  });

  await alert.present();
}


deleteItem(deleteid?:number){
  const  params= {
    id:deleteid,
    wsfunc:'delete_record'
  }
       this.App.Loading().then(lod => {
        lod.present();
        let httpHeaders = new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Access-Control-Allow-Origin', '*')
        let options = { headers: httpHeaders };
console.log("paramsToAPI", params)
        this.http.post(this.App.url , params, options).subscribe((res:any) => {

          lod.dismiss();
          console.log('heere',res);
          
        
          if (res['status'].toLowerCase() == "success") {
            
            this.App.Toast(res["message"],'bottom');
            //this.router.navigate(["/home"])
            //params['ths'][params['callBack']](res);
            this.fetchdata();
          } else {
           
            this.App.Alert(res["message"]);
            //this.router.navigate(["/home"])
            this.fetchdata();
          }
        }, err => {
          console.log('heere111');
          lod.dismiss();
          this.App.Alert("ERROR. CONTACT ADMIN");
          this.fetchdata();
         
        })
      })
}






}


