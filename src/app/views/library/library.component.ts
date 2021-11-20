import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  dir = '../assets/';
  files = ['new-professionals', 'think-big', 'the-monk', 'leader-in-you', 'think-make-rich', 'go-pro', 'business-school', 'before-leave-job', 'power-no-limits', 'rich-father', 'the-cow', '10-steps-to-succeed', 'be-influent-persons', '7-steps', 'the-cashflow-cuadrant'];

  constructor() { }

  ngOnInit(): void {}

  openPDF(book: string) {
    window.open(`${this.dir}pdf/${book}.pdf`, book);
  }
}
