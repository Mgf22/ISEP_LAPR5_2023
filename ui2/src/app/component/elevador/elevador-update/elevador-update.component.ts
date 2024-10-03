import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { ElevadorService } from '../../../service/elevador/elevador.service';
import { PisoService } from '../../../service/piso/piso.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { Elevador } from '../../../model/elevador';
@Component({
  selector: 'app-edificio-update',
  templateUrl: './elevador-update.component.html',
  styleUrls: ['./elevador-update.component.css']
})
export class ElevadorUpdateComponent implements OnInit {

  edificios: string[] = [];
  pisos: string[] = [];
  elevadores: string[] = [];
  elevador = {numeroIdentificativo: "", descricao: "", numeroSerie: "",  modelo:"", marca: "", pisosServidos: [""], edificio: ""};

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


  @Output() finalMessage: string ='';


  ngOnInit(): void {
    this.elevadorService.getElevadores().subscribe(elevadores => this.elevadores = elevadores.map(elevador => elevador.numeroIdentificativo));
  }

  updateElevador() {
    let errorOrSuccess: any = this.elevadorService.updateElevador(this.elevador);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success elevador update!");
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