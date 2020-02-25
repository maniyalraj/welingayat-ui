import { Component, OnInit } from '@angular/core';
import { SignupService } from 'src/app/service/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private username:string;
  private email:string;
  private password:string;
  private firstname:string;
  private lastname:string;
  private contact:string;
  private middleName:string;

  constructor(private signupService: SignupService,  private router: Router) { }

  ngOnInit() {
  }

  signup(){
    let userData ={
      "username":this.email,
      "email":this.email,
      "password":this.password,
      "firstName":this.firstname,
      "lastName":this.lastname,
      "middleName":this.middleName,
      "contact":this.contact
    }
    this.signupService.signup(userData).subscribe(result=>{
      alert("Signup Successfull please login");
      this.router.navigate(['/login']);
    },error=>{
        alert(error.error.message);
    });
  }

}
