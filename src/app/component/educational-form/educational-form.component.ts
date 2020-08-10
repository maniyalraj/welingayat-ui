import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumServiceService } from 'src/app/service/enum-service.service';
import { MapServiceService } from 'src/app/service/map-service.service';
import { User } from 'src/app/types/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-educational-form',
  templateUrl: './educational-form.component.html',
  styleUrls: ['./educational-form.component.css']
})
export class EducationalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  qualification: string = "QUALIFICATION_SELECT"
  otherQualification: string
  nameOfInstitute: string
  qualificationMap: any;

  user: User;

  focus;
  focus1;

  constructor(
    private profileService: ProfileService,
    private mapService: MapServiceService,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.qualificationMap = this.mapService.qualtificationMap

    this.spinner.show('loading')

    this.user = this.userService.getCurrentUser();

    this.spinner.hide('loading')


  }


  saveAndNext() {

    this.spinner.show('saving');

    this.loginService.updateUserData(this.user, this.user);
    this.changeTabEvent.emit();
    this.spinner.hide('saving');

  }

  skipAndNext() {
    this.changeTabEvent.emit();
  }



}
