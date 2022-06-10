import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';
import { GetApiService } from '../services/get-api.service';
import { id } from '../custom-layouts/custom-layouts.component';
import { SharedMap } from 'fluid-framework';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface HeaderDataModel { 
  canvasName: string | undefined,
  canvasPublisher: string | undefined,
  canvasDate: string | undefined,
  canvasVersion: string | undefined 
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  data:any = [];
  canvasId:string = id;
  canvasName:string = '';
  canvasPublisher:string = '';
  canvasDate:string = '';
  canvasVersion:string = '';

  constructor(private dialog: MatDialog, private api:GetApiService) { 
    this.api.getCanvas(this.canvasId).subscribe(data=>{
      console.warn(data);
      this.data = data; 
    })
  }

  sharedHeader: SharedMap | undefined;
  localHeader: HeaderDataModel | undefined;
  updateHeader: (() => void) | undefined;

  saveHeader() {
      this.canvasName = (<HTMLInputElement>document.getElementById('title')).value
      this.canvasName = (<HTMLInputElement>document.getElementById('publisher')).value
      this.canvasName = (<HTMLInputElement>document.getElementById('date')).value
      this.canvasName = (<HTMLInputElement>document.getElementById('version')).value

      this.sharedHeader?.set('canvasName', this.canvasName);
      this.sharedHeader?.set('canvasPublisher', this.canvasPublisher);
      this.sharedHeader?.set('canvasDate', this.canvasDate);
      this.sharedHeader?.set('canvasVersion', this.canvasVersion);
  }

  ngOnInit(): void { }

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  } 
}