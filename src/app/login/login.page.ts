


import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userDetailsForm: FormGroup;
  uuid:any
  checklogin=true
  firstName:any
  lastName:any
  email:any
  constructor(private formBuilder: FormBuilder, private router: Router,private device:Device, private App:AppComponent,  private http:HttpClient,) {

   
   
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
     // email: ['', [Validators.required, Validators.email]],
      email: ['', Validators.email],
    });
    this.uuid=this.device.uuid;
    console.log('log2',this.uuid);
  }
 async  ngOnInit(): Promise<void>{
  console.log('log1',this.uuid);
  
  
  this.checklogin=true //
  this.App.Loading().then(lod => {
  
    lod.present();  
 setTimeout(() => {
  this.uuid=this.device.uuid
  console.log('hello',this.uuid);
   this.checknewuser();
   lod.dismiss(); 
}, 5000);
 
  });
  this.uuid=this.device.uuid
  console.log('log3',this.uuid);
  }

  checknewuser(){
   // console.log('hello');
    this.uuid=this.device.uuid
    const params= {
      uuid: this.uuid='e4f2b8846be4ae40',
      wsfunc:'get_user'
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
        
        if (res['status'].toLowerCase() == "success") {
        //  this.items=res['data'];
        this.router.navigate(["/expos"])
        
        this.checklogin=false
        //  this.App.Toast(res["status"],'bottom');
        console.log('response',res);
        localStorage.setItem('userdetails',JSON.stringify(res['data']));
         // params['ths'][params['callBack']](res);
        } else {
          //this.App.Alert(res["message"]);
          //return
          this.checklogin=false
        }
      }, err => {
        
        console.log('heere111');
        this.App.Alert("ERROR. CONTACT ADMIN");
        lod.dismiss();
  
        // this.Alert("ERROR. CONTACT ADMIN");
      })
    })
  }
  submitForm() {
    console.log();
    
    if (this.userDetailsForm.valid) {
      // Handle form submission - e.g., save data, navigate, etc.
      const formData = this.userDetailsForm.value;
      // You can handle form data as needed, for example, save it to storage
      this.firstName=formData.firstName
      this.lastName=formData.lastName
      this.email=formData.email
      console.log('Form submitted:', formData);
      this.saveuserdetails()
      // After saving data, navigate to the home page or any other page
   
    }
  }



  saveuserdetails(){

    const params= {
      uuid: this.uuid,
      firstname: this.firstName,
      lastname: this.lastName,
      email: this.email,
      wsfunc:'save_user'
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
        
        if (res['status'].toLowerCase() == "success") {
        //  this.items=res['data'];
        this.router.navigate(["/expos"])

        this.checklogin=false
        //  this.App.Toast(res["status"],'bottom');
        console.log('response',res);
        
         // params['ths'][params['callBack']](res);
        } else {
          //this.App.Alert(res["message"]);
          //return
          this.checklogin=false
        }
      }, err => {
        
        console.log('heere111');
        this.App.Alert("ERROR. CONTACT ADMIN");
        lod.dismiss();
  
        // this.Alert("ERROR. CONTACT ADMIN");
      })
    })
  }

}