import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note, NoteList } from './note-list';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  noteListSubject = new BehaviorSubject<NoteList>(new Map<number, Note[]>())

  constructor() {
  }

  saveNote(newNote: Note) {
    const noteList = this.noteListSubject.value;
    const tmp: Note[] = [];

    noteList.get(newNote.tile)?.forEach((notes) => {
      tmp.push(notes)
    });

    if (noteList.get(newNote.tile)) {
      noteList.set(newNote.tile, [...tmp, newNote]);
    } else {
      noteList.set(newNote.tile, [newNote]);
    }
    this.noteListSubject.next(noteList);
  }

  getNoteList() {
    return this.noteListSubject.value;
  }
}
