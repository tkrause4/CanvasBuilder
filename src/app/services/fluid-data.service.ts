import { Injectable } from '@angular/core';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { SharedMap } from 'fluid-framework';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FluidDataService {

  sharedNoteList$: Subject<Map<string, any>> = new Subject();
  sharedHeader$: Subject<Map<string, any>> = new Subject();
  sharedTitles$: Subject<Map<string, any>> = new Subject();
  private sharedNoteList: SharedMap;
  private sharedHeader: SharedMap;
  private sharedTitles: SharedMap;

  constructor() {
  }

  async initData() {
    const client = new TinyliciousClient();
    const containerSchema = {
      initialObjects: {
        sharedNoteList: SharedMap,
        sharedHeader: SharedMap,
        sharedTitles: SharedMap
      }
    };

    let container;
    const containerId = location.hash.substring(1);
    if (!containerId) {
      ({container} = await client.createContainer(containerSchema));
      location.hash =  await container.attach();
    } else {
      ({container} = await client.getContainer(containerId, containerSchema));
    }
    this.sharedHeader = container.initialObjects.sharedHeader as SharedMap;
    this.sharedNoteList = container.initialObjects.sharedNoteList as SharedMap;
    this.sharedTitles = container.initialObjects.sharedTitles as SharedMap;
    this.syncData();
  }

  private syncData() {
    this.syncHeader();
    this.syncNoteList();
    this.syncTitles();
  }

  private syncHeader() {
    this.sharedHeader$.pipe(
      distinctUntilChanged(),
      debounceTime(100)
    )
      .subscribe((headerMap) => {
        headerMap.forEach((value, key) => {
            if (this.sharedHeader.get(key) !== value) {
              this.sharedHeader.set(key, value);
            }
          }
        )
      })
    this.sharedHeader!.on('valueChanged', () => {
      const newMap = new Map<string, string>();
      this.sharedHeader.forEach((value, key) => {
        newMap.set(key, value);
      });
      this.sharedHeader$.next(newMap);
    });
  }

  private syncNoteList() {
    this.sharedNoteList$.pipe(
      distinctUntilChanged(),
      debounceTime(100)
    )
      .subscribe((noteList) => {
        noteList.forEach((value, key) => {
            if (this.sharedNoteList.get(key) !== value) {
              this.sharedNoteList.set(key, value);
            }
          }
        )
      })
    this.sharedNoteList!.on('valueChanged', () => {
      const newMap = new Map<string, string>();
      this.sharedNoteList.forEach((value, key) => {
        newMap.set(key, value);
      });
      this.sharedNoteList$.next(newMap);
    });
  }

  private syncTitles() {
    this.sharedTitles$.pipe(
      distinctUntilChanged(),
      debounceTime(100)
    )
      .subscribe((headerMap) => {
        headerMap.forEach((value, key) => {
            if (this.sharedTitles.get(key) !== value) {
              this.sharedTitles.set(key, value);
            }
          }
        )
      })
    this.sharedTitles!.on('valueChanged', () => {
      const newMap = new Map<string, string>();
      this.sharedTitles.forEach((value, key) => {
        newMap.set(key, value);
      });
      this.sharedTitles$.next(newMap);
    });
  }

}
