import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Campaign } from '../models/campaign.model';

const uri = environment.API_PATH;

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  constructor(private http: HttpClient) { }

  /**
   * Function that creat a new campaign
   *
   * @param {string} token the access token
   * @param {Campaign} campaign the campaign to create
   * @returns
   */
  newCampaign(token: string, campaign: Campaign) {
    return this.http.post(`${uri}traffic/campaign`, campaign, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    })
  }

  /**
   * Function for delete a campaign
   *
   * @param {string} token the access token
   * @param {String} campaign the campaign id to delete
   * @returns
   */
  deleteCampaign(token: string, campaign: String) {
    return this.http.delete(`${uri}traffic/deleteCampaign/${campaign}`, {
      withCredentials: true,
      headers: new HttpHeaders({
        "content-type": "application/json",
        "x-access-token": token
      })
    });
  }

  /**
   * Method that send info about the campaign for save a registry of this
   *
   * @param {string} url the link that was clicked
   * @param {string} campaign the campaign in the link
   * @param {string} username the username of the own of the link
   * @returns
   */
  putTrafficCampaign(url: string, campaign: string, username: string) {
    return this.http.put(`${uri}traffic/trafficCampaign`, {url: url, campaign: campaign, username: username}, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }

  /**
   * Method that send info about the refer link for save a registry of this
   *
   * @param {string} url the link that was clicked
   * @param {string} username the username of the own of the link
   * @returns
   */
  putTraffic(url: string, username: string) {
    return this.http.put(`${uri}traffic/onlyTraffic`, {url: url, username: username}, {
      headers: new HttpHeaders({
        "content-type": "application/json"
      })
    });
  }
}
