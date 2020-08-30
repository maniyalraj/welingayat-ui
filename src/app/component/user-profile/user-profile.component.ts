import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private sub: any;

  isUnlocked = false;

  userImagePresent: boolean = false;
  profileImageUrl: String = "";
  blankProfile: any = 'assets/images/blank-profile-picture.png';

  user: any = { unlocked: false };
  countOfSiblings = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router) {


  }

  ngOnInit() {
    this.spinner.show('loading');
    this.sub = this.route.params.subscribe(async params => {
      this.id = params['id'];
      const currentUser = this.userService.getCurrentUser();
      if (currentUser.uid == this.id) {
        this.router.navigate(['/profile']);
      }

      let user: any = await this.userService.getUser(this.id);
      this.spinner.hide('loading');

      if (currentUser.unlockedUsers && currentUser.unlockedUsers.includes(user.uid)) {
        user.unlocked = true;
        this.isUnlocked = true;
      }

      this.user = user;

      currentUser.familyDetails && currentUser.familyDetails.forEach(d => {
        if (d.relation === "SIBLING") {
          this.countOfSiblings += 1;
        }
      })

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  calculateAge(date) {
    if (date == null) {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
    return age;
  }

  async unlockUser() {
    const currentUser = this.userService.getCurrentUser();

    if (currentUser.credits >= 100) {
      try {
        await this.userService.unlockUser(this.user.uid);
      } catch (e) {
        console.log("Firebase permission error");
      }

      // this.loginService.getCurrentUser(this.user.uid).then(user => {
      //   this.user.unlocked = true;
      // })

      this.user = await this.userService.getUser(this.user.uid);
      this.user.unlocked = true;
      this.isUnlocked = true;

    }

    else {
      alert("You do not have sufficient credits.");
    }

    this.modalService.dismissAll();



      try {
        this.user = await this.userService.getUser(this.user.uid);
      } catch (e) {
        console.log("Firebase permission error");
      }


    console.log(this.user);
  }

  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
      this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
      }, (reason) => {
      });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
      }, (reason) => {
      });
    } else {
      this.modalService.open(content, { centered: true }).result.then((result) => {
      }, (reason) => {
      });
    }
  }

}
