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

interface TitleDataModel { 
  title: string | undefined;
};

interface Title extends Array<TitleDataModel> { }

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {

  sharedTitles: SharedMap | undefined;
  localTitles: Title | undefined;
  updatelocalTitles: (() => void) | undefined;

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
  
      if (this.canvasId != undefined && this.type != undefined) {
        this.api.getCanvas(this.canvasId, this.type).subscribe(data=>{
            this.data = data; 
        })
      } else {
        console.log('keine Vorlage ausgewählt');
      }  

      if (this.type == 'templates') {
         this.sharedTitles = await this.getFluidData();
         this.syncData();
      }
  } 

  async getFluidData() {
    const client = new TinyliciousClient();
    const containerSchema = {
      initialObjects: {
        sharedNoteList: SharedMap, 
        sharedHeader: SharedMap,
        sharedTitles: SharedMap
      }
    };

    let container;
    const containerId = location.hash.substring(1);
    if (!containerId) {
      ({ container } = await client.createContainer(containerSchema));
      const id = await container.attach();
      location.hash = id;
    }
    else {
    ({ container } = await client.getContainer(containerId, containerSchema));
    }

    return container.initialObjects.sharedTitles as SharedMap;
  }

  syncData() {
    if (this.sharedTitles) {
      console.log(this.data.tiles)
      for (let i=0; i< this.data.tiles; i++){
        this.updatelocalTitles = () => { this.localTitles![i] = {
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
    for (let i=0; i< this.data.tiles; i++){
      this.sharedTitles?.set(i.toString(), (<HTMLInputElement>document.getElementById(i.toString())).value);
    }   
  }
  
  ngOnDestroy() { 
    this.sharedTitles!.off('valueChanged', this.updatelocalTitles!); 
  }

  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  } 
}