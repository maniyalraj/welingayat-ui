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


  heightControl: FormControl = new FormControl([150, 180]);
  heightOptions: Options = {
    floor: 90,
    ceil: 250
  };

  heightFilter: boolean = false

  ageFilter: boolean = false

  ageFilterControl: FormControl = new FormControl([20, 40]);

  ageFilterOptions: Options = {
    floor: 16,
    ceil: 60
  };

  allusers = []

  constructor(private profileService: ProfileService, private mapService: MapServiceService, private spinner: NgxSpinnerService) { }


  ngAfterViewInit() {

  }

  ngOnInit() {

    this.spinner.show();


    this.profileService.getAllUsers(this.getFilters()).subscribe((result: any) => {

      for (let r of result.content) {
        r.age = this.calculateAge(r.userPersonalDetails.dob)
        if (r.userImages.imageUrl == null) {
          r.userImages.imageUrl = "../../assets/images/blank-profile-picture.png"
        }
        r.userPersonalDetails.maritalStatus = this.mapService.getMaritalStatusString(r.userPersonalDetails.maritalStatus);
        this.allusers.push(r)

      }

      this.spinner.hide()


    }, error => {
      this.spinner.hide()
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
    this.profileService.getAllUsers(this.getFilters()).subscribe((result: any) => {
      this.allusers = []
      for (let r of result.content) {
        r.age = this.calculateAge(r.userPersonalDetails.dob)
        if (r.userImages.imageUrl == null) {
          r.userImages.imageUrl = "../../assets/images/blank-profile-picture.png"
        }
        r.userPersonalDetails.maritalStatus = this.mapService.getMaritalStatusString(r.userPersonalDetails.maritalStatus);
        this.allusers.push(r)

      }

      this.spinner.hide()


    }, error => {
      this.spinner.hide()
    })

  }

  getFilters() {
    let filter = {
      "maxHeight": "0",
      "maxAge": "0"
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
    return filter;
  }



}
