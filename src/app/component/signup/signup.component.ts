import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Router } from '@angular/router';

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
  gender: string = "GENDER_FEMALE";

  focus;
  focus1;
  focus_firstName;
  focus_LastName;
  focus_Contact;


  constructor(private signupService: SignupService, private router: Router) { }

  ngOnInit() {
  }

  signup() {
    let userData = {
      "username": this.email,
      "email": this.email,
      "password": this.password,
      "firstName": this.firstname,
      "lastName": this.lastname,
      "middleName": this.middleName,
      "contact": this.contact,
      "gender": this.gender
    }

    if (this.checkPassword()) {
      this.signupService.signup(userData).subscribe(result => {
        alert("Signup Successfull please login");
        this.router.navigate(['/login']);
      }, error => {
        alert(error.error.message);
      });
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

}
