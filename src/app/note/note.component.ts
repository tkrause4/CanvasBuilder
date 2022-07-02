import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Note, NoteList } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SharedMap } from 'fluid-framework';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() tileNotes: Note[];
  @Output() event: EventEmitter<Note[]> = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editNoteDialog(note:Note, tileNotes:Note[]) {
    const dialogRef = this.dialog.open(EditNoteDialogComponent, {
      data: {
        noteID: note.id, 
        noteTile: note.tile,
        noteText: note.text,
        noteColor: note.styles.color,
        noteMargin: note.styles.margin,
        noteRotate: note.styles.rotate,
        tileNotes: tileNotes,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.event.emit(this.tileNotes);
      console.log('The dialog was closed');
    });
  }

}
