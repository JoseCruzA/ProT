import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  login!: FormGroup;

  constructor(private formGroup: FormBuilder) {
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

  /**
   * Method for send the form data to login user
   */
  onSubmit() {
    
  }

}
