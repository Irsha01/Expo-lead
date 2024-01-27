import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { DataService } from 'src/app/service/dataservice';

@Component({
  selector: 'app-ocredit',
  templateUrl: './ocredit.page.html',
  styleUrls: ['./ocredit.page.scss'],
})
export class OcreditPage implements OnInit {
  getarray:any
  objtext:any
  objid?:number;
  expoid?:number
  exponame:any
  salescomment:any
  constructor(private dataService:DataService,private App:AppComponent,private http:HttpClient,private router:Router,private route:ActivatedRoute) { 
    
    this.route.queryParams.subscribe(params => {
      this.expoid= params['id'];
      this.exponame= params['name'];
      console.log('ID from queryParams:',  this.expoid);
    });
  }
  ionViewWillEnter(){
    this.getarray= this.dataService.bigDataArray;
    console.log('objtext',this.getarray);
    this.objtext=this.getarray.result
    this.objid=this.getarray.id
    this.salescomment=this.getarray.salescomment
  }
  ngOnInit() {
  }
  openhome(){
    const navigationExtras: NavigationExtras = {
      queryParams: { id: this.expoid,name:this.exponame }
    };
    this.router.navigate(["/home"],navigationExtras)
  }



  UpdateChanges(id?:number,result?:any){

    const  params= {
        salescomment:this.salescomment,
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
              
               
                const navigationExtras: NavigationExtras = {
                  queryParams: { id: this.expoid,name:this.exponame }
                };
                this.router.navigate(["/home"],navigationExtras)
              
              } else {
               
                this.App.Alert(res["message"]);
                const navigationExtras: NavigationExtras = {
                  queryParams: { id: this.expoid,name:this.exponame }
                };
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
}
