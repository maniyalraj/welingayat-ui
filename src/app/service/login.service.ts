import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;

  constructor(private httpClient: HttpClient) { 
    this.url = environment.serverUrl + "/api/auth/signup";
  }
  

  register(userData){
    let url = this.url
    return this.post(url, userData)
  }

  login(userData){
    let url = this.url
    return this.post(url, userData)
  }

  get(url){
    return this.httpClient.get(url);
  }

  post(url, data){
    return this.httpClient.post(url, data);
  }

}
