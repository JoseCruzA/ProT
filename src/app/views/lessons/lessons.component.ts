import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})

/**
 * Class whit the logic for manage the about section
 *
 * @author Marco Contreras
 * @version 1.0
 */
export class LessonsComponent implements OnInit {
  
  selected: string;
  constructor(private translateService: TranslateService) {
    this.selected = 'known';
  }

  ngOnInit(): void {
  }

}
