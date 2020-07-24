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

  login() {
    let userdata = {
      "usernameOrEmail": this.usernameOrEmail,
      "password": this.password
    }

    this.spinner.show('loading');

    this.loginService.login(userdata).subscribe(result => {
      console.log(result);
      this.spinner.hide('loading');
      localStorage.setItem("accessToken", result["accessToken"]);
      // alert("Login Success");
      this.loginService.changeLoginState(true);
      this.router.navigate(["/profile"]);
    }, error => {
      this.spinner.hide('loading')
      console.log(error);
      alert(error.error.message)
    });
  }


}
