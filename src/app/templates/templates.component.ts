import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../services/get-api.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  data:any = [];

  constructor(private api:GetApiService) {
    this.api.apiCall('templates').subscribe(data=>{
      console.warn(data);
      this.data = data;
    })
   }

  ngOnInit(): void {
  }

}
