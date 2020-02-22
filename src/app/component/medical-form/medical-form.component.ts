import { Component, OnInit, Output,EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  saveAndNext(){
    this.changeTabEvent.emit()
  }

  skipAndNext(){
    this.changeTabEvent.emit()
  }

}
