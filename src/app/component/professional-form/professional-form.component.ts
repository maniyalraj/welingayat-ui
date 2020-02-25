import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

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

  constructor(private profileService: ProfileService) { }

  ngOnInit() {

    this.profileService.getProfessionalDetails().subscribe(result=>{

      this.jobType=result["jobType"]!=""?result["jobType"]:"JOB_TYPE_SELECTED";
      this.jobRole=result["jobRole"]!=""?result["jobRole"]:null;
      this.monthlyIncome=result["monthlyIncome"]!=""?result["monthlyIncome"]:null;
      this.jobLocation=result["jobLocation"]!=""?result["jobLocation"]:null;
      this.jobIndustry=result["jobIndustry"]!=""?result["jobIndustry"]:null;




    },error=>{
      console.log(error);
    })


  }

  saveAndNext(){

    let obj={
      "jobType": this.jobType !="JOB_TYPE_SELECTED"? this.jobType:"",
      "jobRole": this.jobRole,
      "monthlyIncome":this.monthlyIncome,
      "jobLocation":this.jobLocation,
      "jobIndustry":this.jobIndustry
    }

    this.profileService.saveProfessionalDetails(obj).subscribe(result=>{
      this.changeTabEvent.emit();
    },error=>{
      console.log(error)
    })

   

  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }

}
