import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../service/login.service"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private usernameOrEmail:string;
  private password: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login(){
    let userdata = {
      "usernameOrEmail":this.usernameOrEmail,
      "password": this.password
    }
    this.loginService.login(userdata).subscribe(result=>{
      console.log(result);
      localStorage.setItem("accesToken", result["accessToken"]);
    },error=>{
      console.log(error);
      alert(error.error.message)
    });
  }


}
