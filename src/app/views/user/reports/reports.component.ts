import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import * as $ from 'jquery';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit, OnChanges {

  @Input() user!: User;
  userT!: User;
  selectedLanguage!: string;
  options: DataTables.Settings = {};

  constructor() {}

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    this.selectedLanguage = lang.split("-")[0];

    if (this.selectedLanguage == 'es') {
      this.options = {
        pagingType: 'full_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
      }
    } else {
      this.options = {
        pagingType: 'full_numbers'
      }
    }
  }

  ngOnChanges(changes: any) {
    // Get the changesof each variable for can store it out of the subscribe
    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;
    }
  }

}
