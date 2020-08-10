import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from "../../service/login.service"
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usernameOrEmail: string;
  password: string;
  focus;
  focus1;

  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  async loginWithEmail() {
    let userdata = {
      "usernameOrEmail": this.usernameOrEmail,
      "password": this.password
    }

    this.spinner.show('loading');
    await this.loginService.loginWithEmail(userdata);
    this.spinner.hide('loading');

  }

  async loginWithGoogle()
  {
    this.spinner.show('loading');
    await this.loginService.loginWithGoogle();
    this.spinner.hide('loading');
  }


}
