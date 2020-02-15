import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from "../../environments/environment"
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;
  private isLoggedIn = new BehaviorSubject<Boolean>(false);
  loggedInState$ = this.isLoggedIn.asObservable();

  constructor(private httpClient: HttpClient) {
    this.url = environment.serverUrl + "api/auth/signin";
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

  changeLoginState(status:Boolean)
  {
    this.isLoggedIn.next(status);
  }

}
