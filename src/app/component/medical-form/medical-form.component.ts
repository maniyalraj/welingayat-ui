import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumServiceService } from 'src/app/service/enum-service.service';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css']
})
export class MedicalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  bloodGroup: string = "BLOOD_GROUP_SELECTED";
  bloodGroupOptions: any = []
  isDisabled: boolean = false;
  typeOfDisability: string;
  focus;
  focus1;

  constructor(private profileService: ProfileService, private enumService: EnumServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show('loading');

    this.profileService.getMedicalDetails().subscribe(result => {
      this.spinner.hide('loading');
      this.bloodGroup = result["bloodGroup"],
        this.isDisabled = result["isDisabled"],
        this.typeOfDisability = result["typeOfDisability"]
    }, error => {
      this.spinner.hide('loading');

      console.log(error)
    })
  }

  saveAndNext() {

    let obj = {
      "bloodGroup": this.bloodGroup,
      "isDisabled": this.isDisabled,
      "typeOfDisability": this.typeOfDisability
    }
    this.spinner.show('saving')
    this.profileService.saveMedicalDetails(obj).subscribe(result => {
      this.spinner.hide('saving')
      this.changeTabEvent.emit()
    }, error => {
      this.spinner.hide('saving')
      console.log(error)
    })


  }

  skipAndNext() {
    this.changeTabEvent.emit()
  }

}
