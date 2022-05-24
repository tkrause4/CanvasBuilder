import { Component, OnInit } from '@angular/core';
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
    
  constructor(private dialog: MatDialog, private api:GetApiService) {
    let canvasId:String = id;
    this.api.getCanvas(canvasId).subscribe(data=>{
      console.warn(data);
      this.data = data;
    })
   }

  ngOnInit(): void { }

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  }

  
}
