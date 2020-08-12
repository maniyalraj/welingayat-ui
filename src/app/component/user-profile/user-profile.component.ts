import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private sub: any;

  userImagePresent: boolean = false;
  profileImageUrl: String = "";
  blankProfile: any = 'assets/images/blank-profile-picture.png';

  user ;
  countOfSiblings= 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private router: Router) {
    let emptyUser = this.userService.transformUser(null);
    this.user = {...this.user, ...emptyUser};

  }

  ngOnInit() {
    this.spinner.show('loading');
    this.sub = this.route.params.subscribe(async params => {
       this.id = params['id'];
       const currentUser = this.userService.getCurrentUser();
       if(currentUser.uid == this.id)
       {
         this.router.navigate(['/profile']);
       }
       this.user = await this.userService.getUser(this.id) ;
       this.spinner.hide('loading');



       if(currentUser.unlockedUsers && currentUser.unlockedUsers.includes(this.user.uid))
       {
         this.user.unlocked = true;
       }
      //  .subscribe((result:any)=>{
      //   this.spinner.hide('loading');
      //   console.log(result)
      //   if(result){
      //     if (result.userImages == null || result.userImages.imageUrl == null) {
      //       result.userImages = { "imageUrl": "../../assets/images/blank-profile-picture.png" }
      //     }
      //     this.profileImageUrl = result.userImages.imageUrl

      //     this.user =this.userService.transformUser(result);

      //     if(this.user.userFamilyDetails != null)
      //     {

      //       for(let r of this.user.userFamilyDetails)
      //       {
      //         if(r.relation === "RELATION_SIBLING")
      //         {
      //           this.countOfSiblings += 1;
      //         }
      //         r.relation = r.relation.replace("RELATION_","")
      //         r.profession = r.profession.replace("JOB_TYPE_","")

      //       }
      //     }

      //   }

      // }
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

  async unlockUser()
  {
    const currentUser = this.userService.getCurrentUser();

    if(currentUser.credits >= 100)
    {
    await this.userService.unlockUser(this.user.uid);
    }
    else
    {
      alert("You do not have sufficient credits.");
    }

    this.modalService.dismissAll();
    this.user = await this.userService.getUser(this.user.uid);
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
