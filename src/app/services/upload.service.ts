import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const uri = environment.API_PATH;

@Injectable({
  providedIn: 'root'
})

/**
 * Service for upload images to server
 *
 * @author Jose Cruz
 * @version 1.0
 */
export class UploadService {

  constructor(private http: HttpClient) { }

  /**
   * Function that send an image to the server
   *
   * @param {File} image the image file
   * @param {string} token the access token
   * @returns
   */
  uploadUserImage(image: File, token: string) {
    const formData = new FormData();
    formData.append("profile", image, image.name);

    return this.http.post(`${uri}users/image`, formData, {
      withCredentials: true,
      headers: new HttpHeaders({
        "x-access-token": token
      })
    });
  }
}
