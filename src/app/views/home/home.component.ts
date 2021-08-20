import { Component, OnInit } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

registerLocaleData(localeEs);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

/**
 * Class for manage the home page
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class HomeComponent implements OnInit {
  selectedLanguage = "en";
  token!: string;
  user!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    lang = lang.split("-")[0];

    if (lang != this.selectedLanguage) {
      this.selectedLanguage = lang;
    }

    this.authService.validateLogin().subscribe((response: any) => {
      this.token = response;
    });
  }

  /**
   * Function for open login modal
   */
  openLogin() {
    document.getElementById('btn-login')?.click();
  }

  /**
   * Function for open register modal
   */
  openRegister() {
    document.getElementById('btn-register')?.click();
  }
}
