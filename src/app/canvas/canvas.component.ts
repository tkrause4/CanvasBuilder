import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';
import { GetApiService } from '../services/get-api.service';
import { SharedMap } from 'fluid-framework';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { ActivatedRoute } from '@angular/router';

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
  canvasId:string;
  type:string;

  constructor(
    private dialog: MatDialog, 
    private api:GetApiService,
    private route: ActivatedRoute) { }

    async ngOnInit() { 
      this.route.queryParams.subscribe(params => {
        this.type = params.type;
        this.canvasId = params.workspace;
      })
  
      this.api.getCanvas(this.canvasId, this.type).subscribe(data=>{
          this.data = data; 
      })
    } 

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  } 
}