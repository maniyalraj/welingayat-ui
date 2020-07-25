import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { NgwWowService } from 'ngx-wow';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  subscription: Subscription;
  totalUsers = 0;
  maleUsers = 0;
  femaleUsers = 0;


  constructor(private loginService: LoginService, private wowService: NgwWowService, private profileService: ProfileService) {
    this.wowService.init()
  }

  ngOnInit() {
    this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;

    this.subscription = this.loginService.loggedInState$
      .subscribe(item => {
        this.isLoggedIn = item
        this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;
      });



  }

  checkIsLoggedIn() {
    return localStorage.getItem("accessToken");
  }

  public onIntersection({ target, visible }) {

    if (visible) {
      this.profileService.getUserCountByGender().subscribe((result: any) => {
        this.maleUsers = result.filter(c => c.gender == "GENDER_MALE")[0].count
        this.femaleUsers = result.filter(c => c.gender == "GENDER_FEMALE")[0].count
        this.totalUsers = this.maleUsers + this.femaleUsers
      }, error => {
        console.error(error);

      })
    }



  }

}
