import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapServiceService } from './map-service.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserSharedPrivateData, UserPrivateData, User } from '../types/user';
import { LoginService } from './login.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  baseUrl = environment.serverUrl + "api/"

  currentUser: any;

  blankProfile: any = 'assets/images/blank-profile-picture.png';


  constructor(
    private httpClient: HttpClient,
    private mapService: MapServiceService,
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    private router: Router) { }

  async getUser(uid) {
    const currentUser = this.getCurrentUser();
    let userSharedPrivateData = {};
    let userRef = this.db.collection("users").doc(uid);

    currentUser.unlockedUsers = currentUser.unlockedUsers || [];

    if(currentUser.unlockedUsers.includes(uid)){
      let userSharedPrivateRef = this.db.collection("usersPrivate").doc(uid);
      userSharedPrivateData = await (await userSharedPrivateRef.ref.get()).data();
    }
    const userData = await (await userRef.ref.get()).data();
    userData.profileImageUrl = userData.profileImageUrl || userData.photoURL || this.blankProfile;
    userData.age = this.calculateAge(userData.dob);
    const final = {...userData, ...userSharedPrivateData}

    return final;
  }

  getCurrentUser() {

    let _user = localStorage.getItem("currentUser");

    if(!_user)
    {
      this.auth.auth.signOut();
      this.router.navigate(['/login']);
    }
    const user = JSON.parse(_user);
    return user;
  }

  setCurrentUser(user) {
    this.currentUser = user;

    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  updateUserSharedPrivateData(userSharedPrivatedata: UserSharedPrivateData) {
    const user = this.getCurrentUser();

    const userSharedPrivateRef = this.db.doc(`usersSharedPrivate/${user.uid}`);

    userSharedPrivatedata.uid = user.uid;

    this.setCurrentUser({ ...user, ...userSharedPrivatedata });

    return userSharedPrivateRef.set(userSharedPrivatedata, { merge: true })
  }

  updateUserPrivateData(userPrivateData: UserPrivateData) {
    const user = this.getCurrentUser();
    const userPrivateRef = this.db.doc(`usersPrivate/${user.uid}`);

    userPrivateData.uid = user.uid;
    this.setCurrentUser({ ...user, ...userPrivateData });
    return userPrivateRef.set(userPrivateData, { merge: true })

  }

  addToFav(uid) {
    const user = this.getCurrentUser();
    const userPrivateRef = this.db.doc(`usersPrivate/${user.uid}`);

    let favouriteUsers = user.favouriteUsers || [];

    favouriteUsers.push(uid);

    user.favouriteUsers = favouriteUsers;

    this.setCurrentUser(user);

    return userPrivateRef.set({ favouriteUsers: favouriteUsers }, { merge: true });

  }

  removeFromFav(uid) {
    const user = this.getCurrentUser();
    const userPrivateRef = this.db.doc(`usersPrivate/${user.uid}`);

    let favouriteUsers = user.favouriteUsers || [];

    const index = favouriteUsers.indexOf(uid);

    favouriteUsers.splice(index, 1);

    user.favouriteUsers = favouriteUsers;

    this.setCurrentUser(user);

    return userPrivateRef.set({ favouriteUsers: favouriteUsers }, { merge: true });
  }

  unlockUser(uid) {

    const user = this.getCurrentUser();
    const userPrivateRef = this.db.doc(`usersPrivate/${user.uid}`);

    let unlockedUsers = user.unlockedUsers || [];
    let credits = user.credits || 0;

    if(credits > 0)
    {
      if(!unlockedUsers.includes(uid))
      {unlockedUsers.push(uid);}
    }

    user.unlockedUsers = unlockedUsers;
    this.setCurrentUser(user);

    return userPrivateRef.set({ unlockedUsers: unlockedUsers }, { merge: true });

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
