import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = "api/user/"
  constructor(private httpClient: HttpClient) { }

  getUserBasicDetails(){
    let url= environment.serverUrl + this.baseUrl+ "me"

   return this.get(url)
  }

  get(url){
    return this.httpClient.get(url);
  }

  post(url, data){
    return this.httpClient.post(url, data);
  }

}
