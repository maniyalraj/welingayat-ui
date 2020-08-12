import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import { User } from 'firebase';
import { UserServiceService } from './user-service.service';
import { LibraryImages, UserSharedPrivateData } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private userService: UserServiceService) { }

  async uploadLibraryImage(image) {

    const user = this.userService.getCurrentUser();

    // The storage path
    const path = `userImages/${user.uid}/${Date.now()}_${user.firstName}`;

    // Reference to storage bucket
    const ref = this.storage.ref(path);

    let libraryImages = user.libraryImages || [];

    const userSharedPrivateRef: AngularFirestoreDocument<UserSharedPrivateData> = this.db.doc(`usersSharedPrivate/${user.uid}`);
    const userRef = this.db.doc(`users/${user.uid}`);
    // The main task
    this.task = this.storage.upload(path, image, {cacheControl: 'public,max-age=31536000'});

    await this.task.then(async () => {
      this.downloadURL = await ref.getDownloadURL().toPromise();
      libraryImages.push({ imageUrl: this.downloadURL });
      user.libraryImages = libraryImages;
      this.userService.setCurrentUser(user);
      userRef.set({countOfImages: libraryImages.length}, {merge: true});
      userSharedPrivateRef.set({ libraryImages: libraryImages }, { merge: true });
    })

    return this.downloadURL;

  }

  async uploadProfileImage(image) {
    const user = this.userService.getCurrentUser();
    const path = `userImages/${user.uid}/${user.firstName}_profile`;
    const ref = this.storage.ref(path);

    const userRef = this.db.doc(`users/${user.uid}`);

    this.task = this.storage.upload(path, image, {cacheControl: 'public,max-age=31536000'});

    await this.task.then(async () => {
      this.downloadURL = await ref.getDownloadURL().toPromise();
      userRef.set({ profileImageUrl: this.downloadURL }, { merge: true })

    })

    return this.downloadURL;

  }

  async getLibraryImages() {
    const user = this.userService.getCurrentUser();

    const userRef: AngularFirestoreDocument<UserSharedPrivateData> = this.db.doc(`usersSharedPrivate/${user.uid}`);

    let userImages = await (await userRef.ref.get()).data();

    return userImages.libraryImages || [];

  }

  async deleteLibraryImage(_image: LibraryImages) {
    const user = this.userService.getCurrentUser();
    const storageRef = this.storage.storage.refFromURL(_image.imageUrl);

    const userRef: AngularFirestoreDocument<UserSharedPrivateData> =
      this.db.doc(`usersSharedPrivate/${user.uid}`);


    let userSharedData = await (await userRef.ref.get()).data();

    userSharedData.libraryImages = userSharedData.libraryImages.filter(image => image.imageUrl !== _image.imageUrl)

    user.libraryImages = userSharedData.libraryImages;
    this.userService.setCurrentUser(user);

    await userRef.set(userSharedData, { merge: true });

    let imageDeleted = await storageRef.delete();

    return imageDeleted;
  }
}
