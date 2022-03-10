import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CanvasBuilder';
  showFiller = false;

  tiles: Tile[] = [
    {text: 'Key Partners', cols: 2, rows: 4, color: 'lightblue'},
    {text: 'Key Activities', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Value Proposition', cols: 2, rows: 4, color: 'lightblue'},
    {text: 'Customers Relationships', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Customer Segments', cols: 2, rows: 4, color: 'lightblue'},
    {text: 'Key Ressources', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Channels', cols: 2, rows: 2, color: 'lightblue'},
    {text: 'Cost Structure', cols: 5, rows: 2, color: 'lightblue'},
    {text: 'Revenue Streams', cols: 5, rows: 2, color: 'lightblue'},
  ];
}
