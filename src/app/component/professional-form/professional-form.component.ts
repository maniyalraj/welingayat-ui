import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();
  
  jobType:string="JOB_TYPE_SELECTED";
  jobRole:string;
  monthlyIncome:number;
  jobLocation:string;
  jobIndustry:string;

  constructor() { }

  ngOnInit() {
  }

  saveAndNext(){
    this.changeTabEvent.emit();

  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }

}
