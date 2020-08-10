import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/types/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-professional-form',
  templateUrl: './professional-form.component.html',
  styleUrls: ['./professional-form.component.css']
})
export class ProfessionalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  jobType: string = "JOB_TYPE_SELECTED";
  jobRole: string;
  monthlyIncome: number;
  jobLocation: string;
  jobIndustry: string;

  user: User;

  focus;
  focus1;

  constructor(
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private loginService: LoginService
    ) { }

  ngOnInit() {

    this.spinner.show('loading')

    this.user = this.userService.getCurrentUser();

    this.spinner.hide('loading');


  }

  saveAndNext() {


    this.spinner.show('saving');
    this.loginService.updateUserData(this.user, this.user);
    this.spinner.hide('saving');
    this.changeTabEvent.emit();
  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }

}
