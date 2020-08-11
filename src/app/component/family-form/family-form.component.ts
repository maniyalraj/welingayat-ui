import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';
import { User, Family } from 'src/app/types/user';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.css']
})
export class FamilyFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  relations = [];

  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  relation: string;
  profession: string;
  additionalDescription: string;
  isMarried;

  user: User;
  focus;
  focus1;

  constructor(
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.spinner.show('loading');
    this.user = this.userService.getCurrentUser();
    this.spinner.hide('loading');

    this.resetDefaults();

  }

  addRelation() {

    let obj: Family = {
      "title": this.title,
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "relation": this.relation,
      "profession": this.profession,
      "additionalDescription": this.additionalDescription
    }

    if (this.isMarried) {
      obj["isMarried"] = this.isMarried
    }

    this.spinner.show('saving');

    if (!this.user.familyDetails) {
      this.user.familyDetails = [];
    }
    this.user.familyDetails.push(obj);

    this.loginService.updateUserData(this.user, this.user);

    this.resetDefaults();

    this.spinner.hide('saving');



  }

  resetDefaults() {
    this.title = undefined;
    this.firstName = undefined;
    this.middleName = undefined;
    this.lastName = undefined;
    this.relation = undefined;
    this.profession = undefined;
    this.additionalDescription = undefined;

  }

  removeRelation(rel) {
    const index: number = this.user.familyDetails.indexOf(rel);

    if (index !== -1) {
      this.user.familyDetails.splice(index, 1);
    }

    this.loginService.updateUserData(this.user, this.user);
  }

  saveAndNext() {

    this.changeTabEvent.emit();
  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }

}
