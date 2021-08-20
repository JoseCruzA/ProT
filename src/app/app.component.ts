import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/**
 * Principal class for manage the general function of the web
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class AppComponent {
  title: string = "prot-system";
  selectedLanguage = "en";

  constructor(private translateService: TranslateService, private titleService: Title) {
    this.translateService.setDefaultLang(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
  }

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    lang = lang.split("-")[0];

    if (lang != this.selectedLanguage) {
      try {
        this.selectLanguage(lang);
      } catch (error) {
        this.selectLanguage(this.selectedLanguage);
      }
    }

    this.translateService.get('general.page-title').subscribe((res: string) => {
      this.titleService.setTitle(res);
    });
  }

  /**
   * Method for change the app language
   *
   * @param lang the new language
   */
  selectLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
