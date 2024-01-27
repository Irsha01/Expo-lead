import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  bigDataArray: any[] = []; // Your large data array

  constructor() {}
}