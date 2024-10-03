import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-tipo-robo-geral',
    templateUrl: "./robo-geral.component.html",
    styleUrls : ['./robo-geral.component.css']
})

export class RoboGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}