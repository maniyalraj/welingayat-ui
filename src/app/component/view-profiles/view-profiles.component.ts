import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { MapServiceService } from 'src/app/service/map-service.service';

@Component({
  selector: 'app-view-profiles',
  templateUrl: './view-profiles.component.html',
  styleUrls: ['./view-profiles.component.css']
})
export class ViewProfilesComponent implements OnInit {

  firstName:String;
  middleName:String;
  lastName:String;

  age:number;
  height:number;
  weight:number;

  maritalStatus:String;
  qualification:String;

  jobRole:String;
  monthlyIncome:number;

  allusers = []

  constructor(private profileService: ProfileService, private mapService: MapServiceService) { }

  ngOnInit() {

    this.profileService.getAllUsers().subscribe((result:any)=>{

      for(let r of result){
        r["age"]= this.calculateAge(r["dob"])
        if(r["imageUrl"]==null){
          r["imageUrl"]="../../assets/images/blank-profile-picture.png"
        }
        r["maritalStatus"] = this.mapService.getMaritalStatusString(r["maritalStatus"]);
        this.allusers.push(r)
      }
      

    },error=>{})
  }

  calculateAge(date)
  {
    if(date == null)
    {
      return 0;
    }
    let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

}
