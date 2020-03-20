import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { MapServiceService } from 'src/app/service/map-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options } from 'ng5-slider'
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ViewProfilesComponent implements OnInit {

  heightFilter: boolean = false
  heightControl: FormControl = new FormControl([150, 180]);
  heightOptions: Options = {
    floor: 90,
    ceil: 250
  };

  ageFilter: boolean = false
  ageFilterControl: FormControl = new FormControl([20, 40]);
  ageFilterOptions: Options = {
    floor: 16,
    ceil: 60
  };

  salaryFilter: boolean = false
  minSalary: any;

  allusers = []

  constructor(private profileService: ProfileService, private mapService: MapServiceService, private spinner: NgxSpinnerService) { }


  ngAfterViewInit() {

  }

  ngOnInit() {

    this.spinner.show('loading');


    this.profileService.getAllUsers(this.getFilters()).subscribe((result: any) => {

      this.populateUsers(result.content);

      this.spinner.hide('loading')


    }, error => {
      this.spinner.hide('loading')
    })
  }

  calculateAge(date) {
    if (date == null) {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  applyFilter() {

    this.spinner.show('loading')

    this.profileService.getAllUsers(this.getFilters()).subscribe((result: any) => {

      this.populateUsers(result.content)

      this.spinner.hide('loading')


    }, error => {
      this.spinner.hide('loading')
    })

  }

  getFilters() {
    let filter = {
      "maxHeight": "0",
      "maxAge": "0",
      "minSalary": "0"
    }
    if (this.heightFilter) {
      filter["minHeight"] = this.heightControl.value[0]
      filter["maxHeight"] = this.heightControl.value[1]
    }
    else {
      filter["maxHeight"] = "0"
    }

    if (this.ageFilter) {

      filter["minAge"] = this.ageFilterControl.value[0]
      filter["maxAge"] = this.ageFilterControl.value[1]
    }
    else {
      filter["maxAge"] = "0"
    }

    if (this.salaryFilter) {
      filter["minSalary"] = this.minSalary
    }
    else {
      filter["minSalary"] = "0"
    }
    return filter;
  }

  populateUsers(users) {
    this.allusers = []
    for (let r of users) {
      if (r.userPersonalDetails != null) {
        if (r.userPersonalDetails.dob != null) { r.age = this.calculateAge(r.userPersonalDetails.dob) }
        if (r.userPersonalDetails.maritalStatus != null) { r.userPersonalDetails.maritalStatus = this.mapService.getMaritalStatusString(r.userPersonalDetails.maritalStatus); }
      }

      if (r.userImages == null || r.userImages.imageUrl == null) {
        r.userImages = { "imageUrl": "../../assets/images/blank-profile-picture.png" }
      }
      if (r.userEducationalDetails != null && r.userEducationalDetails.qualification == "QUALIFICATION_OTHER") {
        r.userEducationalDetails.qualification = r.userEducationalDetails.other_qualification
      }


      this.allusers.push(r)

    }
  }


}
