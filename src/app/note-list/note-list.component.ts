import { Component, Input, OnInit } from '@angular/core';
import { TinyliciousClient } from '@fluidframework/tinylicious-client';
import { SharedMap } from 'fluid-framework';
import { Note, NoteList } from '../services/note-list';

import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  private sharedNoteList: SharedMap;
  constructor(private noteListService: NoteListService) {
  }

  tileNotes: Note[];
  @Input() tile: number;

  async ngOnInit() {

    this.sharedNoteList = await this.getFluidData();
    this.noteListService.noteListSubject.subscribe((noteList) => {
      this.tileNotes = noteList[this.tile] ?? [];
      this.sharedNoteList.set(String(this.tile), noteList)
    })
    this.sharedNoteList.on('valueChanged', (value: any) => {
      console.log(value)

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
      const id = await container.attach();
      location.hash = id;
    } else {
      ({container} = await client.getContainer(containerId, containerSchema));
    }

    return container.initialObjects['sharedNoteList'] as SharedMap;

  }

  createNode() {


    // node1.setAttribute("style", "width:75px; height:75px; font-size:10px; padding:5px; margin-top:5px; overflow:hidden; box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75);");
    //
    // node1.style.margin = random_margin[Math.floor(Math.random() * random_margin.length)];
    // node1.style.transform = random_rotate[Math.floor(Math.random() * random_rotate.length)];
    // random_color[Math.floor(Math.random() * random_color.length)];
    //
    //
    //
    // node0.addEventListener("mouseenter", function(){
    //   node0.style.transform = "scale(1.1)";
    // })
    //
    // node0.addEventListener("mouseleave", function(){
    //   node0.style.transform = "scale(1)";
    // })
    //
    // node0.addEventListener("dblclick", function(){
    //   node0.remove();
    // })


  }


}
