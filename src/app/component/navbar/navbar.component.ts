import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserSharedPrivateData } from 'src/app/types/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;
  lastPoppedUrl: string;
  yScrollStack: number[] = [];
  credits = 0;

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  subscription: Subscription;

  gender;
  firstName;
  middleName;
  lastName;
  contact;
  dob;

  @ViewChild('inCompleteUser', null) inCompleteUser: ElementRef;

  constructor(
    public location: Location,
    private router: Router,
    private loginService: LoginService,
    private userService: UserServiceService,
    private modalService: NgbModal) {
  }

  ngOnInit() {

    this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;

    this.subscription = this.loginService.loggedInState$
      .subscribe(item => {
        this.isLoggedIn = item

        const user = this.userService.getCurrentUser();

        this.credits = user && user.credits || 0;

        if (item && user && user.gender == undefined) {
          this.open(this.inCompleteUser);
        }

      });


    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
        if (event.url != this.lastPoppedUrl)
          this.yScrollStack.push(window.scrollY);
      } else if (event instanceof NavigationEnd) {
        if (event.url == this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else
          window.scrollTo(0, 0);
      }
    });
    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

  }

  checkIsLoggedIn() {

    return localStorage.getItem("accessToken");
  }

  isHome() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee === '#/home') {
      return true;
    }
    else {
      return false;
    }
  }

  open(content) {

    this.modalService.open(content, {
      centered: true, backdrop: 'static', keyboard: false
    }).result.then((result) => {
      // this.closeResult = 'Closed with: $result';
    }, (reason) => {
      // this.closeResult = 'Dismissed $this.getDismissReason(reason)';
    });

  }

  updateDetails() {

    if (this.gender != null
      && this.firstName != null
      && this.middleName != null
      && this.lastName != null
      && this.contact != null) {
      const user = this.userService.getCurrentUser();
      const updateData = {
        "gender": this.gender,
        "firstName": this.firstName,
        "middleName": this.middleName,
        "lastName": this.lastName,
        "dob": new Date(this.dob).getTime()
      }

      const updateUserSharedPrivateData: UserSharedPrivateData = {
        contact: this.contact
      }

      this.loginService.updateUserData(user, updateData);

      this.userService.updateUserSharedPrivateData(updateUserSharedPrivateData);
    }
    else {
      alert("Please fill all details");
      return false;
    }

  }

  logout() {
    this.loginService.logout();
    localStorage.removeItem("accessToken");
    this.isLoggedIn = false;
    this.router.navigate(["/home"]);
    // this.loginService.changeLoginState(false);
  }
}
