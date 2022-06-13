import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-layouts',
  templateUrl: './custom-layouts.component.html',
  styleUrls: ['./custom-layouts.component.scss']
})
export class CustomLayoutsComponent implements OnInit {

  title:String = 'This ist the Custom Layout text.';
  data:any = [];
  canvasId:string;

  constructor(private api:GetApiService, private router: Router) {
    this.api.apiCall('canvases').subscribe(data=>{
      console.warn(data);
      this.data = data;
    })
   }

  ngOnInit(): void { }

  createCanvas2(canvasId:string){
    this.router.navigate(['/'], { queryParams: { workspace: canvasId } });
  }
}