import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  contact: string;
  middleName: string;
  confirmPassword: string;
  gender: string = "FEMALE";
  dob;

  focus;
  focus1;
  focus_firstName;
  focus_LastName;
  focus_Contact;


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

 async signup() {
    let userData = {
      "username": this.email,
      "email": this.email,
      "password": this.password,
      "firstName": this.firstname,
      "lastName": this.lastname,
      "middleName": this.middleName,
      "contact": this.contact,
      "gender": this.gender,
      "dob": new Date(this.dob).getTime()
    }

    if (this.checkPassword()) {

      await this.loginService.signUpWithEmail(userData);
      // this.router.navigate(['/login']);
    }
    else {
      alert("Passwords did not match");
    }

  }


  checkPassword() {
    if (this.password != this.confirmPassword) {
      return false;
    }
    return true;
  }

  loginWithGoogle()
  {
    this.loginService.loginWithGoogle();
  }

}
