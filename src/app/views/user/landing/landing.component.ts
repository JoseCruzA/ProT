import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService, private translateService: TranslateService) { }

  ngOnInit(): void {
    let username = localStorage.getItem('username');
    localStorage.removeItem('username');

    if (username) {
      this.userService.getUserByUsername(username).subscribe((user: User) => {
        this.user = user;
      });
    }

    document.querySelector('nav')?.setAttribute('style', 'display: none;');
    document.querySelector('div.footer')?.setAttribute('style', 'display: none;');

    this.getText();
  }

  /**
   * Method that join to the view the text needed
   */
  getText() {
    let info = document.querySelector('.info-royal');
    let about = document.querySelector('.info-royal-about');
    let pack = document.querySelector('.package-created');
    let list = document.querySelector('.what-do-list');
    let contact = document.querySelector('.contact-whatsapp');

    this.translateService.get('about.invest-company').subscribe((res: string) => {
      res = res.replace(/has-text-white/g, '');
      info!.innerHTML = `${res}.`;
    });

    this.translateService.get('about.our-company').subscribe((res: string) => {
      res = res.replace(/has-text-white/g, '');
      about!.innerHTML = res;
    });

    this.translateService.get('landing.package-created').subscribe((res: string) => {
      res = res.replace(/has-text-white/g, '');
      pack!.innerHTML = res;
    });

    this.translateService.get('landing.contact-me').subscribe((res: string) => {
      contact!.innerHTML = res;
    });
  }

}
