import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-edificio-geral',
    templateUrl: "./edificio-geral.component.html",
    styleUrls : ['./edificio-geral.component.css']
})

export class EdificioGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}