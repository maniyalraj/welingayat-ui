import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { NgwWowService } from 'ngx-wow';
import { ProfileService } from 'src/app/service/profile.service';
import { UserServiceService } from 'src/app/service/user-service.service';

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


  constructor(
    private loginService: LoginService,
    private wowService: NgwWowService,
    private profileService: ProfileService,
    private userService: UserServiceService) {
    this.wowService.init()
  }

  async ngOnInit() {
    this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;

    this.subscription = this.loginService.loggedInState$
      .subscribe(item => {
        this.isLoggedIn = item
        // this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;
      });

      this.totalUsers = await this.userService.getCountOfTotalUsers();

  }

  checkIsLoggedIn() {
    return localStorage.getItem("accessToken");
  }

 onIntersection({ target, visible }) {



  }

}
