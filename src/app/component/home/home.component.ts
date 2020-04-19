import { Component, OnInit } from '@angular/core';
import { Subscription, Observable, Observer } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isLoggedIn: boolean = false;
  subscription: Subscription;
  private totalUsers=0;
  private maleUsers=0;
  private femaleUsers=0;
  
  
  constructor( private loginService: LoginService) {
 
   }

  ngOnInit() {
    this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;

        this.subscription = this.loginService.loggedInState$
            .subscribe(item => {
                this.isLoggedIn = item
                this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;
            });
  }

  checkIsLoggedIn() {
    return localStorage.getItem("accessToken");
}

public onIntersection({target, visible}){
  
  if(visible){
    this.totalUsers=200;
    this.maleUsers=90;
    this.femaleUsers=110;
  }
    
  

}

}
