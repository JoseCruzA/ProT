import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

/**
 * class with the logic for manage the user profile
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class ProfileComponent implements OnInit, OnChanges {

  update: FormGroup;
  changePass: FormGroup;
  @Input() countries!: Country[];
  @Input() user!: User;
  @Input() token!: string;
  @Output() setFlag = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<void>();
  userT!: User;
  countriesT!: Country[];
  tokenT!: string;
  flag!: string;
  selectedLanguage!: string;
  updateErrors: string[] = [];
  changeErrors: string[] = [];

  constructor(private formGroup: FormBuilder, private userService: UserService) {
    this.update = this.formGroup.group({
      firstname: new FormControl("", [
        Validators.required
      ]),
      lastname: "",
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      code: new FormControl(null),
      phone: new FormControl(null),
      country: new FormControl("", [
        Validators.required
      ])
    }, { validators: this.validateChanges });

    this.changePass = this.formGroup.group({
      current: new FormControl("", [
        Validators.required,
        Validators.pattern(/((?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[$&+,:;=?@#|'<>.^*()%!-]+)).{8,}/),
        Validators.minLength(8)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(/((?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[$&+,:;=?@#|'<>.^*()%!-]+)).{8,}/),
        Validators.minLength(8)
      ]),
      rePassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
    }, { validators: this.comparePasswords });
  }

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    this.selectedLanguage = lang.split("-")[0];
  }

  ngOnChanges(changes: any) {
    // Get the changesof each variable for can store it out of the subscribe
    if (changes.token?.currentValue != undefined) {
      this.tokenT = changes.token.currentValue;
    }

    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;

      this.update.patchValue({
        firstname: this.userT.name.firstname,
        lastname: this.userT.name.lastname,
        email: this.userT.contact.email,
        phone: this.userT.contact.phone.number
      });
    }

    if (changes.countries?.currentValue != undefined && this.userT != undefined) {
      this.countriesT = changes.countries.currentValue;
      let country = this.countriesT.filter((country: Country) => {
        return (country.callingCodes[0] == this.userT.contact.phone.code);
      })[0];

      this.flag = country.flag;
      this.setFlag.emit(country.flag);
      this.update.patchValue({code: country.callingCodes[0], country: (country.translations[this.selectedLanguage] ? country.translations[this.selectedLanguage] : country.name)});
    }
  }

  /**
   * Method that get the form controls
   *
   * @return {*} the controls of the form
   */
  get fu(): { [key: string]: AbstractControl } {
    return this.update.controls;
  }

  /**
   * Method that get the form controls
   *
   * @return {*} the controls of the form
   */
   get fc(): { [key: string]: AbstractControl } {
    return this.changePass.controls;
  }

  /**
   * On change select country function
   *
   * @param event
   */
  onSelectCountry() {
    if (this.update.value.country) {
      let country = this.countriesT.filter(country => {
        return (country.translations[this.selectedLanguage] == this.update.value.country || country.name == this.update.value.country);
      })[0];

      this.flag = country.flag;
      this.update.patchValue({code: country.callingCodes[0]});
    }
  }

  /**
   * Validator for the update form where search for any changes in the fields
   * in comparison with the user info
   */
  validateChanges: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let firstname = control.get('firstname');
    let lastname = control.get('lastname');
    let email = control.get('email');
    let country = control.get('country');
    let code = control.get('code');
    let phone = control.get('phone');

    return ((firstname && lastname && email && country && code && phone
      && (this.user?.name.firstname != firstname.value || this.user?.name.lastname != lastname.value
        || this.user?.contact.email != email.value || this.user?.country != country.value
        || this.user?.contact.phone.code != code.value || this.user?.contact.phone.number != phone.value))
        ? null : { thereAreChanges: true });
  }

  /**
   * Function for validate that the password and re password are the same
   *
   * @param control
   * @returns
   */
  comparePasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let rePass = control.get('rePassword');

    return password && rePass && password.value === rePass.value ? null : { areTheSame: true }
  }

  /**
   * Method for send the form data to update the user info
   */
  onUpdate() {
    this.updateErrors = [];
    this.userT.name.firstname = this.update.get('firstname')?.value;
    this.userT.name.lastname = this.update.get('lastname')?.value;
    this.userT.contact.email = this.update.get('email')?.value;
    this.userT.country = this.update.get('country')?.value;
    this.userT.contact.phone.code = this.update.get('code')?.value;
    this.userT.contact.phone.number = this.update.get('phone')?.value;

    this.userService.updateUser(this.userT, this.tokenT).subscribe((response: any) => {
      this.refresh.emit();
    }, (error) => {
      if (error.error.code && error.error.code == 11000) {
        let key = Object.keys(error.error.keyValue)[0]
        let duplicate = key.includes('.') ? key.split('.')[1] : key;
        if (!this.updateErrors.includes(`errors.exist-${duplicate}`)) {
          this.updateErrors.push(`errors.exist-${duplicate}`);
        }
      } else if (error.error.errors) {
        for (let err of Object.keys(error.error.errors)) {
          let required = err.split('.')[1];
          if (!this.updateErrors.includes(`errors.${required ? required : err}-required`)) {
            this.updateErrors.push(`errors.${required ? required : err}-required`);
          }
        }
      }
    });
  }

  /**
   * Method for send the form data to update the user password
   */
  onChange() {
    this.changeErrors = [];
    this.userService.changePassword(this.userT._id, this.changePass.value, this.tokenT).subscribe((response: any) => {
      this.changePass.reset();
    }, (error) => {
      if (error.error.code && error.error.code == 11000) {
        let key = Object.keys(error.error.keyValue)[0]
        let duplicate = key.includes('.') ? key.split('.')[1] : key;
        if (!this.changeErrors.includes(`errors.exist-${duplicate}`)) {
          this.changeErrors.push(`errors.exist-${duplicate}`);
        }
      } else if (error.error.errors) {
        for (let err of Object.keys(error.error.errors)) {
          let required = err.split('.')[1];
          if (!this.changeErrors.includes(`errors.${required ? required : err}-required`)) {
            this.changeErrors.push(`errors.${required ? required : err}-required`);
          }
        }
      } else if (error.error.name) {
        if (!this.changeErrors.includes(`errors.${error.error.name}`)) {
          this.changeErrors.push(`errors.${error.error.name}`);
        }
      }
    });
  }

}
