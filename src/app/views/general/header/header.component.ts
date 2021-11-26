import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

/**
 * Class for manage the header of the web
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class HeaderComponent implements OnInit {

  isActiveMenu: boolean;
  colorChange: boolean;
  path!: string;
  activeAccount: boolean = false;
  toRegister: boolean = false;
  toLogin: boolean = false;
  toRecover: boolean = false;
  token!: string;

  constructor(private location : Location, private authService: AuthService, private router: Router) {
    this.isActiveMenu = false;
    this.colorChange = false;
  }

  ngOnInit(): void {
    this.path = this.location.path().replace("/", "");
    this.authService.validateLogin().subscribe((response: any) => {
      this.token = response;
    });
  }

  /**
   * Event Listener for scroll window
   */
  @HostListener('window:scroll', ['$event']) onScrollEvent() {
    if ((window.scrollY || window.pageYOffset) > window.innerHeight - 300) {
      this.colorChange = true;
    } else {
      this.colorChange = false;
    }
  }

  /**
   * Method that add or remove the class is-active or the burger menu
   */
  changeBurgerStatus () {
    this.isActiveMenu = !this.isActiveMenu;
  }

  /**
   * Method that set the value for open or close th register modal
   *
   * @param value
   */
  setToRegister(value: boolean) {
    this.toLogin = false;
    this.toRegister = value;
  }

  /**
   * Method that set the value for open or close th login modal
   *
   * @param value
   */
  setToLogin(value: boolean) {
    this.toRegister = false;
    this.toRecover = false;
    this.toLogin = value;
  }

  /**
   * Method that set the value for open or close th recover modal
   *
   * @param value
   */
   setToRecover(value: boolean) {
    this.toRegister = false;
    this.toLogin = false;
    this.toRecover = value;
  }

  /**
   * Method for get the user logout
   */
  logout() {
    this.authService.getLogout(this.token).subscribe((response: any) => {
      if (this.router.url.includes('/office')) {
        window.location.replace('/');
      } else {
        window.location.reload();
      }
    }, (error: any) => {
      console.log(error);
    });
  }

}
