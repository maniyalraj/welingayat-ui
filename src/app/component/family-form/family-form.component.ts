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

  title: string = "TITLE_SELECTED";
  firstName: string;
  middleName: string;
  lastName: string;
  relation: string = "RELATION_SELECTED";
  profession: string = "JOB_TYPE_SELECTED";
  additionalDescription: string;
  isMarried;

  user: User;
  focus;
  focus1;

  relationMap = {
    "RELATION_FATHER": "Father",
    "RELATION_MOTHER": "Mother",
    "RELATION_SIBLING": "Sibling",
    "RELATION_MATERNAL": "Maternal",
    "RELATION_PATERNAL": "Paternal"
  }

  inverseRelationMap = {
    "Father": "RELATION_FATHER",
    "Mother": "RELATION_MOTHER",
    "Sibling": "RELATION_SIBLING",
    "Maternal": "RELATION_MATERNAL",
    "Paternal": "RELATION_PATERNAL"

  }

  professionMap = {
    "JOB_TYPE_SALARIED": "Salaried",
    "JOB_TYPE_BUSINESS": "Business",
    "JOB_TYPE_PROFESSIONAL": "Professional",
    "JOB_TYPE_RETIRED": "Retired",

  }

  inverseProfessionMap = {
    "Salaried": "JOB_TYPE_SALARIED",
    "Business": "JOB_TYPE_BUSINESS",
    "Professional": "JOB_TYPE_PROFESSIONAL",
    "Retired": "JOB_TYPE_RETIRED"
  }

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
    let obj:Family = {
      "title": this.title,
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "relation": this.relation,
      "profession": this.profession,
      "additionalDescription": this.additionalDescription
    }

    this.spinner.show('saving');

    if(!this.user.familyDetails)
    {
      this.user.familyDetails = [];
    }
    this.user.familyDetails.push(obj);

    this.loginService.updateUserData(this.user, this.user);

    this.resetDefaults();

    this.spinner.hide('saving');



  }

  resetDefaults() {
    this.title = "TITLE_SELECTED",
      this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.relation = "RELATION_SELECTED"
    this.profession = "JOB_TYPE_SELECTED";
    this.additionalDescription = null;

  }

  removeRelation(rel) {
    const index: number = this.user.familyDetails.indexOf(rel);

    if(index !== -1)
    {
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
