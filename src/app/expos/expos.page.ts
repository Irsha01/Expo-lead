import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { NavigationExtras, Router } from '@angular/router';
import { BackButtonService } from '../service/exitapp..service';

@Component({
  selector: 'app-expos',
  templateUrl: './expos.page.html',
  styleUrls: ['./expos.page.scss'],
})
export class ExposPage implements OnInit {
  myForm: FormGroup;
  userid:number;
  items:any
  updateid?:number
  constructor(  private alertController: AlertController,
    private formBuilder: FormBuilder,
    private App:AppComponent,private lod:LoadingController,private http:HttpClient,private router:Router,private backButtonService: BackButtonService) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
    });

  let userdetails= JSON.parse(localStorage.getItem("userdetails") || '');
  this.userid=userdetails[0].id;
  console.log('userdetails',userdetails);
   }

  ngOnInit() {
    this.getexpodetails();
  }


  expostart:any
  expoend:any
  async presentAlert(existingData?: any) {
    this.updateid = existingData ? existingData.id : 0;
    const today = new Date().toISOString().split('T')[0];
    this.expostart=today;
    this.expoend=today;
    if(existingData){
      if(existingData.startdate){
        this.expostart= existingData.startdate;
      }
      if(existingData.enddate){
        this.expoend= existingData.enddate;
      }
    }
    console.log('existing', existingData);
 
  console.log('today',today);
  
    const alert = await this.alertController.create({
      header: existingData ? 'Update Expo' : 'Create Expo',
      inputs: [
        {
          name: 'exponame',
          type: 'text',
          placeholder: 'Expo Name',
          value: existingData ? existingData.exponame : '',
        },
        {
          name: 'expodetails',
          type: 'textarea',
          placeholder: 'Expo Detail',
          value: existingData ? existingData.expodetails : '',
        },
        {
          name: 'startdate',
          type: 'date',
          placeholder: 'Start Date',
          value:this.expostart, // Set the default value to today
        },
        {
          name: 'enddate',
          type: 'date',
          placeholder: 'End Date',
          value: this.expoend, // Set the default value to today
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Submit',
          handler: (data) => {
            console.log('Form data:', data);
            if (existingData) {
              this.updateexpodetails(data);
            } else {
              this.saveexpodetails(data);
            }
          },
        },
      ],
    });
  
    await alert.present();
  }
  

  
  
  saveexpodetails(data:any){

    const params= {
      exponame: data.exponame,
      expodetails:data.expodetails,
      startdate:data.startdate,
      enddate:data.enddate,
      createdby:this.userid,
      wsfunc:'save_expo_record'
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

        if (res['status'].toLowerCase() == "success") {
         // this.items=res['data'];
          this.App.Toast(res["message"],'bottom');
         // params['ths'][params['callBack']](res);
         this.getexpodetails();
        } else {
          this.App.Alert(res["message"]);
        }
      }, err => {
        console.log('heere111');
        this.App.Alert("ERROR. CONTACT ADMIN");
        lod.dismiss();
  
        // this.Alert("ERROR. CONTACT ADMIN");
      })
    })
  }


   
  updateexpodetails(data:any){

    const params= {
      exponame: data.exponame,
      expodetails:data.expodetails,
      startdate:data.startdate,
      enddate:data.enddate,
      updatedby:this.userid,
      id:this.updateid,
      wsfunc:'update_expo_record'
    }
  
    this.App.Loading().then(lod => {
  
      lod.present();
  
      let httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
  
      let options = { headers: httpHeaders };
        this.http.post(this.App.url,params ,options).subscribe((res:any) => {
  
        lod.dismiss();
        console.log('heere',res);
        if (res['status'].toLowerCase() == "success") {
         // this.items=res['data'];
          this.App.Toast(res["message"],'bottom');
         // params['ths'][params['callBack']](res);
         this.getexpodetails();
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


  getexpodetails(){
    const params= {
      wsfunc:'list_expo_record'
    }
    this.App.Loading().then(lod => {
  
      lod.present();
  
      let httpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
  
      let options = { headers: httpHeaders };
  
     // let ud = localStorage.getItem("macmainuser");
  
      console.log("paramsToAPI", params)

        this.http.post(this.App.url,params ,options).subscribe((res:any) => {
  
        lod.dismiss();
        console.log('heere',res);
        
     // this.items=res;
        if (res['status'].toLowerCase() == "success") {
          this.items=res['data'];
        //  this.App.Toast(res["message"],'bottom');
         // params['ths'][params['callBack']](res);
        } else {
          this.App.Alert(res["message"]);
        }
      }, err => {
        console.log('heere111');
        this.App.Alert("ERROR. CONTACT ADMIN");
        lod.dismiss();
  
        // this.Alert("ERROR. CONTACT ADMIN");
      })
    })
  }


  navigateToEdit(item:any){

    const navigationExtras: NavigationExtras = {
      queryParams: { id: item.id,'name':item.exponame }
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
    wsfunc:'delete_expo_record'
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
            this.getexpodetails();
          } else {
           
            this.App.Alert(res["message"]);
            //this.router.navigate(["/home"])
            this.getexpodetails();
          }
        }, err => {
          console.log('heere111');
          lod.dismiss();
          this.App.Alert("ERROR. CONTACT ADMIN");
          this.getexpodetails();
         
        })
      })
}
}
