import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-profile-register',
  templateUrl: './profile-register.component.html',
  styleUrls: ['./profile-register.component.css']
})
export class ProfileRegisterComponent implements OnInit {

  name: String;

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getUserBasicDetails().subscribe(result=>{
        console.log(result);
        this.name=result["name"];
    },error=>{
      // alert("Some error occured: "+error)
    })
  }

  
}
