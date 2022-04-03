import { Component, ViewChild, ElementRef } from '@angular/core';

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

}
