import { Component, OnInit } from '@angular/core';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';

@Component({
  selector: 'app-generate-qr',
  templateUrl: './generate-qr.component.html',
  styleUrls: ['./generate-qr.component.scss']
})
export class GenerateQrComponent implements OnInit {

  elementType:any = NgxQrcodeElementTypes.URL;
  value = window.location.href;
  CorrectionLevel:any = NgxQrcodeErrorCorrectionLevels.HIGH;

  constructor() { }

  ngOnInit(): void {
  }

}
