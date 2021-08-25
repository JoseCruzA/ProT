import { Component, OnInit } from '@angular/core';
import { RecurringEvent } from 'src/app/interfaces/recurring-event';
import { Event } from 'src/app/models/event.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import RRule from 'rrule';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  selectedLanguage = "en";
  refresh: boolean = false;
  canCreate: boolean = false;
  canUpdate: boolean = false;
  canDelete: boolean = false;
  token!: string;
  user!: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    let lang = window.navigator.language || navigator.language;
    lang = lang.split("-")[0];

    if (lang != this.selectedLanguage) {
      this.selectedLanguage = lang;
    }

    this.authService.validateLogin().subscribe((response: any) => {
      this.token = response;
      this.authService.getLoggedUser(this.token).subscribe((user: User) => {
        this.user = user;

        this.user.roles.forEach(role => {
          if (role.name == 'admin') {
            this.canCreate = true;
            this.canUpdate = true;
            this.canDelete = true;
          } else if (role.name == 'moderator') {
            this.canUpdate = true;
          }
        });

        if (!this.canCreate || !this.canUpdate || !this.canDelete) {
          this.user.functions.forEach(func => {
            if (func.name == 'createEvent') {
              this.canCreate = true;
            } else if (func.name == 'updateEvent') {
              this.canUpdate = true;
            } else if (func.name == 'deleteEvent') {
              this.canDelete = true;
            }
          });
        }
      });
    });
  }

  refreshEvent() {
    this.ngOnInit();
  }
}
