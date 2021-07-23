import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HashMap } from '../interfaces/HashMap.interface';
import { User } from '../models/user.model';

const uri = environment.API_PATH;

@Injectable({
  providedIn: 'root'
})

/**
 * Service for manage the users for the app
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Function for send the user to the db
   *
   * @param user the user data
   * @returns
   */
  saveUser(user: any): Observable<HashMap>{
    user = this.createUser(user);
    return this.http.post<HashMap>(`${uri}users/newUser`, user, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Function that creates a user object
   *
   * @param user the user data
   * @returns
   */
  createUser(user: any): JSON {
    let newUser = new User();

    newUser.username = user.username;
    newUser.name['firstname'] = user.firstname;
    newUser.name['lastname'] = user.lastname ? user.lastname : "";
    newUser.contact["phone"]["code"] = user.code;
    newUser.contact["phone"]["number"] = user.phone ? user.phone : "";
    newUser.contact["email"] = user.email;
    newUser.country = user.country;
    newUser.password = user.password;

    let finalUser = JSON.parse(JSON.stringify(newUser));
    delete finalUser['_id'];

    return finalUser;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error ocurred: ", error.error);
    } else {
      console.error(`Server returned ${error.status} with message: `, error.error);
    }

    return throwError("something went wrong, try again.");
  }
}
