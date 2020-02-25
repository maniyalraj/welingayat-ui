import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show()

    this.profileService.getEducationalDetails().subscribe(result=>{
      this.spinner.hide()
      this.qualification = result["qualification"] != ""?result["qualification"] :"QUALIFICATION_SELECT";
      this.otherQualification = result["other_qualification"] != ""?result["other_qualification"] :null;
      this.nameOfInstitute =  result["institute"] != ""?result["institute"] :null;
    },error=>{
      this.spinner.hide()
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
