import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumServiceService } from 'src/app/service/enum-service.service';
import { MapServiceService } from 'src/app/service/map-service.service';

@Component({
  selector: 'app-educational-form',
  templateUrl: './educational-form.component.html',
  styleUrls: ['./educational-form.component.css']
})
export class EducationalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  qualification: string = "QUALIFICATION_SELECT"
  otherQualification: string
  nameOfInstitute: string
  qualificationMap: any;

  focus;
  focus1;

  constructor(private profileService: ProfileService, private mapService: MapServiceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.qualificationMap = this.mapService.qualtificationMap

    this.spinner.show('loading')

    this.profileService.getEducationalDetails().subscribe(result => {
      this.spinner.hide('loading')
      this.qualification = result["qualification"] != "" ? result["qualification"] : "QUALIFICATION_SELECT";
      this.otherQualification = result["other_qualification"] != "" ? result["other_qualification"] : null;
      this.nameOfInstitute = result["institute"] != "" ? result["institute"] : null;
    }, error => {
      this.spinner.hide('loading')
      console.log(error)
    })

  }


  saveAndNext() {
    let obj = {
      "qualification": this.qualification != "QUALIFICATION_SELECT" ? this.qualification : "",
      "other_qualification": this.otherQualification,
      "institute": this.nameOfInstitute
    }

    this.spinner.show('saving');

    this.profileService.saveEducationalDetails(obj).subscribe(result => {
      this.spinner.hide('saving');
      console.log(result);

      this.changeTabEvent.emit();

    }, error => {
      this.spinner.hide('saving');

      console.log(error)
    })
  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }



}
