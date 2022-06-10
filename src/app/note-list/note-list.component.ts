import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { SharedMap } from 'fluid-framework';
import { distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Note } from '../services/note-list';
import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})

export class NoteListComponent implements OnInit, OnDestroy {
  private sharedNoteList: SharedMap;
  private destroy$ = new Subject();
  constructor(private noteListService: NoteListService) {
  }

  tileNotes: Note[] = [];
  @Input() tile: number;

  async ngOnInit() {
   
    this.sharedNoteList = await this.getFluidData();
    this.setTileNotes();
    this.noteListService.noteSubject
    .pipe(
      takeUntil(this.destroy$),
      distinctUntilChanged()
    ).subscribe((note) => {
      if(note.tile === this.tile) {
        const tmp = this.sharedNoteList.get(String(this.tile)) ?? [];
        this.sharedNoteList.set(String(note.tile), [...tmp, note]);
      }
    })

    this.sharedNoteList.on('valueChanged', () => {
      this.setTileNotes();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  setTileNotes() {
    this.sharedNoteList.forEach((value, key, map) => {
      this.tileNotes = map.get(String(this.tile))?.value ?? [];
    });
  }

  async getFluidData() {

    const client = new TinyliciousClient();
    const containerSchema = {
      initialObjects: {sharedNoteList: SharedMap}
    };

    let container;
    const containerId = location.hash.substring(1);
    if (!containerId) {
      ({container} = await client.createContainer(containerSchema));
      location.hash = await container.attach();
    } else {
      ({container} = await client.getContainer(containerId, containerSchema));
    }

    return container.initialObjects['sharedNoteList'] as SharedMap;

  }
}
