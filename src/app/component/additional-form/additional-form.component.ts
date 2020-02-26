import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-additional-form',
  templateUrl: './additional-form.component.html',
  styleUrls: ['./additional-form.component.css']
})
export class AdditionalFormComponent implements OnInit {
  @Output() changeTabEvent = new EventEmitter<string>();

  isSameAsCurrent:boolean=false;

  currentAddressLine1:string;
  currentAddressLine2:string;
  currentAddressCity:string;
  currentAddressPin:number;


  permanentAddressLine1:string;
  permanentAddressLine2:string;
  permanentAddressCity:string;
  permanentAddressPin:number;

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    this.profileService.getAdditionalDetails().subscribe(result=>{
      this.spinner.hide();
      this.currentAddressCity = result["currentAddressCity"]
      this.currentAddressLine1 = result["currentAddressLine1"]
      this.currentAddressLine2 = result["currentAddressLine2"]
      this.currentAddressPin = result["currentAddressPin"]

      this.permanentAddressCity = result["permanentAddressCity"]
      this.permanentAddressLine1 = result["permanentAddressLine1"]
      this.permanentAddressLine2 = result["permanentAddressLine2"]
      this.permanentAddressPin = result["permanentAddressPin"]

    },error=>{
      this.spinner.hide();
      
      console.log(error);
    })
  }

  checkAndCopy()
  {
    if(this.isSameAsCurrent == false){

      this.permanentAddressLine1 = this.currentAddressLine1;
      this.permanentAddressLine2 = this.currentAddressLine2;
      this.permanentAddressCity = this.currentAddressCity;
      this.permanentAddressPin = this.currentAddressPin;


    }
    else
    {
      this.permanentAddressLine1 = null;
      this.permanentAddressLine2 = null;
      this.permanentAddressCity = null;
      this.permanentAddressPin = null;
    }
  }

  saveAndNext(){

    let obj = {
      "currentAddressCity":this.currentAddressCity,
      "currentAddressLine1":this.currentAddressLine1,
      "currentAddressLine2":this.currentAddressLine2,
      "currentAddressPin":this.currentAddressPin,

      "permanentAddressCity":this.permanentAddressCity,
      "permanentAddressLine1":this.permanentAddressLine1,
      "permanentAddressLine2":this.permanentAddressLine2,
      "permanentAddressPin":this.permanentAddressPin,


    }

    this.profileService.saveAdditionalDetails(obj).subscribe(result=>{
      console.log(result)
    },error=>{
      console.log(error)
    })

  }

}
