import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Note } from '../services/note-list';
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

  public editNote(note: Note) {
    this.noteListService.updateNote({
      id: note.id,
      tile: note.tile,
      text: note.text,
      styles: {
        color: note.styles.color,
        margin: note.styles.margin,
        rotate: note.styles.rotate
      }
    });
  }

  public deleteNote(note: Note) {
    this.noteListService.deleteNote(note)
  }
}
