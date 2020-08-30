import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { LoginService } from 'src/app/service/login.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  user;
  focus;
  focus1;


  constructor(
    private profileService: ProfileService,
    private userService: UserServiceService,
    private loginService: LoginService) { }

  ngOnInit() {

    this.user = this.userService.getCurrentUser();
 }

  saveAndNext(){

    let updatedUser = {
      "contact": this.user.contact,
    }

    this.loginService.updateUserData(this.user, this.user);

    this.userService.updateUserSharedPrivateData(updatedUser);
    this.changeTabEvent.emit();

  }

  skipAndNext(){
     this.changeTabEvent.emit();
  }

}
