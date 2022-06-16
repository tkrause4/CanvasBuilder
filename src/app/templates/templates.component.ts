import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  data:any = [];

  constructor(private api:GetApiService, private router: Router) {
    this.api.apiCall('templates').subscribe(data=>{
      console.warn(data);
      this.data = data;
    })
   }

  ngOnInit(): void {
  }

  createCanvas(canvasId:string){
    this.router.navigate(['/'], { queryParams: { type: 'templates', workspace: canvasId } });
  }

}
