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
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string;
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  loggedInState$ = this.isLoggedIn.asObservable();

  user$:Observable<User>;

  constructor(
    private httpClient: HttpClient,
    public auth: AngularFireAuth,
    private afs: AngularFirestore,
    private userService: UserServiceService,
    private router: Router) {
    this.url = environment.serverUrl + "api/auth/signin";

    // Get the auth state, then fetch the Firestore user document or return null
      this.auth.authState.subscribe(async (user)=>{
        if(user){
          let userRef = this.afs.collection("users").doc(user.uid);
          let userSharedPrivateRef = this.afs.collection("usersPrivate").doc(user.uid);
          let userPrivateRef = this.afs.collection("usersSharedPrivate").doc(user.uid);

          const currentUser = await (await userRef.ref.get()).data();
          const currentUserSharedPrivate = await (await userSharedPrivateRef.ref.get()).data();
          const currentUserPrivate = await (await userPrivateRef.ref.get()).data();

          const finalData = {...currentUser, ...currentUserPrivate, ...currentUserSharedPrivate};

          this.userService.setCurrentUser(finalData);

          this.changeLoginState(true);
          this.router.navigate(['/profile']);
        }
        else{
          this.changeLoginState(false);
        }
      })

  }

  async signUpWithEmail(userData){

    let credentials = await this.auth.auth.createUserWithEmailAndPassword(userData.email, userData.password);
    this.updateUserData(credentials.user, userData)

  }

  login(userData) {
    let url = this.url
    return this.post(url, userData)
  }

  logout()
  {
    this.auth.auth.signOut();
  }

  async loginWithGoogle(){

    const provider = new auth.GoogleAuthProvider();
    const credential = await this.auth.auth.signInWithPopup(provider);
    this.updateUserData(credential.user);

    return true;
  }

  async loginWithEmail(userData){

    const credential = await this.auth.auth.signInWithEmailAndPassword(userData.usernameOrEmail, userData.password);
    return true;

  }

  updateUserData(user, userData = null) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    let data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    }

    data = {...data, ...userData};

    this.userService.setCurrentUser(data);

    return userRef.set(data, { merge: true })

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

