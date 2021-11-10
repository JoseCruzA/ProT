import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Country } from 'src/app/models/country.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() countries!: Country[];
  @Input() user!: User;
  @Input() token!: string;
  @Output() refresh = new EventEmitter<void>();
  userT!: User;
  userSelected!: User;
  users!: User[];
  countriesT!: Country[];
  tokenT!: string;
  flag!: string;
  selectedLanguage!: string;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  canCreate: boolean = false;
  createOrUpdate: boolean = false;
  create: boolean = false;
  delete: boolean = false;
  options: DataTables.Settings = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    this.selectedLanguage = lang.split("-")[0];

    if (this.selectedLanguage == 'es') {
      this.options = {
        pagingType: 'full_numbers',
        language: {
          url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        }
      }
    } else {
      this.options = {
        pagingType: 'full_numbers'
      }
    }

    this.getAllUsers();
  }

  ngOnChanges(changes: any) {
    // Get the changesof each variable for can store it out of the subscribe
    if (changes.token?.currentValue != undefined) {
      this.tokenT = changes.token.currentValue;
    }

    if (changes.user?.currentValue != undefined) {
      this.userT = changes.user.currentValue;

      this.userT.roles.forEach(role => {
        if (role.name == 'admin') {
          this.canUpdate = true;
          this.canDelete = true;
          this.canCreate = true;
        } else if (role.name == 'moderator') {
          this.canUpdate = true;
        }
      });

      if (!this.canUpdate || !this.canDelete || !this.canCreate) {
        this.userT.functions.forEach(func => {
          if (func.name == 'updateUser') {
            this.canUpdate = true;
          } else if (func.name == 'deleteUser') {
            this.canDelete = true;
          } else if (func.name == 'createUser') {
            this.canCreate = true;
          }
        });
      }
    }

    if (changes.countries?.currentValue != undefined && this.userT != undefined) {
      this.countriesT = changes.countries.currentValue;
    }
  }

  /**
   * Method for get al system users
   */
  getAllUsers() {
    this.userService.getAll(this.tokenT).subscribe((response: any) => {
      this.users = response;
    });
  }

  /**
   * Method for select a user to delete o edit
   *
   * @param {User} user the user selected
   * @param {string} type the type of the selection
   */
  selectUser(user: User, type: string) {
    this.userSelected = user;
    if (type == 'edit') {
      this.createOrUpdate = true;
    } else if (type == 'delete') {
      this.delete = true;
    }
  }

  /**
   * Method for delete a existent user
   *
   * @param {String} user the user id
   */
  deleteUser(user: String) {
    this.userService.deleteUser(this.tokenT, user).subscribe((response: any) => {
      this.ngOnInit();
    });
    this.delete = false;
  }

  /**
   * Close the create or update modal
   */
  close(value: boolean) {
    if (this.createOrUpdate) {
      this.createOrUpdate = false;
      this.create = false;
    } else if (this.delete) {
      this.delete = false;
    }
    this.ngOnInit();
  }

  /**
   * Refresh the users view
   */
  refreshUsers(value: boolean) {
    this.close(value);
    this.ngOnInit();
  }
}
