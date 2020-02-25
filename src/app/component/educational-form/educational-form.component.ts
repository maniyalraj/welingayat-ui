import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-educational-form',
  templateUrl: './educational-form.component.html',
  styleUrls: ['./educational-form.component.css']
})
export class EducationalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  qualification:string="QUALIFICATION_SELECT"
  otherQualification:string
  nameOfInstitute:string

  constructor(private profileService: ProfileService) { }

  ngOnInit() {

    this.profileService.getEducationalDetails().subscribe(result=>{
      this.qualification = result["qualification"] != ""?result["qualification"] :"QUALIFICATION_SELECT";
      this.otherQualification = result["other_qualification"] != ""?result["other_qualification"] :null;
      this.nameOfInstitute =  result["institute"] != ""?result["institute"] :null;
    },error=>{
      console.log(error)
    })

  }


  saveAndNext(){
    let obj={
      "qualification":this.qualification != "QUALIFICATION_SELECT"?this.qualification:"",
      "other_qualification":this.otherQualification,
      "institute":this.nameOfInstitute
    }

    this.profileService.saveEducationalDetails(obj).subscribe(result=>{

      console.log(result);

      this.changeTabEvent.emit();

    },error=>{
      console.log(error)
    })
  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }

  

}
