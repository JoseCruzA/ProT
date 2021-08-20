import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HashMap } from '../interfaces/HashMap.interface';
import { Role } from '../models/role.model';
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
 * Service for manage the users for the app
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class UserService {

  constructor(private http: HttpClient) { }

  /**
   * Get all registered users
   *
   * @param {string} token access token
   * @returns
   */
  getAll(token: string): Observable<User[]> {
    return this.http.get<User[]>(`${uri}users`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * Function for get basic user data with his username
   *
   * @param {string} username the username to the user to get
   * @returns
   */
  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${uri}users/getUser/${username}`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  /**
   * Function for send the user to the db
   *
   * @param {HashMap} user the user data
   * @returns
   */
  saveUser(user: any): Observable<HashMap>{
    if (!(user instanceof User)) {
      user = this.createUser(user);
    }
    return this.http.post<HashMap>(`${uri}users/newUser`, user, httpOtions);
  }

  /**
   * function for update the user info to the db
   *
   * @param {User} user the user to update
   * @param {string} token
   * @returns
   */
  updateUser(user: User, token: string): Observable<User> {
    return this.http.put<User>(`${uri}users/updateMe`, user, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * function for update any user
   *
   * @param {User} user the user to update
   * @param {string} token the access token
   * @param {boolean} addFunc value that indicates if the user tried to add a new function to the user for update
   * @param {boolean} delFunc value that indicates if the user tried to remove a function to the user for update
   * @param {boolean} addRol value that indicates if the user tried to add a new role to the user for update
   * @param {boolean} delRol value that indicates if the user tried to remove a role to the user for update
   * @returns
   */
  updateAnyUser(user: User, token: string, addFunc: boolean, delFunc: boolean, addRol: boolean, delRol: boolean) {
    return this.http.put<User>(`${uri}users/updateUser/${addFunc}/${delFunc}/${addRol}/${delRol}`, user, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * function for create a new user
   *
   * @param {User} user the user to update
   * @param {string} token the access token
   * @param {boolean} addFunc value that indicates if the user tried to add a new function to the user for create
   * @param {boolean} delFunc value that indicates if the user tried to remove a function to the user for create
   * @param {boolean} addRol value that indicates if the user tried to add a new role to the user for create
   * @param {boolean} delRol value that indicates if the user tried to remove a role to the user for create
   * @returns
   */
  newUser(user: User, token: string, addFunc: boolean, delFunc: boolean, addRol: boolean, delRol: boolean) {
    return this.http.post<User>(`${uri}users/newUser/${addFunc}/${delFunc}/${addRol}/${delRol}`, user, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * Function for delete a user
   *
   * @param {string} token the access token
   * @param {string} userId the user id to delete
   */
  deleteUser(token: string, userId: String) {
    return this.http.delete(`${uri}users/deleteUser/${userId}`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    })
  }

  /**
   * Function for get all user roles
   *
   * @param {string} token the access token
   * @return {Role[]} all available user roles
   */
  getRoles(token: string): Observable<Role[]> {
    return this.http.get<Role[]>(`${uri}roles`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    })
  }

  /**
   * function for update the user password
   *
   * @param {String} user the user id
   * @param {*} data the change info
   * @param {string} token the access token
   * @returns
   */
  changePassword(user: String, data: any, token: string): Observable<HashMap> {
    return this.http.put<HashMap>(`${uri}users/changeMyPass/` + user, data, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
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
}
