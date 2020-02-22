import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-educational-form',
  templateUrl: './educational-form.component.html',
  styleUrls: ['./educational-form.component.css']
})
export class EducationalFormComponent implements OnInit {

  qualification:string="QUALIFICATION_SELECT"

  constructor() { }

  ngOnInit() {
  }

}
