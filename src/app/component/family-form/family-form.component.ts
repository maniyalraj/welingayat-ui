import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.css']
})
export class FamilyFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  relations=[];
  
  title:string="TITLE_SELECTED";
  firstName:string;
  middleName:string;
  lastName:string;
  relation:string;
  profession:string;
  additionalDesc:string;

  constructor() { }

  ngOnInit() {

    this.relations.push({
      "title":"Mr.",
      "firstName":"Chandrakant",
      "middleName":"Sannveerbhadrappa",
      "lastName":"Maniyal",
      "relation":"Father",
      "profession":"Business",
      "additionalDesc":"Owns a land in Belgaum"
    })

    this.resetDefaults();

  }

  addRelation(){
    this.relations.push({
      "title":this.title,
      "firstName":this.firstName,
      "middleName":this.middleName,
      "lastName":this.lastName,
      "relation":this.relation,
      "profession":this.profession,
      "additionalDesc":this.additionalDesc
    })

    this.resetDefaults();

  }

  resetDefaults(){
    this.title="TITLE_SELECTED",
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.relation = "RELATION_SELECTED"
    this.profession = null;
    this.additionalDesc = null;

  }

  saveAndNext(){
    this.changeTabEvent.emit();
  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }

}
