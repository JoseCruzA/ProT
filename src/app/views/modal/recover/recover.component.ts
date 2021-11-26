import { Component, OnInit, Output, EventEmitter, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  @Output() toLogin = new EventEmitter<boolean>();
  recover!: FormGroup;
  notification_title!: string;
  notification_message!: string;

  constructor(private formGroup: FormBuilder, private authService: AuthService, private translateService: TranslateService,
    private notification: NotificationsService) {
    this.recover = this.formGroup.group({
      userRecover: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ])
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
  returnLogin() {
    this.recover.reset();
    this.toLogin.emit(true);
  }

  /**
   * Method for send the form data to recover user password
   */
  onSubmit() {
    this.authService.recoverPassword(this.recover.value).subscribe((response: any) => {
      this.returnLogin();

      this.translateService.get(`notification.${response.name}`).subscribe((res: string) => {
        this.notification_title = res;
      });

      this.translateService.get(`notification.message.${response.name}`).subscribe((res: string) => {
        this.notification_message = res;
      });

      this.notification.success(this.notification_title, this.notification_message, {
        position: ["top", "right"],
        timeOut: 5000,
        nimate: "fade",
        showProgressBar: true,
      });
    }, (error: any) => {
      this.translateService.get(`notification.${error.error.name}`).subscribe((res: string) => {
        this.notification_title = res;
      });

      this.translateService.get(`notification.message.${error.error.name}`).subscribe((res: string) => {
        this.notification_message = res;
      });

      this.notification.error(this.notification_title, this.notification_message, {
        position: ["top", "right"],
        timeOut: 5000,
        animate: "fade",
        showProgressBar: true,
      });
    });
  }
}
