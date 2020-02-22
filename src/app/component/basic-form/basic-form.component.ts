import { Component, OnInit, Output,EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  saveAndNext(){
    
    this.changeTabEvent.emit("personal");
  }

}
