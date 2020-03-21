import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/service/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    public isCollapsed = true;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];

    private isLoggedIn: boolean = false;
    subscription: Subscription;

    constructor(public location: Location, private router: Router, private loginService: LoginService) {
    }

    ngOnInit() {

        this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;

        this.subscription = this.loginService.loggedInState$
            .subscribe(item => {
                this.isLoggedIn = item
                this.isLoggedIn = this.checkIsLoggedIn() != null ? true : false;
            });

        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
    }

    checkIsLoggedIn() {
        return localStorage.getItem("accessToken");
    }

    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '#/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/documentation') {
            return true;
        }
        else {
            return false;
        }
    }

    logout() {
        localStorage.removeItem("accessToken");
        this.isLoggedIn = false;
        this.router.navigate(["/home"]);
    }
}
