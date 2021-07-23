import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  token : string = "";
  user!: User;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.validateLogin().subscribe((response: any) => {
      this.token = response.token;
      this.user = response.user;
      console.log(response);
    });
  }

}
