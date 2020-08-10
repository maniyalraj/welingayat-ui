import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User, UserPrivateData } from 'src/app/types/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-additional-form',
  templateUrl: './additional-form.component.html',
  styleUrls: ['./additional-form.component.css']
})
export class AdditionalFormComponent implements OnInit {
  @Output() changeTabEvent = new EventEmitter<string>();

  isSameAsCurrent: boolean = false;

  user: UserPrivateData;

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
    this.spinner.hide('loading');
  }

  checkAndCopy() {
    if (this.isSameAsCurrent == false) {

      this.user.permanentAddressLine1 = this.user.currentAddressLine1;
      this.user.permanentAddressLine2 = this.user.currentAddressLine2;
      this.user.permanentAddressCity = this.user.currentAddressCity;
      this.user.permanentAddressPin = this.user.currentAddressPin;


    }
    else {
      this.user.permanentAddressLine1 = null;
      this.user.permanentAddressLine2 = null;
      this.user.permanentAddressCity = null;
      this.user.permanentAddressPin = null;
    }
  }

  saveAndNext() {

    this.spinner.show("saving");

    const user:UserPrivateData = {
      currentAddressCity: this.user.currentAddressCity,
      currentAddressPin: this.user.currentAddressPin,
      currentAddressLine1: this.user.currentAddressLine1,
      currentAddressLine2: this.user.currentAddressLine2,
      permanentAddressCity: this.user.permanentAddressCity,
      permanentAddressPin: this.user.permanentAddressPin,
      permanentAddressLine1: this.user.permanentAddressLine1,
      permanentAddressLine2: this.user.permanentAddressLine2
    }

    this.userService.updateUserPrivateData(user);
    this.spinner.hide("saving");
    this.changeTabEvent.emit();

  }

}
