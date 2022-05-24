import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../get-api.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-layouts',
  templateUrl: './custom-layouts.component.html',
  styleUrls: ['./custom-layouts.component.scss']
})
export class CustomLayoutsComponent implements OnInit {

  title:String = 'This ist the Custom Layout text.';
  data:any = [];
  canvasId:string;

  constructor(private api:GetApiService) {
    this.api.apiCall().subscribe(data=>{
      console.warn(data);
      this.data = data;
    })
   }

  ngOnInit(): void { }

  createCanvas(canvasId:string){
    id = canvasId;
  }
}
export let id:string = '628626c472bde9c80d913836';