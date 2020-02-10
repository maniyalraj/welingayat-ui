import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  url: string;

  constructor(private httpClient: HttpClient) { 
    this.url = environment.serverUrl + "api/auth/signup";
  }

  signup(userData){
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
