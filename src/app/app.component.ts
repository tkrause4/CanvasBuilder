import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FluidDataService } from './services/fluid-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'CanvasBuilder';

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(private fluidDataService: FluidDataService) {
  }

  async ngOnInit() {
    await this.fluidDataService.initData();
  }


}
