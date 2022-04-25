import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { SharedMap } from "fluid-framework";
import { TinyliciousClient } from '@fluidframework/tinylicious-client';

interface TimestampDataModel { time: string | undefined; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'CanvasBuilder';
  showFiller = false;
  selectedMenu:any='Home';
  @ViewChild('content', {static: false}) el!: ElementRef;
  textvalue:string = '';

  goTo(paramText:string){
    this.selectedMenu = paramText
  }

  sharedTimestamp: SharedMap | undefined;
  sharedNotes: SharedMap | undefined;
  localTimestamp: TimestampDataModel | undefined;
  updateLocalTimestamp: (() => void) | undefined;

  async ngOnInit() {
    this.sharedTimestamp = await this.getFluidData();
    this.syncData();
  }

  ngOnDestroy() {
    this.sharedTimestamp!.off('valueChanged', this.updateLocalTimestamp!);
  }

  async getFluidData() {

    const client = new TinyliciousClient();
    const containerSchema = {
    initialObjects: { sharedTimestamp: SharedMap }
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

    return container.initialObjects['sharedTimestamp'] as SharedMap;

  }

  syncData() {
    // Only sync if the Fluid SharedMap object is defined.
    if (this.sharedTimestamp) {
      this.updateLocalTimestamp = () => { this.localTimestamp = { time: this.sharedTimestamp!.get("time") } };
      this.updateLocalTimestamp();
  
      this.sharedTimestamp!.on('valueChanged', this.updateLocalTimestamp!);
    }
  }

  onButtonClick() {
    this.sharedTimestamp?.set('time', Date.now().toString());
  }

}
