import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { SharedMap } from "fluid-framework";
import { TinyliciousClient } from '@fluidframework/tinylicious-client';

interface TimestampDataModel { time: string | undefined; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

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




  onButtonClick() {
    this.sharedTimestamp?.set('time', Date.now().toString());
  }

}
