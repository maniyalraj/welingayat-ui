import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  gender: string;
  dob: any;
  placeOfBirth: string;
  heightInCms: number;
  weightInKgs: number;
  complexion: string = "COMPLEXION_SELECTED";
  maritalStatus: string = "MARITAL_STATUS_SELECTED";
  familyType: string = "FAMILY_TYPE_SELECTED";

  alertMessage: string;
  staticAlertClosed = true;
  alertType: string = "danger";

  focus;
  focus1;

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show('loading');

    this.profileService.getPersonalDetails().subscribe(result => {
      this.spinner.hide('loading')
      this.gender = result["gender"]
      let d = new Date(result["dob"]);
      this.dob = d;
      this.placeOfBirth = result["placeOfBirth"]
      this.heightInCms = result["heightInCms"]
      this.weightInKgs = result["weightInKgs"]
      this.complexion = result["complexion"]
      this.maritalStatus = result["maritalStatus"]
      this.familyType = result["familyType"]


    }, error => {

      this.spinner.hide('loading')

      this.showAlert("danger", "Error:" + error.error);
    })
  }

  showAlert(type, message) {
    this.alertMessage = message;
    this.alertType = type
    setTimeout(() => this.staticAlertClosed = true, 4000);
  }

  saveAndNext() {

    let date = new Date(this.dob).toISOString().split('T')[0]

    let obj = {
      "gender": this.gender,
      "dob": date,
      "placeOfBirth": this.placeOfBirth,
      "heightInCms": this.heightInCms,
      "weightInKgs": this.weightInKgs,
      "complexion": this.complexion,
      "maritalStatus": this.maritalStatus,
      "familyType": this.familyType
    }
    this.spinner.show('saving')
    this.profileService.savePersonalDetails(obj).subscribe(result => {
      this.spinner.hide('saving');
      // alert(result["message"])
      this.changeTabEvent.emit();

    }, error => {
      this.spinner.hide('saving');

      alert("Some error: " + error.error);
    })


  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }

}
