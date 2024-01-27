import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { ClipboardService } from 'ngx-clipboard';
import { AppComponent } from 'src/app/app.component';
import { ImageViewerComponent } from 'src/app/image-viewer/image-viewer.component';
import { DataService } from 'src/app/service/dataservice';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-ocrview',
  templateUrl: './ocrview.page.html',
  styleUrls: ['./ocrview.page.scss'],
})
export class OcrviewPage implements OnInit {
    getarray:any
    viewimg:any
    viewtext:any
    view:any
    viewid?:number
    expoid?:number
    exponame:any
    salescomment:any
  //modalController: any;
  constructor(private dataService:DataService,private modalController:ModalController,private router:Router,private copytext:ClipboardService,private App:AppComponent,private SocialSharing:SocialSharing,private alertController:AlertController,private http:HttpClient,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.expoid= params['id'];
      this.exponame= params['name'];
      console.log('ID from queryParams:',  this.expoid);
    });
   }

   ionViewWillEnter(){

    this.getarray= this.dataService.bigDataArray;
    console.log('array',this.getarray)
    this.view=this.getarray
    this.viewimg=this.getarray.image
    this.viewtext=this.getarray.result
    this.viewid=this.getarray.id
    this.salescomment=this.getarray.salescomment
   
   }
  ngOnInit() {
  }


  copyToClipboard(text: string) {
    this.copytext.copyFromContent(text);
    this.App.Toast("Copied!",'bottom');
  }
  
  shareText(viewtext:any) {
    this.SocialSharing
      .share(this.viewtext, 'OcrScanner')
      .then(() => {
        console.log('Shared successfully');
        this.App.Toast('Shared successfully','bottom')
      })
      .catch((error) => {
        console.error('Error sharing:', error);
      });
  }
  opendetails(view:any){
    this.dataService.bigDataArray =view; /* Your large data array */
    const navigationExtras: NavigationExtras = {
      queryParams: { id: this.expoid,name:this.exponame }
    };
    this.router.navigate(['/ocredit'],navigationExtras);
  }

  async openImageModal(){
    const modal = await this.modalController.create({
      component: ImageViewerComponent,
      componentProps: {
        imageUrl: this.viewimg,
      },
    });
    return await modal.present();
  }
  openhome(){
    const navigationExtras: NavigationExtras = {
      queryParams: { id: this.expoid,name:this.exponame }
    };
    this.router.navigate(["/home"],navigationExtras)
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

    const navigationExtras: NavigationExtras = {
      queryParams: { id: this.expoid,name:this.exponame }
    };
    
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
             
             
              this.router.navigate(["/home"],navigationExtras)
              //params['ths'][params['callBack']](res);
            //  this.fetchdata();
            } else {
              
              this.App.Alert(res["message"]);
              this.router.navigate(["/home"],navigationExtras)
             // this.fetchdata();
            }
          }, err => {
            console.log('heere111');
            lod.dismiss();
            this.App.Alert("ERROR. CONTACT ADMIN");
           
            this.router.navigate(["/home"],navigationExtras)
         
            // this.Alert("ERROR. CONTACT ADMIN");
          })
        })
  }
  

}
