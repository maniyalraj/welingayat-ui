import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/types/user';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-personal-form',
  templateUrl: './personal-form.component.html',
  styleUrls: ['./personal-form.component.css']
})
export class PersonalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  gender: string;
  dob: any;
  placeOfBirth: string;
  heightInCms: number;
  weightInKgs: number;
  complexion: string = "COMPLEXION_SELECTED";
  maritalStatus: string = "MARITAL_STATUS_SELECTED";
  familyType: string = "FAMILY_TYPE_SELECTED";

  user: User;

  alertMessage: string;
  staticAlertClosed = true;
  alertType: string = "danger";

  focus;
  focus1;

  constructor(
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.spinner.show('loading');

    this.user = this.userService.getCurrentUser();

    this.dob = new Date(this.user.dob);

    this.spinner.hide('loading');

  }

  showAlert(type, message) {
    this.alertMessage = message;
    this.alertType = type
    setTimeout(() => this.staticAlertClosed = true, 4000);
  }

  saveAndNext() {

    this.user.dob = new Date(this.dob).getTime();

    this.spinner.show('saving')

    this.loginService.updateUserData(this.user, this.user)

    this.spinner.hide('saving')

    this.changeTabEvent.emit();

  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }

}
