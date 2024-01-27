import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createexpo',
  templateUrl: './createexpo.page.html',
  styleUrls: ['./createexpo.page.scss'],
})
export class CreateexpoPage implements OnInit {
  userDetailsForm: FormGroup;
  firstName:any
  lastName:any
  email:any
  constructor(private formBuilder: FormBuilder) { 

    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
     // email: ['', [Validators.required, Validators.email]],
      email: ['', Validators.email],
    });

  }

  ngOnInit() {
  }
 
  submitForm() {
    console.log('fgfdgd');
    
   
  }
}
