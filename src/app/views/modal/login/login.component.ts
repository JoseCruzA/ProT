import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/**
 * Class with the logic for manage the login view
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class LoginComponent implements OnInit {

  @Output() toRegister = new EventEmitter<boolean>();
  @Output() toLogin = new EventEmitter<boolean>();
  @Output() toRecover = new EventEmitter<boolean>();
  login!: FormGroup;

  constructor(private formGroup: FormBuilder, private authService: AuthService, private translateService: TranslateService) {
    this.login = this.formGroup.group({
      user: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      remember: false
    });
  }

  ngOnInit(): void {

  }

  /**
   * Close the notitication
   */
  closeNotification() {
    if (!document.querySelector('.notification')!.classList.contains('d-none')) {
      document.querySelector('.notification')!.classList.add('d-none');
    }
  }

  /**
   * Method for send the boolean for close the login modal
   */
  closeModal() {
    this.login.reset();
    this.toLogin.emit(false);
  }

  /**
   * Method for close the login modal and open de register modal
   */
  closeAndRegister() {
    this.login.reset();
    this.toRegister.emit(true);
  }

  closeAndRecover() {
    this.login.reset();
    this.toRecover.emit(true);
  }

  /**
   * Method for send the form data to login user
   */
  onSubmit() {
    this.authService.login(this.login.value).subscribe((response) => {
      this.login.reset();
      this.closeModal();
      window.location.replace('/office');
    }, (error) => {
      this.translateService.get(`errors.${error.error.name}`).subscribe((res: string) => {
        document.querySelector('.error')!.innerHTML = res;
      });

      if (document.querySelector('.notification')!.classList.contains('d-none')) {
        document.querySelector('.notification')!.classList.remove('d-none');
      }
    });
  }

}
