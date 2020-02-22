import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-additional-form',
  templateUrl: './additional-form.component.html',
  styleUrls: ['./additional-form.component.css']
})
export class AdditionalFormComponent implements OnInit {


  isSameAsCurrent:boolean=false;

  currentAddressLine1:string;
  currentAddressLine2:string;
  currentAddressCity:string;
  currentAddressPin:number;


  permanentAddressLine1:string;
  permanentAddressLine2:string;
  permanentAddressCity:string;
  permanentAddressPin:number;

  constructor() { }

  ngOnInit() {
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

}
