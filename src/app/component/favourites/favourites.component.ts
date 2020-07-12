import { Component, OnInit } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {


  private allusers: any[] = [];

  constructor(private userService: UserServiceService) { }

  ngOnInit() {

    this.userService.getCurrentUser().subscribe((result:any)=>{

      for(let r of result.userFavourites)
      {

        this.allusers.push(this.userService.transformUser(r));

      }


    }, error=>{
      console.log(error);

    })

  }

}
