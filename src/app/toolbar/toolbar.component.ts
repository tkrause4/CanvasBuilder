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

    html2canvas(document.getElementById("content")!,{scale: 2}).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/jpg').replace('image/jpg', 'image/octet-stream');

      let pdf = new jsPDF('l', 'cm', [80, 43]); // pagesize of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      
      pdf.addImage(contentDataURL, 'jpg', 0, 1, width, height, 'null', 'NONE', 0);
      pdf.save('output.pdf'); // Generated PDF

    });
  }

  copyURL() {
    var inputc = document.body.appendChild(<HTMLInputElement>document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand('copy');
  }
}
