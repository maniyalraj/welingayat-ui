import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { MapServiceService } from 'src/app/service/map-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options } from 'ng5-slider'
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';


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

  qualificationFilter: boolean = false
  qualificationArray: any;

  nameFilter: boolean = false
  firstName = ""
  lastName = ""

  jobTypeFilter: boolean = false
  jobTypeArray: any;

  cityFilter: boolean = false
  cityNameOrPin = ""

  allusers = []
  qualificationMap: any;
  jobTypeMap: any;

  selectedUser: any;
  closeResult: any;

  page = 0;
  size = 9;
  totalElements = 10;
  p: number = 1;

  focus;
  focus_fn;
  focus_ln;
  focus_salary;
  focus_city;




  constructor(private profileService: ProfileService, private mapService: MapServiceService, private spinner: NgxSpinnerService, private modalService: NgbModal, private router: Router, private userService: UserServiceService) { }


  ngAfterViewInit() {

  }

  ngOnInit() {

    this.qualificationMap = this.mapService.qualtificationMap;
    this.jobTypeMap = this.mapService.jobTypeMap;

    this.spinner.show('loading');


    this.profileService.getAllUsers(this.getFilters(), this.page, this.size).subscribe((result: any) => {

      this.populateUsers(result);
      this.totalElements = result.totalElements

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

    this.profileService.getAllUsers(this.getFilters(), this.page, this.size).subscribe((result: any) => {

      this.populateUsers(result)

      this.spinner.hide('loading')


    }, error => {
      this.spinner.hide('loading')
    })

  }

  toggleFavourite(user) {

    let favList = JSON.parse(localStorage.getItem("favList"));

    user.spin = "fa-spin";

    if (favList.includes(user.id)) {
      this.userService.removeFromFav(user.id).subscribe((result) => {
        if (result != null) {
          favList.splice(favList.indexOf(user.id), 1);
          localStorage.setItem("favList", JSON.stringify(favList));
          user.isFavourite = false;
        }
        user.spin = ""
      }, (error) => {
        console.log(error);
        user.spin = ""
      })
    }
    else {
      this.userService.addToFav(user.id).subscribe((result) => {
        if (result != null) {
          favList.push(user.id);
          localStorage.setItem("favList", JSON.stringify(favList));
          user.isFavourite = true;
        }
        user.spin = ""
      }, (error) => {
        console.log(error);
        user.spin = ""
      })
    }

  }

  getFilters() {
    let filter = {
      "maxHeight": "0",
      "maxAge": "0",
      "minSalary": "0",
      "qualification": null,
      "firstName": "",
      "lastName": "",
      "jobType": null,
      "cityNameOrPin": ""
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

    if (this.qualificationFilter) {
      filter["qualification"] = this.qualificationArray
    }
    else {
      filter["qualification"] = null
    }

    if (this.nameFilter) {
      if (this.firstName != "") {
        filter["firstName"] = "%" + this.firstName + "%"
      }
      if (this.lastName != "") {
        filter["lastName"] = "%" + this.lastName + "%"
      }

    }
    else {
      filter["firstName"] = ""
      filter["lastName"] = ""
    }

    if (this.jobTypeFilter) {
      filter["jobType"] = this.jobTypeArray
    }
    else {
      filter["jobType"] = null
    }

    if (this.cityFilter) {
      if (isNaN(this.cityNameOrPin as any)) {
        filter["cityNameOrPin"] = "%" + this.cityNameOrPin + "%"
      }
      else {
        filter["cityNameOrPin"] = this.cityNameOrPin
      }

    } else {
      filter["cityNameOrPin"] = ""
    }

    return filter;
  }

  populateUsers(result) {

    let favList: any[] = JSON.parse(localStorage.getItem("favList"));

    let users = result.content
    this.totalElements = result.totalElements
    this.allusers = []
    for (let r of users) {

      r = this.userService.transformUser(r)

      this.allusers.push(r)

    }
  }

  getPage(event) {

    this.spinner.show('loading')
    this.p = event;
    this.page = event - 1

    this.profileService.getAllUsers(this.getFilters(), this.page, this.size).subscribe((result: any) => {

      this.populateUsers(result);
      this.totalElements = result.totalElements

      this.spinner.hide('loading')
      window.scroll(0, 0)


    }, error => {
      this.spinner.hide('loading')
      window.scroll(0, 0)
    })

  }

  clearFilters() {
    this.heightFilter = false
    this.ageFilter = false
    this.salaryFilter = false
    this.qualificationFilter = false
    this.jobTypeFilter = false
    this.nameFilter = false
    this.cityFilter = false

    this.getPage(1);
  }

  viewProfile(user) {
    this.router.navigate(["userProfile/" + user])
  }

  quickView(user) {
    this.selectedUser = user
  }


  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
        this.closeResult = 'Closed with: $result';
      }, (reason) => {
        this.closeResult = 'Dismissed $this.getDismissReason(reason)';
      });
    }
  }


}
