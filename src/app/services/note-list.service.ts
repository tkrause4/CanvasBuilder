import { Injectable, OnInit } from '@angular/core';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { SharedMap } from 'fluid-framework';
import { BehaviorSubject, Subject } from 'rxjs';
import { Note, NoteList } from './note-list';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  noteSubject = new Subject<Note>()

  constructor() {
  }

  saveNote(newNote: Note) {
    this.noteSubject.next(newNote);
  }

  updateNote(editNote: Note, tileNotes: Note[]) {
    for (let i = 0; i < tileNotes.length; i++){
      if (editNote.id == tileNotes[i].id){
        tileNotes[i].text = editNote.text;
      }
    }
  }

  deleteNote(deleteNote: String, tileNotes:Note[]) {
    for (let i = 0; i < tileNotes.length; i++){
      if (deleteNote == tileNotes[i].id){
        tileNotes.splice(i,1);
        i--;
      }
    }
  }

}
