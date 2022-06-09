import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';
import { EditNoteDialogComponent } from '../edit-note-dialog/edit-note-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  @Input() tileNotes: any;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editNoteDialog(note: Note) {
    this.dialog.open(EditNoteDialogComponent, {data: note});
  }

}
