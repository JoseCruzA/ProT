import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CountryService } from 'src/app/services/country.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

/**
 * Class whit the logic for manage the user view
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class UserComponent implements OnInit {

  token!: string;
  user!: User;
  selected: string = 'profile';
  selectToView: string = '';
  countries!: Country[];
  flag!: string;
  ableChange: boolean = false;
  marketingAble: boolean = false;
  hasGeneralAccess: boolean = false;
  showAllUsers: boolean = false;

  constructor(private authService: AuthService, private countryService: CountryService, private uploadService: UploadService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.validateLogin().subscribe((token: any) => {
      this.token = token;
      this.authService.getLoggedUser(token).subscribe((user: User) => {
        this.user = user;

        this.user.functions.forEach(func => {
          if (func.name == "active") {
            this.hasGeneralAccess = true;
          }
        });

        if (!this.hasGeneralAccess) {
          this.user.roles.forEach(role => {
            if (role.name == 'admin' || role.name == 'moderator') {
              this.hasGeneralAccess = true;
              this.showAllUsers = true;
              return;
            }
          });
        }

        this.countryService.getData().subscribe((countries: any) => {
          this.countries = countries;
        });
      });
    });
  }

  /**
   * Method for change and upload the image selected
   *
   * @param {*} event
   */
  changeImage(event: any) {
    let file = event.target.files[0];
    this.uploadService.uploadUserImage(file, this.token).subscribe((response: any) => {
      this.user.image = response;
      this.userService.updateUser(this.user, this.token).subscribe((response: any) => {
        this.refresh();
      });
    });
  }

  /**
   * Method that receives the url to the user flag and set it in this component
   *
   * @param {string} value the value for the flag
   */
  setFlag(value: string) {
    this.flag = value;
  }

   /**
   * Method for refresh data
   */
  refresh() {
    this.ngOnInit();
  }
}
