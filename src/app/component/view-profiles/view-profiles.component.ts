import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { MapServiceService } from 'src/app/service/map-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options } from 'ng5-slider'
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';
import { appConstats } from 'src/app/constants';
import { Filters } from 'src/app/types/filters';


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




  constructor(
    private profileService: ProfileService,
    private mapService: MapServiceService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  async ngOnInit() {

    this.qualificationMap = this.mapService.qualtificationMap;
    this.jobTypeMap = this.mapService.jobTypeMap;

    this.spinner.show('loading');

    this.allusers =  await this.profileService.getFirstUsers(null, null, null);

    this.allusers = this.populateUsers(this.allusers);

    this.spinner.hide('loading');

    console.log(this.allusers);

  }


  async loadMoreUsers()
  {
    const users = await this.profileService.loadMoreUsers();
    const newUsers = this.populateUsers(users)
    const existingUsers = this.allusers;
    this.allusers = [...existingUsers, ...newUsers];
  }

  calculateAge(date) {
    if (date == null) {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  async applyFilter() {

    this.spinner.show('loading')

    this.allusers = [];

    this.getFilters();

    this.allusers = this.populateUsers(
      await this.profileService.getFirstUsers(null, null, null));

    this.spinner.hide('loading')

  }

  async toggleFavourite(user) {

    const currentUser = this.userService.getCurrentUser();

    let favList = currentUser.favouriteUsers || []

    user.spin = "fa-spin";

    if (favList.includes(user.uid)) {
      await this.userService.removeFromFav(user.uid);
      user.isFavourite = false;
      user.spin = "";
    }
    else {
      await this.userService.addToFav(user.uid);
      user.isFavourite = true;
      user.spin = "";
    }

  }

  getFilters() {
    let filter: Filters = {
      minHeightInCms: 0,
      maxHeightInCms: 0,
      minDob: 0,
      maxDob: 0,
      monthlyIncome: 0,
      qualification: null,
      firstName: "",
      lastName: "",
      jobType: null,
      currentAddressCity: "",
      currentCityPin: 0
    }

    if (this.heightFilter) {
      filter.minHeightInCms = this.heightControl.value[0]
      filter.maxHeightInCms = this.heightControl.value[1]
    }
    else {
      filter.minHeightInCms = 0,
      filter.maxHeightInCms = 0
    }

    if (this.ageFilter) {

      const minAge = this.ageFilterControl.value[0];
      const maxAge = this.ageFilterControl.value[1];

      var yearBegining = new Date(new Date().setMonth(0)).setDate(1);
      var today = new Date().getTime();
      var milliSecondsElapsed = today - yearBegining;


      filter.minDob = new Date((minAge-1) * 365.24 * 24 *60 * 60 * 1000 + milliSecondsElapsed).getTime();
      filter.maxDob = new Date((maxAge-1) * 365.24 * 24 *60 * 60 * 1000 + milliSecondsElapsed).getTime();
    }
    else {
      filter.minDob = 0;
      filter.maxDob = 0;
    }

    if (this.salaryFilter) {
      filter.monthlyIncome = this.minSalary;
    }
    else {
      filter.monthlyIncome = 0;
    }

    if (this.qualificationFilter) {
      filter.qualification = this.qualificationArray;
    }
    else {
      filter.qualification = null
    }

    if (this.nameFilter) {
      if (this.firstName != "") {
        filter.firstName = this.firstName
      }
      if (this.lastName != "") {
        filter.lastName = this.lastName
      }

    }
    else {
      filter.firstName = ""
      filter.lastName = ""
    }

    if (this.jobTypeFilter) {
      filter.jobType = this.jobTypeArray
    }
    else {
      filter.jobType = null
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

    this.profileService.setFilters(filter);

    return filter;
  }

  populateUsers(_users) {

    const favouriteUsers = this.userService.getCurrentUser().favouriteUsers;

    _users.forEach(user => {
      if(user.profileImageUrl == null)
      {
        if(user.photoURL == null)
        {
          user.profileImageUrl = "../../assets/images/blank-profile-picture.png";
        }else
        {
        user.profileImageUrl = user.photoURL;
        }
      }

      user["age"] = this.calculateAge(new Date(user.dob));

      user.isFavourite  = favouriteUsers.includes(user.uid);

    });

    return _users;

  }

  getPage(event) {

    this.spinner.show('loading')
    this.p = event;
    this.page = event - 1

    // this.profileService.getAllUsers(this.getFilters(), this.page, this.size).subscribe((result: any) => {

    //   this.populateUsers(result);
    //   this.totalElements = result.totalElements

    //   this.spinner.hide('loading')
    //   window.scroll(0, 0)


    // }, error => {
    //   this.spinner.hide('loading')
    //   window.scroll(0, 0)
    // })

  }

  clearFilters() {
    this.heightFilter = false
    this.ageFilter = false
    this.salaryFilter = false
    this.qualificationFilter = false
    this.jobTypeFilter = false
    this.nameFilter = false
    this.cityFilter = false

    this.profileService.setFilters(null);
    this.applyFilter();
    // this.getPage(1);
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
