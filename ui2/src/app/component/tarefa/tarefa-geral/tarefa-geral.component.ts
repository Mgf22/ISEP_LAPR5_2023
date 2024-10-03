import { Component, OnInit } from "@angular/core";
import { Location } from '@angular/common';

@Component({
    selector: 'app-tarefa-geral',
    templateUrl: "./tarefa-geral.component.html",
    styleUrls : ['./tarefa-geral.component.css']
})

export class TarefaGeralComponent  implements OnInit{

    constructor( private location : Location){

    }

  ngOnInit(): void{
  }

  goBack(): void {
    this.location.back();
  }
}