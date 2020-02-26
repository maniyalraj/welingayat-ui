import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css']
})
export class MedicalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  bloodGroup:string="BLOOD_GROUP_SELECTED";
  isDisabled:boolean=false;
  typeOfDisability:string;

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
   
    this.spinner.show();

    this.profileService.getMedicalDetails().subscribe(result=>{
      this.spinner.hide();
      this.bloodGroup = result["bloodGroup"],
      this.isDisabled = result["isDisabled"],
      this.typeOfDisability = result["typeOfDisability"]
    },error=>{
      this.spinner.hide();

      console.log(error)
    })

  }

  saveAndNext(){

    let obj ={
      "bloodGroup":this.bloodGroup,
      "isDisabled":this.isDisabled,
      "typeOfDisability":this.typeOfDisability
    }

    this.profileService.saveMedicalDetails(obj).subscribe(result=>{},error=>{
      console.log(error)
    })

    this.changeTabEvent.emit()
  }

  skipAndNext(){
    this.changeTabEvent.emit()
  }

}
