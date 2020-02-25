import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProfileService } from 'src/app/service/profile.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.css']
})
export class FamilyFormComponent implements OnInit {

  @Output() changeTabEvent = new EventEmitter<string>();

  relations=[];
  
  title:string="TITLE_SELECTED";
  firstName:string;
  middleName:string;
  lastName:string;
  relation:string="RELATION_SELECTED";
  profession:string="JOB_TYPE_SELECTED";
  additionalDescription:string;

  relationMap = {
    "RELATION_FATHER":"Father",
    "RELATION_MOTHER":"Mother",
    "RELATION_SIBLING":"Sibling",
    "RELATION_MATERNAL":"Maternal",
    "RELATION_PATERNAL":"Paternal"
  }

  professionMap = {
    "JOB_TYPE_SALARIED":"Salaried",
    "JOB_TYPE_BUSINESS":"Business",
    "JOB_TYPE_PROFESSIONAL":"Professional",
    "JOB_TYPE_RETIRED":"Retired",

  }

  constructor(private profileService: ProfileService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    this.profileService.getFamilyDetails().subscribe(result=>{
      this.spinner.hide();
      
      for(let r of result)
      {
        r.relation = this.relationMap[r.relation]
        r.profession = this.professionMap[r.profession]
        this.relations.push(r)
      }
    },error=>{
      this.spinner.hide()
      console.log(error)
    })
    // this.relations.push({
    //   "title":"Mr.",
    //   "firstName":"Chandrakant",
    //   "middleName":"Sannveerbhadrappa",
    //   "lastName":"Maniyal",
    //   "relation":"Father",
    //   "profession":"Business",
    //   "additionalDesc":"Owns a land in Belgaum"
    // })

    this.resetDefaults();

  }

  addRelation(){
    this.relations.push({
      "title":this.title,
      "firstName":this.firstName,
      "middleName":this.middleName,
      "lastName":this.lastName,
      "relation":this.relation,
      "profession":this.profession,
      "additionalDescription":this.additionalDescription
    })

    this.resetDefaults();

  }

  resetDefaults(){
    this.title="TITLE_SELECTED",
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.relation = "RELATION_SELECTED"
    this.profession = "JOB_TYPE_SELECTED";
    this.additionalDescription = null;

  }

  removeRelation(rel){

    const index: number = this.relations.indexOf(rel);
    if (index !== -1) {
        this.relations.splice(index, 1);
    } 

    this.relations.reduce(rel)
  }

  saveAndNext(){

    let obj= JSON.stringify(this.relations);
    console.log(obj);

    for(let rel of this.relations){
      this.profileService.saveFamilyDetails(rel).subscribe(result=>{
        this.changeTabEvent.emit();
        
      },error=>{
        console.log(error)
      })

    }
   

 
  }

  skipAndNext(){
    this.changeTabEvent.emit();
  }
  
}
