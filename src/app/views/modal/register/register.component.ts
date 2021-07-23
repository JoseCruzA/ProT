import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country.model';
import { CountryService } from 'src/app/services/country.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

/**
 * Class with the logic for manage the register view
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class RegisterComponent implements OnInit {

  @Output() toRegister = new EventEmitter<boolean>();
  @Output() toLogin = new EventEmitter<boolean>();
  countries!: Country[];
  flag: string = "";
  selectedLanguage!: string;
  register!: FormGroup;
  token!: string;

  constructor(private countryService: CountryService, private formGroup: FormBuilder, private userService: UserService, private router: Router) {
    this.register = this.formGroup.group({
      firstname: new FormControl("", [
        Validators.required
      ]),
      lastname: "",
      username: new FormControl("", [
        Validators.required,
        Validators.minLength(4)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ]),
      code: new FormControl(null),
      phone: new FormControl(null),
      country: new FormControl("", [
        Validators.required
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      rePassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8)
      ]),
      terms: new FormControl(false, [
        Validators.requiredTrue
      ])
    }, { validators: this.comparePasswords });
  }

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    this.selectedLanguage = lang.split("-")[0];

    this.getCountriesData();
  }

  /**
   * Method for send the boolean for close the register modal
   */
  closeModal() {
    this.register.reset();
    this.flag = "";
    this.toRegister.emit(false);
  }

  /**
   * Method for lose the register modal and open de login modal
   */
  closeAndLogin() {
    this.register.reset();
    this.flag = "";
    this.toLogin.emit(true);
  }

  /**
   * Method that get all the countries
   */
  getCountriesData() {
    this.countryService.getData().subscribe(countries => {
      this.countries = countries;
    });
  }

  /**
   * On change select country function
   *
   * @param event
   */
  onSelectCountry() {
    let country = this.countries.filter(country => {
      return (country.translations[this.selectedLanguage] === this.register.value.country || country.name === this.register.value.country);
    })[0];

    this.flag = country.flag;
    this.register.patchValue({code: country.callingCodes[0]});
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
   * Method for send the form data to register the user
   */
  onSubmit() {
    this.userService.saveUser(this.register.value).subscribe((response) => {
      this.token = response.token;
      this.register.reset();
      this.flag = "";
      this.router.navigate(["/office"]);
    }, (error) => {
      console.log(error);
    });
  }

}
