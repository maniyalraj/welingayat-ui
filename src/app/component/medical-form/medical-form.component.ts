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

  constructor(private profileService: ProfileService, private enumService: EnumServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    // this.enumService.getEnumValues("BloodGroup").subscribe((result: any) => {
    //   this.bloodGroupOptions = []

    //   for (let k of Object.keys(result)) {
    //     this.bloodGroupOptions.push({ "key": k, "value": result[k] })
    // }

    this.profileService.getMedicalDetails().subscribe(result => {
      this.spinner.hide();
      this.bloodGroup = result["bloodGroup"],
        this.isDisabled = result["isDisabled"],
        this.typeOfDisability = result["typeOfDisability"]
    }, error => {
      this.spinner.hide();

      console.log(error)
    })

    // }, error => {
    //   this.spinner.hide();

    // })





  }

  saveAndNext() {

    let obj = {
      "bloodGroup": this.bloodGroup,
      "isDisabled": this.isDisabled,
      "typeOfDisability": this.typeOfDisability
    }

    this.profileService.saveMedicalDetails(obj).subscribe(result => { }, error => {
      console.log(error)
    })

    this.changeTabEvent.emit()
  }

  skipAndNext() {
    this.changeTabEvent.emit()
  }

}
