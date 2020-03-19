import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.serverUrl + "api/user/"
  baseImageUrl = environment.serverUrl + "api/"
  constructor(private httpClient: HttpClient) { }

  getUserBasicDetails() {
    let url = this.baseUrl + "me"

    return this.get(url)
  }

  saveBasicDetails(data) {
    let url = this.baseUrl + "save/basicDetails"

    return this.post(url, data)
  }

  getPersonalDetails() {
    let url = this.baseUrl + "get/personalDetails"

    return this.get(url);
  }

  savePersonalDetails(data) {
    let url = this.baseUrl + "save/personalDetails"

    return this.post(url, data)
  }

  getEducationalDetails() {
    let url = this.baseUrl + "get/educationalDetails"

    return this.get(url)
  }

  saveEducationalDetails(data) {
    let url = this.baseUrl + "save/educationalDetails"

    return this.post(url, data)
  }

  getProfessionalDetails() {
    let url = this.baseUrl + "get/professionalDetails"

    return this.get(url);

  }

  saveProfessionalDetails(data) {
    let url = this.baseUrl + "save/professionalDetails"

    return this.post(url, data);
  }

  getFamilyDetails() {

    let url = this.baseUrl + "get/userFamilyDetails"

    return this.get(url)

  }

  saveFamilyDetails(data) {

    let url = this.baseUrl + "save/userFamilyDetails"

    return this.post(url, data);
  }

  deleteFamilyDetails(data) {
    let url = this.baseUrl + "delete/userFamilyDetails"

    return this.post(url, data);
  }


  getMedicalDetails() {
    let url = this.baseUrl + "get/medicalDetails"


    return this.get(url);
  }

  saveMedicalDetails(data) {
    let url = this.baseUrl + "save/medicalDetails"

    return this.post(url, data);
  }

  getAdditionalDetails() {
    let url = this.baseUrl + "get/additionalDetails"


    return this.get(url);

  }

  saveAdditionalDetails(data) {
    let url = this.baseUrl + "save/additionalDetails"

    return this.post(url, data);
  }

  getUserProfileUrl() {
    let url = this.baseImageUrl + "get/profileImage"

    return this.get(url);
  }

  saveUserProfileImage(data) {
    let url = this.baseImageUrl + "save/profileImage"

    return this.post(url, data);
  }

  getAllUsers(data) {
    let url = this.baseImageUrl + "getAllUsers"

    return this.post(url, data);
  }

  get(url) {
    return this.httpClient.get(url);
  }

  post(url, data) {
    return this.httpClient.post(url, data);
  }


}
