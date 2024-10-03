import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { ElevadorService } from '../../../service/elevador/elevador.service';
import { PisoService } from '../../../service/piso/piso.service';
import { Edificio } from '../../../model/edificio';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-elevador-create',
  templateUrl: './elevador-create.component.html',
  styleUrls: ['./elevador-create.component.css']
})
export class ElevadorCreateComponent implements OnInit {

  edificios: string[] = [];
  pisos: string[] = [];
  elevador = { numeroIdentificativo: "", descricao: "", numeroSerie: "", modelo: "", marca: "", pisosServidos: [""], edificio: "" };

  constructor(
    private location: Location,
    private elevadorService: ElevadorService,
    private pisoService: PisoService,
    private edificioService: EdificioService,
    private messageService: MessageService
  ) {
    this.edificioService.getEdificios().subscribe(edificios => this.edificios = edificios.map(edificio => edificio.codigoEdificio));
    }

  submitEdificio(){
    this.pisoService.listPisos(this.elevador.edificio).subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
  
  }

  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  createElevador() {
    let errorOrSuccess: any = this.elevadorService.createElevador(this.elevador);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success elevador creation!");
      },

      (error: any) => {
        //error
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}