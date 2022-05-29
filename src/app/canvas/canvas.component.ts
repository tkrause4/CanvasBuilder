import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';
import { GetApiService } from '../get-api.service';
import { id } from '../custom-layouts/custom-layouts.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  data:any = [];
  canvasId:string = id;
  canvasName:string = localStorage.getItem('canvasName') || '';
  canvasPublisher:string = localStorage.getItem('canvasPublisher') || '';
  canvasDate:string = localStorage.getItem('canvasDate') || '';
  canvasVersion:string = localStorage.getItem('canvasVersion') || '';  

  constructor(private dialog: MatDialog, private api:GetApiService) { 
    this.api.getCanvas(this.canvasId).subscribe(data=>{
      console.warn(data);
      this.data = data;
      
    })
  }

  saveHeader() {
    let cname = (<HTMLInputElement>document.getElementById('title')).value;
    localStorage.setItem('canvasName', cname) 
    this.canvasPublisher = localStorage.getItem('canvasName') || '';

    let cpub = (<HTMLInputElement>document.getElementById('publisher')).value;
    localStorage.setItem('canvasPublisher', cpub) 
    this.canvasPublisher = localStorage.getItem('canvasPublisher') || '';

    let cdate = (<HTMLInputElement>document.getElementById('date')).value;
    localStorage.setItem('canvasDate', cdate) 
    this.canvasPublisher = localStorage.getItem('canvasDate') || '';

    let cversion = (<HTMLInputElement>document.getElementById('version')).value;
    localStorage.setItem('canvasVersion', cversion) 
    this.canvasPublisher = localStorage.getItem('canvasVersion') || '';
  }

  ngOnInit(): void { }

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  }

  
}