import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-tipo-robo-geral',
    templateUrl: "./tipo-robo-geral.component.html",
    styleUrls : ['./tipo-robo-geral.component.css']
})

export class TipoRoboGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}