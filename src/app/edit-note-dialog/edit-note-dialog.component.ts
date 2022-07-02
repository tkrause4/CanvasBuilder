import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note, NoteList } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.scss']
})
export class EditNoteDialogComponent implements OnInit {

  @Input() note: Note;

  constructor(public dialogRef: MatDialogRef<EditNoteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private noteListService: NoteListService) { }

  ngOnInit(): void { }

  public editNote() {
    this.noteListService.updateNote({
      id: this.data.noteID,
      tile: this.data.noteTile,
      text: this.data.noteText,
      styles: {
        color: this.data.noteColor,
        margin: this.data.noteMargin,
        rotate: this.data.noteRotate
      }
    },
    this.data.tileNotes
    );
    
  }

  public deleteNote() {
    this.noteListService.deleteNote(this.data.noteID, this.data.tileNotes)
  }
}
