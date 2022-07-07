import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { FluidDataService } from '../services/fluid-data.service';
import { Note } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})

export class NoteListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();
  constructor(private noteListService: NoteListService,
              private fluidDataService: FluidDataService) {
  }

  tileNotes: Note[] = [];
  @Input() tile: number;

  public setDataFromNote(data: Note[]) {
    this.tileNotes = data;
    this.fluidDataService.sharedNoteList$.next(new Map().set(this.tile.toString(), this.tileNotes));
  }

  async ngOnInit() {

    this.setTileNotes();
    this.noteListService.noteSubject
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((note) => {
      if(note.tile === this.tile) {
        this.fluidDataService.sharedNoteList$.next(new Map().set(String(note.tile), [...this.tileNotes, note]));
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  setTileNotes() {
    this.fluidDataService.sharedNoteList$.subscribe((sharedNoteList)=>{
      this.tileNotes = sharedNoteList.get(String(this.tile)) ?? [];
    })
  }

}
