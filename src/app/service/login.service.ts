import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from "../../environments/environment"
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserServiceService } from './user-service.service';
import { User, UserPrivateData, UserSharedPrivateData } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedInState$ = this.isLoggedIn.asObservable();


  constructor(
    private httpClient: HttpClient,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserServiceService,
    private router: Router) {
    this.url = environment.serverUrl + "api/auth/signin";

    // Get the auth state, then fetch the Firestore user document or return null
    this.auth.authState.subscribe(async (user) => {
      if (user) {

        const prevUser = this.userService.getCurrentUser();

        const _currentUser = await this.getCurrentUser(user.uid);

        this.changeLoginState(true);

        this.router.navigate(['/profile']);

      }
      else {
        this.changeLoginState(false);
      }
    })

  }

  async getCurrentUser(uid) {

    let userRef = this.afs.collection("users").doc(uid);
    let userSharedPrivateRef = this.afs.collection("usersSharedPrivate").doc(uid);
    let userPrivateRef = this.afs.collection("usersPrivate").doc(uid);

    const currentUser = await (await userRef.ref.get()).data();
    const currentUserSharedPrivate = await (await userSharedPrivateRef.ref.get()).data();
    const currentUserPrivate = await (await userPrivateRef.ref.get()).data();

    const finalData = { ...currentUser, ...currentUserPrivate, ...currentUserSharedPrivate };

    this.userService.setCurrentUser(finalData);
    const _currentUser = this.userService.getCurrentUser();

    this.changeLoginState(true);

    return _currentUser;

  }

  async signUpWithEmail(userData) {

    let credentials = await this.auth.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    await this.updateUserDataForFirstLogin(credentials.user);

  }

  login(userData) {
    let url = this.url
    return this.post(url, userData)
  }

  logout() {
    localStorage.clear();
    this.userService.setCurrentUser({});
    this.auth.auth.signOut();
  }

  async loginWithGoogle() {

    const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.auth.signInWithPopup(provider);
    await this.updateUserDataForFirstLogin(credential.user);
    // this.changeLoginState(true);
    // this.router.navigate(['/profile']);
    return true;
  }

  async loginWithEmail(userData) {

    const credential = await this.auth.auth.signInWithEmailAndPassword(userData.usernameOrEmail, userData.password);
    return true;

  }


  async updateUserDataForFirstLogin(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);
    const userSharedPrivateRef: AngularFirestoreDocument<UserSharedPrivateData> = this.afs.doc(`usersSharedPrivate/${user.uid}`);
    const userPrivateRef: AngularFirestoreDocument<UserPrivateData> = this.afs.doc(`usersPrivate/${user.uid}`);

    let data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    let sharedPrivateBaseData = {
      uid: user.uid
    }

    const privateBaseData = {
      uid: user.uid,
    }

    this.userService.setCurrentUser(data);

    await userSharedPrivateRef.set(sharedPrivateBaseData, { merge: true });
    await userPrivateRef.set(privateBaseData, { merge: true });
    await userRef.set(data, { merge: true });

    return true;
  }

  updateUserData(user, userData = null) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    let data:any = {
      uid: user.uid
    }

    data = { ...data, ...userData };

    delete data.contact;
    delete data.credits;
    delete data.unlockedUsers;
    delete data.libraryImages;
    delete data.favouriteUsers;

    this.userService.setCurrentUser(data);

    return userRef.set(data, { merge: true });

  }

  get(url) {
    return this.httpClient.get(url);
  }

  post(url, data) {
    return this.httpClient.post(url, data);
  }

  changeLoginState(status: boolean) {
    this.isLoggedIn.next(status);
  }

}

