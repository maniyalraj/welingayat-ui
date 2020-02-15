import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {LoginService} from "../../service/login.service"
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private usernameOrEmail:string;
  private password: string;

  @Output() loggedIn: EventEmitter<any> = new EventEmitter();

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    let userdata = {
      "usernameOrEmail":this.usernameOrEmail,
      "password": this.password
    }
    this.loginService.login(userdata).subscribe(result=>{
      console.log(result);
      localStorage.setItem("accessToken", result["accessToken"]);
      // alert("Login Success");
      this.loginService.changeLoginState(true);
      this.router.navigate(["/profile"]);
    },error=>{
      console.log(error);
      alert(error.error.message)
    });
  }


}
