import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})

/**
 * Class whit the logic for manage the about section
 *
 * @author Marco Contreras
 * @version 1.0
 */
export class TrainingComponent implements OnInit {

  selected: string;
  constructor(private translateService: TranslateService) {
    this.selected = 'known';
  }

  ngOnInit(): void {}

  /**
   * Method that gets the text for i18n and insert it like html
   */
   getAboutText(): void {
    let p = document.querySelector('#royal-invest');

    this.translateService.get('about.invest-company').subscribe((res: string) => {
      p!.innerHTML = res;
    });

    this.translateService.get('about.our-company').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });

    this.translateService.get('about.commercial').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });

    this.translateService.get('about.package-created').subscribe((res: string) => {
      p!.innerHTML += '<br><br>';
      p!.innerHTML += res;
    });
  }
}
