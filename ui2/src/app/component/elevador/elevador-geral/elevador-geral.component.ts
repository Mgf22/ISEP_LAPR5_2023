import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-elevador-geral',
    templateUrl: "./elevador-geral.component.html",
    styleUrls : ['./elevador-geral.component.css']
})

export class ElevadorGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}