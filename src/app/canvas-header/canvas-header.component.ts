import { Component, Input, OnInit } from '@angular/core';
import { SharedMap } from 'fluid-framework';
import { FluidDataService } from '../services/fluid-data.service';

interface HeaderDataModel {
  canvasName: string | undefined,
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

  @Input() data: any = [];

  constructor(private fluidDataService: FluidDataService) {
  }

  sharedHeader: SharedMap | undefined;
  localHeader: HeaderDataModel = {
    canvasName: '',
    canvasDate:'',
    canvasPublisher:'',
    canvasVersion:''
  };
  updateHeader: (() => void) | undefined;

  async ngOnInit() {
    this.fluidDataService.sharedHeader$.subscribe((sharedHeader)=>{

      this.localHeader = {
        canvasName: sharedHeader!.get("canvasName"),
        canvasPublisher: sharedHeader!.get("canvasPublisher"),
        canvasDate: sharedHeader!.get("canvasDate"),
        canvasVersion: sharedHeader!.get("canvasVersion")
      }
    })
  }

  saveHeader() {
    const map = new Map<string, any>();

    map.set('canvasName', this.localHeader?.canvasName);
    map.set('canvasPublisher', this.localHeader?.canvasPublisher);
    map.set('canvasDate', this.localHeader?.canvasDate);
    map.set('canvasVersion', this.localHeader?.canvasVersion);

    this.fluidDataService.sharedHeader$.next(map);
  }

  ngOnDestroy() {
    this.sharedHeader!.off('valueChanged', this.updateHeader!);
  }

}
