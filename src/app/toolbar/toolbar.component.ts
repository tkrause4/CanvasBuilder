import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { GenerateQrComponent } from '../generate-qr/generate-qr.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent implements OnInit {
  @Input() inputSideNav: MatSidenav;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

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
    inputc.parentNode?.removeChild(inputc);
  }

  generateQR() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position = {top:'60px', right:'10px'}
    this.dialog.open(GenerateQrComponent, dialogConfig);
  }
}