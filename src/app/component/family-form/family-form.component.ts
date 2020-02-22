import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-family-form',
  templateUrl: './family-form.component.html',
  styleUrls: ['./family-form.component.css']
})
export class FamilyFormComponent implements OnInit {


  relations=[];

  constructor() { }

  ngOnInit() {

    this.relations.push({
      "title":"Mr.",
      "firstName":"Chandrakant",
      "middleName":"Sannveerbhadrappa",
      "lastName":"Maniyal",
      "relation":"Father",
      "profession":"Business",
      "additionalDesc":"Owns a land in Belgaum"
    })

  }

}
