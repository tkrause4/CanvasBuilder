import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedMap } from 'fluid-framework';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';
import { FluidDataService } from '../services/fluid-data.service';
import { GetApiService } from '../services/get-api.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

interface TitleDataModel {
  title: string | undefined;
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  sharedTitles: SharedMap | undefined;
  localTitles: TitleDataModel[] = [];
  updatelocalTitles: (() => void) | undefined;

  data: any = [];
  canvasId: string;
  type: string;

  constructor(
    private dialog: MatDialog,
    private api: GetApiService,
    private fluidDataService: FluidDataService,
    private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params.type;
      this.canvasId = params.workspace;
    })

    if (this.canvasId != undefined && this.type != undefined) {
      this.api.getCanvas(this.canvasId, this.type).subscribe(data => {
        this.data = data;
      })
    } else {
      console.log('keine Vorlage ausgewählt');
    }

    this.syncData();
  }


  syncData() {
    if (this.sharedTitles) {
      console.log(this.data.tiles)
      for (let i = 0; i < this.data.tiles; i++) {
        this.updatelocalTitles = () => {
          this.localTitles![i] = {
            title: this.sharedTitles!.get(i.toString())
          }
        }
        this.updatelocalTitles();
        console.log('hallo')
        this.sharedTitles!.on('valueChanged', this.updatelocalTitles!);
      }
    }
  }

  saveHeader() {
    for (let i = 0; i < this.data.tiles; i++) {
      this.sharedTitles?.set(i.toString(), (<HTMLInputElement>document.getElementById(i.toString())).value);
    }
  }

  ngOnDestroy() {
    // this.sharedTitles!.off('valueChanged', this.updatelocalTitles!);
  }

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  }
}
