import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  gender:string;
  dob:any;
  placeOfBirth:string;
  heightInCms:number;
  weightInKgs:number;
  complexion:string = "COMPLEXION_SELECTED";
  maritalStatus:string = "MARITAL_STATUS_SELECTED";
  familyType:string = "FAMILY_TYPE_SELECTED";

  alertMessage:string;
  staticAlertClosed = false;
  alertType:string="danger";

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    this.profileService.getPersonalDetails().subscribe(result=>{
      this.spinner.hide()
      this.gender=result["gender"]
      let d = new Date(result["dob"]);
      this.dob={"year":d.getFullYear(),"month":d.getMonth()+1,"day":d.getDate()}
      this.placeOfBirth=result["placeOfBirth"]
      this.heightInCms=result["heightInCms"]
      this.weightInKgs=result["weightInKgs"]
      this.complexion=result["complexion"]
      this.maritalStatus=result["maritalStatus"]
      this.familyType=result["familyType"]

      
    },error=>{

      this.spinner.hide()
        
      this.showAlert("danger","Error:"+error.error);
    })
  }

  showAlert(type, message){
        this.alertMessage=message;
        this.alertType = "danger"
        setTimeout(() => this.staticAlertClosed = true, 4000);
  }

  saveAndNext(){

    let date = new Date(this.dob["year"]+"-"+this.dob["month"]+"-"+this.dob["day"]).toISOString().split('T')[0]

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
