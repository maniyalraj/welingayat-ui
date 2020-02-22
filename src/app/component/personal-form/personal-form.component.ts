import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

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

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getPersonalDetails().subscribe(result=>{
      this.gender=result["gender"]
      this.dob=result["dob"]
      this.placeOfBirth=result["placeOfBirth"]
      this.heightInCms=result["heightInCms"]
      this.weightInKgs=result["weightInKgs"]
      this.complexion=result["complexion"]
      this.maritalStatus=result["maritalStatus"]
      this.familyType=result["familyType"]
    },error=>{
        alert(error.error);
    })
  }

  saveAndNext(){

    let date = new Date(this.dob["year"]+"-"+(this.dob["month"]-1)+"-"+this.dob["day"]).toISOString().split('T')[0]

    let obj= {
        "gender":this.gender,
        "dob":date,
        "placeOfBirth":this.placeOfBirth,
        "heightInCms":this.heightInCms,
        "weightInKgs":this.weightInKgs,
        "complexion":this.complexion,
        "maritalStatus":this.maritalStatus,
        "familyType":this.familyType
    }

    this.profileService.savePersonalDetails(obj).subscribe(result=>{
      alert(result["message"])
      this.changeTabEvent.emit();
      
    },error=>{
      alert("Some error: "+error.error);
    })

    
  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }

}
