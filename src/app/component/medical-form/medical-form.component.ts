import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { EnumServiceService } from 'src/app/service/enum-service.service';
import { User } from 'src/app/types/user';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.css']
})
export class MedicalFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  bloodGroup: string;
  bloodGroupOptions: any = []
  isDisabled = 'no';
  typeOfDisability: string;

  user: User;
  focus;
  focus1;

  constructor(
    private profileService: ProfileService,
    private enumService: EnumServiceService,
    private spinner: NgxSpinnerService,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.spinner.show('loading');

    this.user = this.userService.getCurrentUser();

    this.spinner.hide('loading');

  }

  saveAndNext() {


    this.spinner.show('saving');

    if(this.user.isDifferentlyAbled === 'no')
    {
      this.user.typeOfDisability = null;
    }

    this.loginService.updateUserData(this.user, this.user);
    this.spinner.hide('saving');
    this.changeTabEvent.emit();


  }

  skipAndNext() {
    this.changeTabEvent.emit()
  }

}
