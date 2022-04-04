import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateNoteDialogComponent } from '../create-note-dialog/create-note-dialog.component';

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

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  createNoteDialog(tileIndex: number) {
    this.dialog.open(CreateNoteDialogComponent, {data: tileIndex});
  }


  tiles: Tile[] = [
    {text: 'Key Partners', cols: 2, rows: 4, color: 'white'},
    {text: 'Key Activities', cols: 2, rows: 2, color: 'white'},
    {text: 'Value Proposition', cols: 2, rows: 4, color: 'white'},
    {text: 'Customers Relationships', cols: 2, rows: 2, color: 'white'},
    {text: 'Customer Segments', cols: 2, rows: 4, color: 'white'},
    {text: 'Key Ressources', cols: 2, rows: 2, color: 'white'},
    {text: 'Channels', cols: 2, rows: 2, color: 'white'},
    {text: 'Cost Structure', cols: 5, rows: 2, color: 'white'},
    {text: 'Revenue Streams', cols: 5, rows: 2, color: 'white'},
  ];
}
