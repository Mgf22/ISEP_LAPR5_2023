import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-passagem-geral',
    templateUrl: "./passagem-geral.component.html",
    styleUrls : ['./passagem-geral.component.css']
})

export class PassagemGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}