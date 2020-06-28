import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = environment.serverUrl + "api/"

  constructor(private httpClient: HttpClient) { }

  getUser(id)
  {
    let url = this.baseUrl+"getUser/"+id

    return this.get(url)
  }

  getEmptyUserObj()
  {
    return this.emptyUser;
  }

  get(url) {
    return this.httpClient.get(url);
  }

  post(url, data) {
    return this.httpClient.post(url, data);
  }

  emptyUser = {
    "id":1,
    "firstName":"",
    "lastName":"",
    "middleName":"",
    "username":"",
    "email":"",
    "contact":"",
    "userAdditionalDetails":{
       "currentPinCode":0,
       "permanentPinCode":0,
       "currentAddressLine1":"",
       "currentAddressLine2":"",
       "currentCity":"",
       "permanentAddressLine1":"",
       "permanentAddressLine2":"",
       "permanentCity":"",
       "additionalDetails1":"",
       "additionalDetails2":""
    },
    "userEducationalDetails":{
       "qualification":"",
       "institute":"",
       "other_qualification":""
    },
    "userFamilyDetails":[
    ],
    "userImages":{
       "imageUrl":"../../assets/images/blank-profile-picture.png",
       "imageType":"Profile"
    },
    "userMedicalDetails":{
      "bloodGroup":"A+"
    },
    "userPersonalDetails":{
       "dob":"",
       "placeOfBirth":"",
       "gender":"",
       "heightInCms":0,
       "weightInKgs":0,
       "complexion":"",
       "maritalStatus":"",
       "familyType":""
    },
    "userProfessionalDetails":{
       "jobType":"",
       "jobRole":"",
       "monthlyIncome":0,
       "jobLocation":"",
       "jobIndustry":""
    }
 }
}
