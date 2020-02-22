import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  gender:string;
  dob:string;
  placeOfBirth:string;
  heightInCms:number;
  weightInKgs:number;
  complexion:string = "COMPLEXION_SELECTED";
  maritalStatus:string = "MARITAL_STATUS_SELECTED";
  familyType:string = "FAMILY_TYPE_SELECTED";

  constructor() { }

  ngOnInit() {
  }

  saveAndNext(){
    let obj= {
        "gender":this.gender,
        "dob":this.dob["year"]+"-"+this.dob["month"]+"-"+this.dob["day"],
        "placeOfBirth":this.placeOfBirth,
        "heightInCms":this.heightInCms,
        "weightInKgs":this.weightInKgs,
        "complexion":this.complexion,
        "maritalStatus":this.maritalStatus,
        "familyType":this.familyType
    }

    this.changeTabEvent.emit();
  }

}
