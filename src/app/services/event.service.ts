import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event.model';

const uri = environment.API_PATH;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  /**
   * Function that creat a new event
   *
   * @param {string} token the access token
   * @param {Event} event the event to create
   * @returns
   */
   newEvent(token: string, event: Event) {
    return this.http.post(`${uri}events/newEvent`, event, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    })
  }

  /**
   * Function for delete an event
   *
   * @param {string} token the access token
   * @param {String} event the event id to delete
   * @returns
   */
  deleteEvent(token: string, event: String) {
    return this.http.delete(`${uri}events/delete/${event}`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * Method that update an event
   *
   * @param {string} token the access token
   * @param {Event} event the event to update
   * @returns
   */
  updateEvent(token: string, event: Event) {
    return this.http.put(`${uri}events/updateEvent`, event, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   *  Function for get all events
   */
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${uri}events/`, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }
}
