import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.serverUrl+ "api/user/"
  constructor(private httpClient: HttpClient) { }

  getUserBasicDetails(){
    let url= this.baseUrl+ "me"

   return this.get(url)
  }

  saveBasicDetails(){
    let url= this.baseUrl+ "save/basicDetails"
  }

  savePersonalDetails(data)
  {
    let url= this.baseUrl+"save/personalDetails"

    return this.post(url, data)
  }

  get(url){
    return this.httpClient.get(url);
  }

  post(url, data){
    return this.httpClient.post(url, data);
  }

}
