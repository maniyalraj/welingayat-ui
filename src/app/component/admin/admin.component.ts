import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';
import { ProfileService } from 'src/app/service/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  users;
  focusedId = 0;

  userRequest = {
    firstName: "",
    middleName: "",
    lastName: ""
  }

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit() {

  }

  search()
  {
    this.getUsers(this.userRequest);
  }

  addCredits(user)
  {

    const {id, creditsToAdd, reference} = user;

    const creditsToAddPayload = {
      "userId": id,
      "creditsToAdd": creditsToAdd,
      "reference": reference
    }

    this.adminService.addCredits(creditsToAddPayload).subscribe(result=>{
      alert("Credits Added Successfully");
      this.getUsers(this.userRequest);

    }, error=>{
      alert(error.error.message);
    })
  }

  viewProfile(user) {
    this.router.navigate(["userProfile/" + user])
  }

  getUsers(data)
  {

    if(data.firstName!=""){
      data.firstName = "%"+data.firstName+"%";
    }

    if(data.middleName!=""){
      data.middleName = "%"+data.middleName+"%";
    }

    if(data.lastName!=""){
      data.lastName = "%"+data.lastName+"%";
    }

    this.adminService.getAllUser4Admin(data).subscribe((result:any)=>{

      this.users = result.content

    }, error=>{

    })

  }

}
