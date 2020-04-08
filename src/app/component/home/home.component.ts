import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private isLoggedIn: boolean = false;
  subscription: Subscription;
  
  constructor( private loginService: LoginService) { }

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

}
