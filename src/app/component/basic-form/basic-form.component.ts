import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css']
})
export class BasicFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  firstName:string;
  middleName:string;
  lastName:string;
  contact:number;
  email:string;
  focus;
  focus1;


  constructor(private profileService: ProfileService) { }

  ngOnInit() {

    this.profileService.getUserBasicDetails().subscribe(result=>{
      this.firstName = result["firstName"]!=""?result["firstName"]:null;
      this.lastName = result["lastName"]!=""?result["lastName"]:null;
      this.middleName = result["middleName"]!=""?result["middleName"]:null;

      this.contact = result["contact"]!=""?result["contact"]:null;
      this.email = result["email"]!=""?result["email"]:null;
    },error=>{
      console.log(error)
    })

  }

  saveAndNext(){

    let obj = {
      "firstName":this.firstName,
      "lastName":this.lastName,
      "middleName": this.middleName,
      "contact": this.contact,
      "email": this.email
    }

    this.profileService.saveBasicDetails(obj).subscribe(result=>{
      this.changeTabEvent.emit();
      console.log(result);
    },error=>{
      console.log(error);
    })


  }

  skipAndNext(){
     this.changeTabEvent.emit();
  }

}
