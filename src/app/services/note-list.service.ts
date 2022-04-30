import { Injectable, OnInit } from '@angular/core';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { SharedMap } from 'fluid-framework';
import { BehaviorSubject } from 'rxjs';
import { Note, NoteList } from './note-list';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  noteListSubject = new BehaviorSubject<NoteList>({})


  constructor() {
  }




  saveNote(newNote: Note) {
    const noteList = this.noteListSubject.value as NoteList;
    const prevNoteList: Note[] = [];

    noteList[newNote.tile]?.forEach((notes) => {
      prevNoteList.push(notes)
    });


    noteList[newNote.tile] = [...prevNoteList, newNote];

    this.noteListSubject.next(noteList);

  }

  getNoteList() {
    return this.noteListSubject.value;
  }
}
