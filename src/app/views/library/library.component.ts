import { Component, OnInit } from '@angular/core';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { fromPath } from 'pdf2pic';

const options = {
  density: 100,
  saveFilename: "untitled",
  savePath: "./images",
  format: "png",
  width: 600,
  height: 600
};

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  images: any = [];
  pdfSrc = '../assets/pdf/new-professionals.pdf';

  constructor() { }

  ngOnInit(): void {
    /*const reader = new FileReader();
    const fileInfo = event.target.files[0];
    if (fileInfo) {
         reader.readAsBinaryString(event.target.files[0]);
         reader.onloadend = () => {
             const count = reader.result.match(/\/Type[\s]*\/Page[^s]/g).length;
             console.log('Number of Pages:', count);
         }
    }*/
  }

  afterLoadPdf(pdf: PDFDocumentProxy) {
    console.log(pdf.numPages);
    document.querySelector('.viewer-pdf')?.classList.add('d-none');
    for (let i = 1; i <= pdf.numPages; i++) {
      //this.images.push(fromPath(this.pdfSrc, options));
    }
  }

}
