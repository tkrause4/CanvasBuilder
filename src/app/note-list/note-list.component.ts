import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../services/note-list';

import { NoteListService } from '../services/note-list.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {

  constructor(private noteListService: NoteListService) { }

  tileNotes: Note[];
  @Input() tile: number;

  ngOnInit(): void {


    this.noteListService.noteListSubject.subscribe((noteList)=>{
      this.tileNotes = noteList.get(this.tile)?? [];
    })
  }
  createNode(){





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
