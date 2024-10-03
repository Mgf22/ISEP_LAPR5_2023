import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-piso-geral',
    templateUrl: "./piso-geral.component.html",
    styleUrls : ['./piso-geral.component.css']
})

export class PisoGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}