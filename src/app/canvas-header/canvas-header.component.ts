import { Component, Input, OnInit } from '@angular/core';
import { SharedMap } from 'fluid-framework';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';

interface HeaderDataModel { 
  canvasName: string | undefined;
  canvasPublisher: string | undefined,
  canvasDate: string | undefined,
  canvasVersion: string | undefined 
}

@Component({
  selector: 'app-canvas-header',
  templateUrl: './canvas-header.component.html',
  styleUrls: ['./canvas-header.component.scss']
})
export class CanvasHeaderComponent implements OnInit {

  @Input() data:any = [];

  constructor() { }

  sharedHeader: SharedMap | undefined;
  localHeader: HeaderDataModel | undefined;
  updateHeader: (() => void) | undefined;

  async ngOnInit() { 
    this.sharedHeader = await this.getFluidData();
    this.syncData();
  } 

  async getFluidData() {
    const client = new TinyliciousClient();
    const containerSchema = {
      initialObjects: {
        sharedNoteList: SharedMap, 
        sharedHeader: SharedMap 
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

    return container.initialObjects.sharedHeader as SharedMap;
  }

  syncData() {
    if (this.sharedHeader) {
      this.updateHeader = () => { this.localHeader = { 
        canvasName: this.sharedHeader!.get("canvasName"),
        canvasPublisher: this.sharedHeader!.get("canvasPublisher"),
        canvasDate: this.sharedHeader!.get("canvasDate"),
        canvasVersion: this.sharedHeader!.get("canvasVersion") 
      }  
    };
      this.updateHeader();
  
      this.sharedHeader!.on('valueChanged', this.updateHeader!);
    }
  }

  saveHeader() {
    this.sharedHeader?.set('canvasName', (<HTMLInputElement>document.getElementById('title')).value);
    this.sharedHeader?.set('canvasPublisher', (<HTMLInputElement>document.getElementById('publisher')).value);
    this.sharedHeader?.set('canvasDate', (<HTMLInputElement>document.getElementById('date')).value);
    this.sharedHeader?.set('canvasVersion', (<HTMLInputElement>document.getElementById('version')).value);    
  }
  
  ngOnDestroy() { 
    this.sharedHeader!.off('valueChanged', this.updateHeader!); 
  }

}
