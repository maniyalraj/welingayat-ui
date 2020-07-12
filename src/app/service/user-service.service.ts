import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapServiceService } from './map-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = environment.serverUrl + "api/"

  constructor(private httpClient: HttpClient, private mapService: MapServiceService) { }

  getUser(id) {
    let url = this.baseUrl + "getUser/" + id

    return this.get(url)
  }

  getCurrentUser() {
    let url = this.baseUrl + "user/me";

    return this.get(url)
  }

  addToFav(id) {
    let url = this.baseUrl + "user/save/favourite";

    return this.post(url, id);
  }

  removeFromFav(id) {
    let url = this.baseUrl + "user/remove/favourite";

    return this.post(url, id);
  }

  transformUser(user) {

    let favList: any[] = JSON.parse(localStorage.getItem("favList"));

    if (user == undefined) {
      return this.emptyUser;
    }

    if (favList.includes(user.id)) {
      user["isFavourite"] = true;
    }

    if (user.userAdditionalDetails == undefined) {
      user.userAdditionalDetails = this.emptyUser.userAdditionalDetails;
    }

    if (user.userEducationalDetails == undefined) {
      user.userEducationalDetails = this.emptyUser.userEducationalDetails;
    }
    else {
      if (user.userEducationalDetails.qualification == "QUALIFICATION_OTHER") {
        user.userEducationalDetails.qualification = user.userEducationalDetails.other_qualification
      }


      if (user.userEducationalDetails.qualification) {
        user.userEducationalDetails.qualification = user.userEducationalDetails.qualification.replace("QUALIFICATION_", "")
      }
    }

    if (user.userFamilyDetails == undefined) {
      user.userFamilyDetails = this.emptyUser.userFamilyDetails;
    }

    if (user.userImages == undefined || user.userImages.imageUrl == undefined) {
      user.userImages = this.emptyUser.userImages;
    }

    if (user.userMedicalDetails == undefined) {
      user.userMedicalDetails = this.emptyUser.userMedicalDetails;
    }

    if (user.userPersonalDetails == undefined) {
      user.userPersonalDetails = this.emptyUser.userPersonalDetails;
    } else {
      if (user.userPersonalDetails.dob != undefined) {
        user.age = this.calculateAge(user.userPersonalDetails.dob)
      }
      if (user.userPersonalDetails.maritalStatus != undefined) {
        user.userPersonalDetails.maritalStatus = user.userPersonalDetails.maritalStatus.replace("MARITAL_STATUS_", "")
      }
      user.userPersonalDetails.complexion = user.userPersonalDetails.complexion.replace("COMPLEXION_", "")
      user.userPersonalDetails.familyType = user.userPersonalDetails.familyType.replace("FAMILY_TYPE_", "")
    }

    if (user.userProfessionalDetails == undefined) {
      user.userProfessionalDetails = this.emptyUser.userProfessionalDetails;
    } else {
      user.userProfessionalDetails.jobType = user.userProfessionalDetails.jobType.replace("JOB_TYPE_", "")

    }

    return user;
  }

  calculateAge(date) {
    if (date == undefined) {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  get(url) {
    return this.httpClient.get(url);
  }

  post(url, data) {
    return this.httpClient.post(url, data);
  }

  emptyUser = {
    "id": 1,
    "firstName": "",
    "lastName": "",
    "middleName": "",
    "username": "",
    "email": "",
    "contact": "",
    "userAdditionalDetails": {
      "currentPinCode": 0,
      "permanentPinCode": 0,
      "currentAddressLine1": "",
      "currentAddressLine2": "",
      "currentCity": "",
      "permanentAddressLine1": "",
      "permanentAddressLine2": "",
      "permanentCity": "",
      "additionalDetails1": "",
      "additionalDetails2": ""
    },
    "userEducationalDetails": {
      "qualification": "",
      "institute": "",
      "other_qualification": ""
    },
    "userFamilyDetails": [
    ],
    "userImages": {
      "imageUrl": "../../assets/images/blank-profile-picture.png",
      "imageType": "Profile"
    },
    "userMedicalDetails": {
      "bloodGroup": "A+"
    },
    "userPersonalDetails": {
      "dob": "",
      "placeOfBirth": "",
      "gender": "",
      "heightInCms": 0,
      "weightInKgs": 0,
      "complexion": "",
      "maritalStatus": "",
      "familyType": ""
    },
    "userProfessionalDetails": {
      "jobType": "",
      "jobRole": "",
      "monthlyIncome": 0,
      "jobLocation": "",
      "jobIndustry": ""
    }
  }
}
