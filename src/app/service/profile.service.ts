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

  saveBasicDetails(data){
    let url= this.baseUrl+ "save/basicDetails"

    return this.post(url, data)
  }

  getPersonalDetails(){
    let url= this.baseUrl+"get/personalDetails"

    return this.get(url);
  }

  savePersonalDetails(data)
  {
    let url= this.baseUrl+"save/personalDetails"

    return this.post(url, data)
  }

  getEducationalDetails(){
    let url= this.baseUrl+"get/educationalDetails"

    return this.get(url)
  }

  saveEducationalDetails(data){
    let url= this.baseUrl+"save/educationalDetails"

    return this.post(url, data)
  }

  getProfessionalDetails(){
    let url= this.baseUrl+"get/professionalDetails"

    return this.get(url);

  }

  saveProfessionalDetails(data){
    let url= this.baseUrl+"save/professionalDetails"

    return this.post(url,data);
  }

  get(url){
    return this.httpClient.get(url);
  }

  post(url, data){
    return this.httpClient.post(url, data);
  }

}
