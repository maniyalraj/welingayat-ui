import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  croppedImage: any = 'assets/images/blank-profile-picture.png';

  user ;
  countOfSiblings= 0;

  constructor(private route: ActivatedRoute, private userService: UserServiceService, private spinner: NgxSpinnerService) {
    let emptyUser = this.userService.getEmptyUserObj(null);
    this.user = {...this.user, ...emptyUser};

  }

  ngOnInit() {
    this.spinner.show('loading');
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];


       this.userService.getUser(this.id).subscribe((result:any)=>{
        this.spinner.hide('loading');
        console.log(result)
        if(result){
          if (result.userImages == null || result.userImages.imageUrl == null) {
            result.userImages = { "imageUrl": "../../assets/images/blank-profile-picture.png" }
          }
          this.profileImageUrl = result.userImages.imageUrl

          this.user =this.userService.getEmptyUserObj(result);

          this.user.age = this.calculateAge(result.userPersonalDetails.dob);
          this.user.userProfessionalDetails.jobType = this.user.userProfessionalDetails.jobType.replace("JOB_TYPE_","")
          this.user.userPersonalDetails.complexion = this.user.userPersonalDetails.complexion.replace("COMPLEXION_","")
          this.user.userPersonalDetails.maritalStatus = this.user.userPersonalDetails.maritalStatus.replace("MARITAL_STATUS_","")
          this.user.userPersonalDetails.familyType = this.user.userPersonalDetails.familyType.replace("FAMILY_TYPE_","")
          // this.user.userMedicalDetails.bloodGroup = this.user.userMedicalDetails.bloodGroup.replace("BLOOD_GROUP","")

          if(this.user.userEducationalDetails.qualification === "QUALIFICATION_OTHER")
          {
            this.user.userEducationalDetails.qualification = this.user.userEducationalDetails.otherQualification;
          }
          else
          {
            this.user.userEducationalDetails.qualification = this.user.userEducationalDetails.qualification.replace("QUALIFICATION_","")
          }

          if(this.user.userFamilyDetails != null)
          {

            for(let r of this.user.userFamilyDetails)
            {
              if(r.relation === "RELATION_SIBLING")
              {
                this.countOfSiblings += 1;
              }
              r.relation = r.relation.replace("RELATION_","")
              r.profession = r.profession.replace("JOB_TYPE_","")

            }
          }

        }

      },error=>{
        this.spinner.hide('loading');

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

}
