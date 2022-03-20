import { Component, ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'CanvasBuilder';
  showFiller = false;
  selectedMenu:any='Home';
  @ViewChild('content', {static: false}) el!: ElementRef;
  j:number = 0;
  textvalue:string = '';

  goTo(paramText:string){
    this.selectedMenu = paramText
  }

  public makepdf() {
    html2canvas(document.getElementById("content")!).then(canvas => {
    
    const contentDataURL = canvas.toDataURL('image/png')
    let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
    var width = pdf.internal.pageSize.getWidth();
    var height = canvas.height * width / canvas.width;
    pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height, 'null', 'NONE', 0)
    pdf.save('output.pdf'); // Generated PDF

    });
  }

  public typeNote(nr:number) {
    let container3 = Array.from(document.getElementsByClassName('container3') as HTMLCollectionOf<HTMLElement>)[0];
    if(container3.style.display == 'none'){
      container3.style.display = 'block';
      this.j = nr;
    } else {
      container3.style.display = 'none';
    }
  }

  public createNote(i:number) {
    let random_color = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
    let random_margin = ["-5px", "1px", "5px", "10px", "7px"];
    let random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
    let container3 = Array.from(document.getElementsByClassName('container3') as HTMLCollectionOf<HTMLElement>)[0];
    let container2 = Array.from(document.getElementsByClassName('card-elements-notes') as HTMLCollectionOf<HTMLElement>)[i];
    let noteText = (document.getElementById('note-text') as HTMLInputElement).value;
    let node0 = document.createElement("div");
    let node1 = document.createElement("h1");

    node1.innerHTML = noteText;

    node1.setAttribute("style", "width:75px; height:75px; font-size:10px; padding:5px; margin-top:5px; overflow:hidden; box-shadow:0px 10px 24px 0px rgba(0,0,0,0.75)");

    node1.style.margin = random_margin[Math.floor(Math.random() * random_margin.length)];
    node1.style.transform = random_rotate[Math.floor(Math.random() * random_rotate.length)];
    node1.style.background = random_color[Math.floor(Math.random() * random_color.length)];

    node0.appendChild(node1);

    container2.insertAdjacentElement("beforeend", node0);

    node0.addEventListener("mouseenter", function(){
      node0.style.transform = "scale(1.1)";
    })

    node0.addEventListener("mouseleave", function(){
      node0.style.transform = "scale(1)";
    })

    node0.addEventListener("dblclick", function(){
      node0.remove();
    })

    container3.style.display = 'none';
  }

  public resetValue(){
    (document.getElementById('note-text') as HTMLInputElement).value = "";
  }

  tiles: Tile[] = [
    {text: 'Key Partners', cols: 2, rows: 4, color: 'lightgray'},
    {text: 'Key Activities', cols: 2, rows: 2, color: 'lightgray'},
    {text: 'Value Proposition', cols: 2, rows: 4, color: 'lightgray'},
    {text: 'Customers Relationships', cols: 2, rows: 2, color: 'lightgray'},
    {text: 'Customer Segments', cols: 2, rows: 4, color: 'lightgray'},
    {text: 'Key Ressources', cols: 2, rows: 2, color: 'lightgray'},
    {text: 'Channels', cols: 2, rows: 2, color: 'lightgray'},
    {text: 'Cost Structure', cols: 5, rows: 2, color: 'lightgray'},
    {text: 'Revenue Streams', cols: 5, rows: 2, color: 'lightgray'},
  ];
}
