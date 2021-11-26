import { Component, EventEmitter, HostListener, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { HashMap } from 'src/app/interfaces/HashMap.interface';
import { Country } from 'src/app/models/country.model';
import { Role } from 'src/app/models/role.model';
import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-or-update',
  templateUrl: './create-or-update.component.html',
  styleUrls: ['./create-or-update.component.css']
})

export class CreateOrUpdateComponent implements OnInit, OnChanges, OnDestroy {

  @Input() countries!: Country[];
  @Input() user!: User;
  @Input() userSelected!: User;
  @Input() token!: string;
  @Input() create!: boolean;
  @Input() selectedLanguage!: string;
  @Output() refresh = new EventEmitter<boolean>();
  @Output() close = new EventEmitter<boolean>();
  countriesT!: Country[];
  roles!: Role[];
  flag!: string;
  userForm!: FormGroup;
  userSelectedT!: User;
  isUpdate: boolean = false;
  availableRoles: HashMap[] = [];
  actualRoles: HashMap[] = [];
  availableFunctions: HashMap[] = [];
  actualFunctions: HashMap[] = [];
  canAddRoles: boolean = false;
  canDeleteRoles: boolean = false;
  canAddFunction: boolean = false;
  canDeleteFunction: boolean = false;
  functionAdded: boolean = false;
  functionDeleted: boolean = false;
  RoleAdded: boolean = false;
  RoleDeleted: boolean = false;
  allRoles: any;
  updateUser: any;
  newUser: any;
  uploadImage: any;
  errors: string[] = [];
  notification_title!: string;
  notification_message!: string;

  constructor(private userService: UserService, private uploadService: UploadService, private formGroup: FormBuilder,
    private translateService: TranslateService, private notification: NotificationsService) {
    this.userForm = this.formGroup.group({
      image: new FormControl(),
      imageSrc: new FormControl(),
      firstname: new FormControl("", [
        Validators.required
      ]),
      lastname: "",
      username: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[\S]+([\S]+[\S]+)*$/),
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
        Validators.pattern(/((?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[$&+,:;=?@#|'<>.^*()%!-]+)).{8,}/),
        Validators.minLength(8)
      ]),
      rePassword: new FormControl("", [
        Validators.required,
        Validators.pattern(/((?=.*[0-9]+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[$&+,:;=?@#|'<>.^*()%!-]+)).{8,}/),
        Validators.minLength(8)
      ]),
      roles: new FormControl([]),
      functions: new FormControl([])
    }, { validators: this.comparePasswords });
  }

  ngOnInit(): void {
    this.allRoles = this.userService.getRoles(this.token).subscribe((roles: Role[]) => {
      this.roles = roles;

      roles.forEach(role => {
        let value = {
          _id: role._id,
          value: role.name
        }
        this.availableRoles.push(value);

        role.functions.forEach(func => {
          if ((this.availableFunctions.filter(avFunc => avFunc._id == func._id)).length == 0) {
            let value = {
              _id: func._id,
              value: func.name
            }
            this.availableFunctions.push(value);
          }
        });
      });
    });
  }

  ngOnChanges(changes: any) {
    // Get the changesof each variable for can store it out of the subscribe
    if (changes.userSelected?.currentValue != undefined) {
      this.userSelectedT = changes.userSelected.currentValue;

      this.userForm.setControl('password', new FormControl("", [Validators.minLength(8)]));
      this.userForm.setControl('rePassword', new FormControl("", [Validators.minLength(8)]));
      this.userForm.updateValueAndValidity();

      this.userForm.patchValue({
        image: this.userSelectedT.image,
        firstname: this.userSelectedT.name.firstname,
        lastname: this.userSelectedT.name.lastname,
        username: this.userSelectedT.username,
        email: this.userSelectedT.contact.email,
        code: this.userSelectedT.contact.phone.code,
        phone: this.userSelectedT.contact.phone.number
      });
      this.isUpdate = true;

      this.userSelectedT.roles.forEach(role => {
        if (role.name != 'user') {
          let value = {
            _id: role._id,
            value: role.name
          }
          this.actualRoles.push(value);
          let tempRoles = this.userForm.get('roles')?.value;
          tempRoles = tempRoles ? tempRoles : [];
          tempRoles.push(value);
          this.userForm.patchValue({
            'roles': tempRoles
          });
        }

        if ((this.availableRoles.filter(avRole => avRole._id == role._id)).length > 0) {
          this.availableRoles = this.availableRoles.filter(avRole => avRole._id != role._id);
        }

        role.functions.forEach(func => {
          this.availableFunctions = this.availableFunctions.filter(avFunc => avFunc._id != func._id);
        });
      });

      this.userSelectedT.functions.forEach(func => {
        let value = {
          _id: func._id,
          value: func.name
        }
        this.actualFunctions.push(value);
        let tempFunctions = this.userForm.get('functions')?.value;
        tempFunctions = tempFunctions ? tempFunctions : [];
        tempFunctions.push(value);
        this.userForm.patchValue({
          'functions': tempFunctions
        });

        if ((this.availableFunctions.filter(avFunc => avFunc._id == func._id)).length > 0) {
          this.availableFunctions = this.availableFunctions.filter(avFunc => avFunc._id != func._id);
        }
      });


      if (this.countriesT != undefined) {
        let country = this.countriesT.filter((country: Country) => country.callingCodes[0] == this.userSelectedT.contact.phone.code)[0];
        let countryName = country.translations[this.selectedLanguage] ? country.translations[this.selectedLanguage] : country.name;
        this.userForm.patchValue({
          country: countryName
        });
        this.flag = country.flag;
      }
    }

    if (changes.user?.currentValue != undefined) {
      this.user.roles.forEach(role => {
        role.functions.forEach(func => {
          if (func.name == 'addRoles') {
            this.canAddRoles = true;
          } else if (func.name == 'deleteRoles') {
            this.canDeleteRoles = true;
          } else if (func.name == 'addFunction') {
            this.canAddFunction = true;
          } else if (func.name == 'deleteFunction') {
            this.canDeleteFunction = true;
          }
        });
      });

      this.user.functions.forEach(func => {
        if (func.name == 'addRoles' && !this.canAddRoles) {
          this.canAddRoles = true;
        } else if (func.name == 'deleteRoles' && !this.canDeleteRoles) {
          this.canDeleteRoles = true;
        } else if (func.name == 'addFunction' && !this.canAddFunction) {
          this.canAddFunction = true;
        } else if (func.name == 'deleteFunction' && !this.canDeleteFunction) {
          this.canDeleteFunction = true;
        }
      });
    }

    if (changes.countries?.currentValue != undefined) {
      this.countriesT = changes.countries.currentValue;
    }
  }

  /**
   * Method that get the form controls
   *
   * @return {*} the controls of the form
   */
  get f(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  /**
   * Method for send the boolean for close the register modal
   */
  closeModal() {
    this.isUpdate = false;
    this.ngOnDestroy();
  }

  /**
   * On change select country function
   *
   * @param event
   */
  onSelectCountry() {
    let country = this.countries.filter(country => {
      return (country.translations[this.selectedLanguage] === this.userForm.value.country || country.name === this.userForm.value.country);
    })[0];

    this.flag = country.flag;
    this.userForm.patchValue({code: country.callingCodes[0]});
  }

  /**
   * Method for change and upload the image selected
   *
   * @param {*} event
   */
  previewImage(event: any) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.onload = function(e) {
        var image: HTMLImageElement = <HTMLImageElement>document.getElementById('img-tmp');
        image.src = String(reader.result);
      }

      reader.readAsDataURL(file);
    }

    this.userForm.patchValue({
      imageSrc: file
    });
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
   * Method that add a new role to the user
   */
  addRole(roleToAdd: any) {
    this.RoleAdded = true;
    let tempRoles = this.userForm.get('roles')?.value;
    tempRoles = tempRoles ? tempRoles : [];
    if (tempRoles.filter((role: any) => role._id == roleToAdd._id).length == 0) {
      tempRoles.push(roleToAdd);
      this.availableRoles = this.availableRoles.filter(role => role._id != roleToAdd._id);
      this.actualRoles.push(roleToAdd);

      let tempFunctions = (this.roles.filter(role => role._id == roleToAdd._id)[0]).functions;

      tempFunctions.forEach(func => {
        if (this.availableFunctions.filter(availableFunc => func._id == availableFunc._id).length > 0) {
          this.availableFunctions = this.availableFunctions.filter(availableFunc => func._id != availableFunc._id);
        } else if (this.actualFunctions.filter(actualFunc => func._id == actualFunc._id).length > 0) {
          this.actualFunctions = this.actualFunctions.filter(actualFunc => func._id != actualFunc._id);
        }
      });
    }

    this.userForm.patchValue({
      'roles': tempRoles
    });
  }

  /**
   * Method that delete a role to the user
   */
  deleteRole(roleToDelete: any) {
    this.RoleDeleted = true;

    let tempRoles = this.userForm.get('roles')?.value;
    tempRoles = tempRoles ? tempRoles : [];
    if (tempRoles.filter((role: any) => role._id == roleToDelete._id).length > 0) {
      tempRoles = tempRoles.filter((role: any) => role._id != roleToDelete._id);
      this.actualRoles = this.actualRoles.filter(role => role._id != roleToDelete._id);
      this.availableRoles.push(roleToDelete);

      let tempFunctions = (this.roles.filter(role => role._id == roleToDelete._id)[0]).functions;

      tempFunctions.forEach(func => {
        if (this.availableFunctions.filter(availableFunc => func._id == availableFunc._id).length == 0) {
          let value = {
            _id: func._id,
            value: func.name
          }
          this.availableFunctions.push(value);
        }
      });
    }

    this.userForm.patchValue({
      'roles': tempRoles
    });
  }


  /**
   * Method that add a new function to the user
   */
  addFunction(funcToAdd: any) {
    this.functionAdded = true;

    let tempFunctions = this.userForm.get('functions')?.value;
    tempFunctions = tempFunctions ? tempFunctions : [];
    if (tempFunctions.filter((func: any) => func._id == funcToAdd._id).length == 0) {
      tempFunctions.push(funcToAdd);
      this.availableFunctions = this.availableFunctions.filter(func => func._id != funcToAdd._id);
      this.actualFunctions.push(funcToAdd);
    }

    this.userForm.patchValue({
      'functions': tempFunctions
    });
  }

  /**
   * Method that delete a function to the user
   *
   * @param {any} funcToDelete the function to delete
   */
  deleteFunction (funcToDelete: any) {
    this.functionDeleted = true;

    let tempFunctions = this.userForm.get('functions')?.value;
    tempFunctions = tempFunctions ? tempFunctions : [];
    if (tempFunctions.filter((func: any) => func._id == funcToDelete._id).length > 0) {
      tempFunctions = tempFunctions.filter((func: any) => func._id != funcToDelete._id);
      this.actualFunctions = this.actualFunctions.filter(func => func._id != funcToDelete._id);
      this.availableFunctions.push(funcToDelete);
    }

    this.userForm.patchValue({
      'functions': tempFunctions
    });
  }

   /**
   * Method for send the form data to register the user
   */
  onSubmit() {
    if (this.userSelectedT == undefined) {
      this.userSelectedT = new User();
    }
    this.userSelectedT.username = this.userForm.get('username')?.value;
    this.userSelectedT.name.firstname = this.userForm.get('firstname')?.value;
    this.userSelectedT.name.lastname = this.userForm.get('lastname')?.value;
    this.userSelectedT.country = this.userForm.get('country')?.value;
    this.userSelectedT.contact.phone.code = this.userForm.get('code')?.value;
    this.userSelectedT.contact.phone.number = this.userForm.get('phone')?.value;
    this.userSelectedT.contact.email = this.userForm.get('email')?.value;
    this.userSelectedT.password = this.userForm.get('password')?.value;
    this.userSelectedT.roles = this.userForm.get('roles')?.value;
    this.userSelectedT.functions = this.userForm.get('functions')?.value;

    if (this.userForm.get('imageSrc')?.value) {
      this.putUserWithImage();
    } else {
      this.putUser(this.userSelectedT);
    }
  }

  /**
   * Method for create or update a user that have a profile image
   */
  putUserWithImage() {
    this.uploadImage = this.uploadService.uploadUserImage(this.userForm.get('imageSrc')?.value, this.token).subscribe((response: any) => {
      this.userSelectedT.image = response;
      this.putUser(this.userSelectedT);
    });
  }

  /**
   * Method for create or update a user
   *
   * @param {User} user the user to create or update
   */
  putUser(user: User) {
    this.errors = [];
    if (!this.create) {
      this.updateUser = this.userService.updateAnyUser(user, this.token, this.functionAdded, this.functionDeleted, this.RoleAdded, this.RoleDeleted).subscribe((response: any) => {
        this.userForm.reset();
        this.flag = "";
        this.ngOnDestroy();

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
        if (error.error.code && error.error.code == 11000) {
          let key = Object.keys(error.error.keyValue)[0]
          let duplicate = key.includes('.') ? key.split('.')[1] : key;
          if (!this.errors.includes(`errors.exist-${duplicate}`)) {
            this.errors.push(`errors.exist-${duplicate}`);
          }
        } else if (error.error.errors) {
          for (let err of Object.keys(error.error.errors)) {
            let required = err.split('.')[1];
            if (!this.errors.includes(`errors.${required ? required : err}-required`)) {
              this.errors.push(`errors.${required ? required : err}-required`);
            }
          }
        }
      });
    } else {
      this.newUser = this.userService.newUser(user, this.token, this.functionAdded, this.functionDeleted, this.RoleAdded, this.RoleDeleted).subscribe((response: any) => {
        this.userForm.reset();
        this.flag = "";
        this.ngOnDestroy();

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
        if (error.error.code && error.error.code == 11000) {
          let key = Object.keys(error.error.keyValue)[0]
          let duplicate = key.includes('.') ? key.split('.')[1] : key;
          if (!this.errors.includes(`errors.exist-${duplicate}`)) {
            this.errors.push(`errors.exist-${duplicate}`);
          }
        } else if (error.error.errors) {
          for (let err of Object.keys(error.error.errors)) {
            let required = err.split('.')[1];
            if (!this.errors.includes(`errors.${required ? required : err}-required`)) {
              this.errors.push(`errors.${required ? required : err}-required`);
            }
          }
        }
      });
    }
  }

  refreshAll() {
    this.flag = "";
    this.isUpdate = false;
    this.availableRoles = [];
    this.actualRoles = [];
    this.availableFunctions = [];
    this.actualFunctions = [];
    this.functionAdded = false;
    this.functionDeleted = false;
    this.RoleAdded = false;
    this.RoleDeleted = false;
  }

  ngOnDestroy() {
    //this.refreshAll();
    if (this.allRoles) {
      this.allRoles.unsubscribe();
    }
    if (this.uploadImage) {
      this.uploadImage.unsubscribe();
    }
    if (this.updateUser) {
      this.updateUser.unsubscribe();
    }
    if (this.newUser) {
      this.newUser.unsubscribe();
    }
    this.refresh.emit(true);
  }

}
