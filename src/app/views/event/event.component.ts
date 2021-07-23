import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  selectedLanguage = "en";

  constructor() { }

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    lang = lang.split("-")[0];

    if (lang != this.selectedLanguage) {
      this.selectedLanguage = lang;
    }
  }
}
