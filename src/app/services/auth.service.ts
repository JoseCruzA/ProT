import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HashMap } from '../interfaces/HashMap.interface';
import { User } from '../models/user.model';

const uri = environment.API_PATH;

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
    return this.http.post<HashMap>(`${uri}auth/login`, user, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  validateLogin(): HashMap {
    let data: HashMap = this.http.post<HashMap>(`${uri}auth/refresh_token`, "", {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });

    let user = this.http.get<User>(`${uri}users/getUser`, {
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": JSON.stringify(data)
      })
    });

    data["user"] = user;

    return data;
  }
}
