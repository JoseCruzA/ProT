import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'body-parser';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

const api = "https://restcountries.eu/"

@Injectable({
  providedIn: 'root'
})

/**
 * Class for stablish communication with a countries api
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class CountryService {

  constructor(private http: HttpClient) { }

  /**
   * Get the countries info
   *
   * @returns the countries
   */
  getData(): Observable<Country[]> {
    return this.http.get<Country[]>(`${api}rest/v2/all?fields=callingCodes;translations;name;flag`);
  }
}
