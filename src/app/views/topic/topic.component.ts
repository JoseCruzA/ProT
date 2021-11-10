import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})

/**
 * Class whit the logic for manage the about section
 *
 * @author Marco Contreras
 * @version 1.0
 */
export class TopicComponent implements OnInit {

  selected: string;
  constructor(private translateService: TranslateService) {
    this.selected = 'known';
  }

  ngOnInit(): void {
  }

}
