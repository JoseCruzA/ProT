import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HashMap } from '../interfaces/HashMap.interface';
import { User } from '../models/user.model';

const uri = environment.API_PATH;
const httpOtions = {
  withCredentials: true,
  headers: new HttpHeaders({
    "content-type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})

/**
 * Class with the logic for manage the authentication
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class AuthService {

  constructor(private http: HttpClient) { }

  /**
   * Function for send user data for login
   *
   * @param user the user data
   * @returns
   */
  login(user: any): Observable<HashMap> {
    return this.http.post<HashMap>(`${uri}auth/login`, user, httpOtions);
  }

  /**
   * Function that validate if the user are logged
   *
   * @returns { HashMap } the user token and info
   */
  validateLogin(): Observable<HashMap> {
    return this.http.post<HashMap>(`${uri}auth/refresh_token`, "", httpOtions);
  }

  /**
   * Funtion that get the logged user info
   *
   * @param {string} token the acces token for the user
   * @returns {User} The logged user info
   */
  getLoggedUser(token: string): Observable<User> {
    return this.http.get<User>(`${uri}/auth/user`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "x-access-token": token,
        "content-type": "application/json"
      })
    });
  }

  /**
   * Method for generate a logout
   *
   * @param {string} token the access token for the user
   * @returns
   */
  getLogout(token: string) {
    return this.http.get(`${uri}auth/logout`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "x-access-token": token,
        "content-type": "application/json"
      })
    });
  }
}
