import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;

  constructor() { }

  ngOnInit(): void {
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
}
