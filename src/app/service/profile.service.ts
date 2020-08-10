import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment"
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { User } from '../types/user';
import { UserServiceService } from './user-service.service';
import { Filters } from '../types/filters';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.serverUrl + "api/user/"
  baseImageUrl = environment.serverUrl + "api/"

  afterKey = {};
  filters: Filters = null;

  constructor(
    private httpClient: HttpClient,
    private db: AngularFirestore,
    private userService: UserServiceService) { }

  setFilters(filters) {
    this.afterKey = null;
    this.filters = filters;
  }

  getFilters() {
    return this.filters;
  }

  async getFirstUsers(filters, page, afterKey) {


    const userRef = this.getQueryFromFilters();

    let users = []

    if (!afterKey) {
      await userRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          users.push(doc.data());
        })
        this.refreshAfterKey(querySnapshot);
      })
    } else {
      await userRef.startAfter(afterKey).get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          users.push(doc.data());
        })
        this.refreshAfterKey(querySnapshot);

      })
    }

    if (false && users && users.length > 0) {
      this.afterKey = JSON.parse(JSON.stringify(users[users.length - 1]));
    }

    return users;

  }

  private refreshAfterKey(querySnapshot) {
    if (querySnapshot.docs.length > 0) {
      this.afterKey = querySnapshot.docs[querySnapshot.docs.length - 1];
    }
  }

  async loadMoreUsers() {
    return await this.getFirstUsers(null, null, this.afterKey);
  }

  private getQueryFromFilters() {

    const currentUser: User = this.userService.getCurrentUser();
    let query: Query = this.db.collection('users').ref;

    // if(currentUser.gender == "GENDER_MALE")
    // {
    //   query = query.where("gender","==","GENDER_FEMALE");
    // }

    query = query.limit(3);

    if (this.filters == null) {

      return query;
    }

    if (this.filters.firstName != "") {
      const variations = this.getStringVariations(this.filters.firstName)
      query = query.where("firstName", "in", variations);
    }

    if (this.filters.lastName != "") {
      const variations = this.getStringVariations(this.filters.lastName)
      query = query.where("lastName", "in", variations);
    }

    if (this.filters.minHeightInCms != 0 || this.filters.maxHeightInCms != 0) {
      query = query.where("heightInCms", ">=", this.filters.minHeightInCms);
      query = query.where("heightInCms", "<=", this.filters.maxHeightInCms);
    }

    if (this.filters.minDob != 0 || this.filters.maxDob != 0) {
      query = query.where("dob", ">=", this.filters.minDob);
      query = query.where("dob", "<=", this.filters.maxDob);
    }

    if (this.filters.monthlyIncome != 0)
    {
      query = query.where("monthlyIncome",">=",this.filters.monthlyIncome);
    }

    if(this.filters.qualification)
    {
      query = query.where("qualification","in",this.filters.qualification);
    }

    if(this.filters.jobType)
    {
      query = query.where("jobType","in",this.filters.jobType);
    }
      // query = query.limit(3);

      return query;

  }

  getStringVariations(string: String) {
    let variations = [];

    variations.push(string.toLowerCase())
    variations.push(string.toUpperCase())
    let sentenceCase = string.replace(string.charAt(0), string.charAt(0).toUpperCase())
    variations.push(sentenceCase)

    return variations;

  }


}
