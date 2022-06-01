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

}
