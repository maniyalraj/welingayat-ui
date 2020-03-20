import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show('loading');

    this.profileService.getFamilyDetails().subscribe((result: any) => {
      this.spinner.hide('loading');

      for (let r of result) {
        r.relation = this.relationMap[r.relation]
        r.profession = this.professionMap[r.profession]
        this.relations.push(r)
      }
    }, error => {
      this.spinner.hide('loading')
      console.log(error)
    })


    this.resetDefaults();

  }

  addRelation() {
    let obj = {
      "title": this.title,
      "firstName": this.firstName,
      "middleName": this.middleName,
      "lastName": this.lastName,
      "relation": this.relation,
      "profession": this.profession,
      "additionalDescription": this.additionalDescription
    }

    this.spinner.show('saving');
    this.profileService.saveFamilyDetails(obj).subscribe(result => {
      this.spinner.hide('saving');
      this.relations.push(obj);
      this.resetDefaults();
    }, error => {
      this.spinner.hide('saving');

      console.log(error)
    })


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
    const index: number = this.relations.indexOf(rel);

    if (index !== -1) {
      rel.relation = this.inverseRelationMap[rel.relation]
      rel.profession = this.inverseProfessionMap[rel.profession]
      this.profileService.deleteFamilyDetails(rel).subscribe(result => {
        this.relations.splice(index, 1);
      }, error => {
        console.log(error)
      })
    }
  }

  saveAndNext() {

    this.changeTabEvent.emit();
  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }

}
