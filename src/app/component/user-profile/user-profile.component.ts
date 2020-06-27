import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: number;
  private sub: any;

  userImagePresent: boolean = false;
  profileImageUrl: String = "";
  croppedImage: any = 'assets/images/blank-profile-picture.png';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       console.log(this.id)
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
