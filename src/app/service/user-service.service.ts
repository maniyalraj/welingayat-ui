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

  getCurrentUser()
  {
    let url = this.baseUrl+"user/me";

    return this.get(url)
  }

  addToFav(id)
  {
    let url = this.baseUrl+"user/save/favourite";

    return this.post(url, id);
  }

  removeFromFav(id)
  {
    let url = this.baseUrl+"user/remove/favourite";

    return this.post(url, id);
  }

  getEmptyUserObj(user)
  {

    if(user == null)
    {
      return this.emptyUser;
    }

    if(user.userAdditionalDetails == null)
    {
      user.userAdditionalDetails = this.emptyUser.userAdditionalDetails;
    }

    if(user.userEducationalDetails == null)
    {
      user.userEducationalDetails = this.emptyUser.userEducationalDetails;
    }

    if(user.userFamilyDetails == null)
    {
      user.userFamilyDetails = this.emptyUser.userFamilyDetails;
    }

    if(user.userImages == null)
    {
      user.userImages = this.emptyUser.userImages;
    }

    if(user.userMedicalDetails == null)
    {
      user.userMedicalDetails = this.emptyUser.userMedicalDetails;
    }

    if(user.userPersonalDetails == null)
    {
      user.userPersonalDetails = this.emptyUser.userPersonalDetails;
    }

    if(user.userProfessionalDetails == null)
    {
      user.userProfessionalDetails = this.emptyUser.userProfessionalDetails;
    }

    return user;
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
