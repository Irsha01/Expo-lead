
import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
//import  * as Tesseract from 'tesseract.js';
import { NavController, ActionSheetController, Platform, LoadingController, ModalController } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Device } from '@ionic-native/device/ngx';
import { AppComponent } from '../app.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ImageViewerComponent } from '../image-viewer/image-viewer.component';
//import { Injectable } from '@angular/core';
//import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  selectedImage: any ='';
  imageText: any = '';
  progress: number = 0;
  googleCloudVisionAPIKey='AIzaSyA3DxPp7XEXfQNanBNanegt2eyXida-9WU';
  imageText1: any;
  selectedImage1: any='';
  showimage=true

  username: string = "";
  osVersion: string = "";
  uuid: string = "";
  model:string="";
  platform1: string="";
  manufacturer: string="";
  isVirtual: any;
  serial: string="";
  expoid?:number
  exponame:any
  salescomment:any
  //capturedImage: string;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private actionSheetCtrl: ActionSheetController,
    private loading: LoadingController,
    public platform: Platform,
    private http:HttpClient,
    private loadingController:LoadingController,
    private device:Device,
    private App:AppComponent,
    private router:Router,
    private modalController:ModalController,
    private  route:ActivatedRoute
   // private platform:Platform
  ) {


    this.route.queryParams.subscribe(params => {
      this.expoid= params['id'];
      this.exponame= params['name'];
      console.log('ID from queryParams:',  this.expoid);
    });



  }

  ngOnInit(): void {
   // this.platform.ready().then(() => {
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
     
  // });


  }

  ionViewWillEnter(){
   this.selectSource();
  }



  async selectSource() {
    this.selectedImage=''
    this.selectedImage1=''
    this.imageText=''
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Source',
      cssClass: 'custom-action-sheet',
      buttons: [
        {
          text: 'Capture Image',
          role: 'camera',
          icon: 'camera',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          },
        },
        {
          text: 'Use Library',
          role: 'library',
          icon: 'folder-open',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            // Navigate to a new page when Option 1 is selected
            
            const navigationExtras: NavigationExtras = {
              queryParams: { id: this.expoid,name:this.exponame }
            };
            this.router.navigate(["/home"],navigationExtras)
          },
        },
      ],
    });
    await actionSheet.present();
  }

  checkdevice(){
    console.log('osVersion',this.osVersion);
    console.log('uuid',this.uuid);
    console.log('name',this.username);
    console.log('model',this.model);
    console.log('platform1',this.platform1);
    console.log('manufacturer',this.manufacturer);
    console.log('isVirtual',this.isVirtual);
    console.log('serial',this.serial);
  }

  getPicture(sourceType: PictureSourceType) {
    this.selectedImage=''
    this.selectedImage1=''
    if (this.platform.is('cordova')) {
      const options: CameraOptions = {
        quality: 100,
        targetHeight: 500,
        targetWidth: 500,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: sourceType,
       // allowEdit: true,
        saveToPhotoAlbum: false,
        correctOrientation: true,
       
      };

      this.camera.getPicture(options).then((imageData:any) => {
        this.selectedImage = 'data:image/jpeg;base64,' + imageData;
        this.showimage=false
        this.selectedImage1 = imageData;
        this.recognizeImage()
      });
    } else {
      alert('Cordova is not available');
      const navigationExtras: NavigationExtras = {
        queryParams: { id: this.expoid,name:this.exponame }
      };
      this.router.navigate(["/home"],navigationExtras)
    }
  }


 

  
  async recognizeImage() {
    console.log('getImageDetails',this.selectedImage);
    const imageData=this.selectedImage1;
    const feature='TEXT_DETECTION';
    console.log('getImageDetails',imageData);
    const loading = await this.loadingController.create({
      message: 'Getting Results...',
      translucent: true
    });

    await loading.present();


    this.getLabels(imageData, "TEXT_DETECTION").subscribe(async (result:any) => {
      console.log('result',result);
      await loading.dismiss();

console.log(' result.responses', result.responses);
      this.imageText =   result.responses[0].fullTextAnnotation.text;
     // this.imageText1 =  result.responses[0].textAnnotations[0].description;
      this.showimage=false
     
      })
      
      
      }
       
  getLabels(base64Image:any,feature:string) {


  console.log('getImageDetails',base64Image);
  const body = {
  "requests": [
  {
  "features": [
  {
  "type": feature,
  "maxResults": 10
  }],
  "image": {
  "content": base64Image
  }}]}


  return this.http.post('https://vision.googleapis.com/v1/images:annotate?key=' + this.googleCloudVisionAPIKey, body);
  }


  SaveChanges(){
   
  const  params= {
      osVersion:  this.osVersion,
      uuid: this.uuid,
      name:this.username,
      model:this.model,
      platform: this.platform1,
      manufacturer: this.manufacturer,
      photo:this.selectedImage,
      result: this.imageText,
      wsfunc:'save_record',
      expoid:this.expoid,
      salescomment:this.salescomment
     

    }
    const navigationExtras: NavigationExtras = {
      queryParams: { id: this.expoid,name:this.exponame }
    };
  
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
             
              this.router.navigate(["/home"],navigationExtras)
            } else {
              this.App.Alert(res["message"]);
              
              this.router.navigate(["/home"],navigationExtras)
            }
          }, err => {
            console.log('heere111');
            lod.dismiss();
            this.App.Alert("ERROR. CONTACT ADMIN");
            const navigationExtras: NavigationExtras = {
              queryParams: { id: this.expoid,name:this.exponame }
            };
            this.router.navigate(["/home"],navigationExtras)

            // this.Alert("ERROR. CONTACT ADMIN");
          })
        })
        
  
  
    
  }

  async openImageModal(){
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imageUrl: this.selectedImage,
      },
    });
    return await modal.present();
  }
  
  

}