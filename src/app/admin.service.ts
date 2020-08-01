import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = environment.serverUrl + "api/admin/"


  constructor(private httpClient: HttpClient) { }

  addCredits(data)
  {
    let url = this.baseUrl + 'addCredits'
    return this.post(url, data);
  }

  getAllUser4Admin(data)
  {
    let url = this.baseUrl + 'getAllUsers?page=0&size=5'

    return this.post(url,data);
  }

  get(url) {
    return this.httpClient.get(url);
  }

  post(url, data) {
    return this.httpClient.post(url, data);
  }

}
