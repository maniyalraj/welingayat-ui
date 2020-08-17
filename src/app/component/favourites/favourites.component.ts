import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {


  allusers: any[] = [];

  open;
  classic3;
  quickView;

  constructor(private userService: UserServiceService, private router: Router, private spinner: NgxSpinnerService) { }

  async ngOnInit() {


    this.spinner.show('loading');

    const currentUser = this.userService.getCurrentUser();

    const favouritesUsers = currentUser.favouriteUsers || [];
    const unlockedUsers = currentUser.unlockedUsers || [];

    const selectedUsers = [...favouritesUsers, ...unlockedUsers]

    if(selectedUsers.length >0)
    {
      this.allusers = await this.userService.getSelectedUsers(selectedUsers);

    }
    this.spinner.hide('loading');
  }

  viewProfile(user) {
    this.router.navigate(["userProfile/" + user])
  }

  async toggleFavourite(user) {

    const currentUser = this.userService.getCurrentUser();

    let favList = currentUser.favouriteUsers || []

    user.spin = "fa-spin";

    if (favList.includes(user.uid)) {
      await this.userService.removeFromFav(user.uid);
      user.isFavourite = false;
      user.spin = "";
    }
    else {
      await this.userService.addToFav(user.uid);
      user.isFavourite = true;
      user.spin = "";
    }

  }

}
