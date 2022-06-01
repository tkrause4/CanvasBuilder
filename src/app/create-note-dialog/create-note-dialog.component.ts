import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-note',
  templateUrl: './create-note-dialog.component.html',
  styleUrls: ['./create-note-dialog.component.scss']
})
export class CreateNoteDialogComponent implements OnInit {

  noteText = '';
  COLORS = ["#c2ff3d", "#ff3de8", "#3dc2ff", "#04e022", "#bc83e6", "#ebb328"];
  MARGINS = ["-5px", "1px", "5px", "10px", "7px"];
  ROTATES = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];

  constructor(public dialogRef: MatDialogRef<CreateNoteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private noteListService: NoteListService) {
  }

  ngOnInit(): void {
  }

  public createNote() {
    this.noteListService.saveNote({
      tile: this.data,
      text: this.noteText,
      styles: {
        color: this.getRandomValue(this.COLORS),
        margin: this.getRandomValue(this.MARGINS),
        rotate: this.getRandomValue(this.ROTATES)
      }
    });
  }

  getRandomValue(valueSet: string[]) {
    return valueSet[Math.floor(Math.random() * this.MARGINS.length)];
  }

  public resetValue() {
    this.noteText = "";
  }

}
