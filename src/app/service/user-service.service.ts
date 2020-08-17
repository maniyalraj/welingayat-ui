import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MapServiceService } from './map-service.service';
import { AngularFirestore,Query } from '@angular/fire/firestore';
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
      let userSharedPrivateRef = this.db.collection("usersSharedPrivate").doc(uid);
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

  async getSelectedUsers(users)
  {
    const currentUser: User = this.getCurrentUser();
    let query: Query = this.db.collection('users').ref;
    let usersList = []
    query = query.where("uid","in",users)

    await query.get().then(querySnapshot => {
      querySnapshot.forEach((_user:any) => {
        let user = _user.data();
        user.profileImageUrl = user.profileImageUrl || user.photoURL || this.blankProfile;
        usersList.push(user);
        user.isFavourite  = true;
      })
    })

  return usersList;

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
      credits = credits - 100;
      user.credits = credits;
    }

    user.unlockedUsers = unlockedUsers;
    this.setCurrentUser(user);

    return userPrivateRef.set({ unlockedUsers: unlockedUsers }, { merge: true });

  }


  calculateAge(date) {
    if (date == undefined) {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  async getCountOfTotalUsers()
  {
    const publicDataRef = this.db.doc('publicData/1');

    const publicData = await (await publicDataRef.ref.get()).data()

    return publicData.count;
  }

}
