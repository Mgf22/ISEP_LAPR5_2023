import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PisoService } from '../../../service/piso/piso.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-piso-update',
  templateUrl: './piso-update.component.html',
  styleUrls: ['./piso-update.component.css']
})
export class PisoUpdateComponent implements OnInit {

  piso = { designacao: "", descricao: "", edificio: "" };
  edificios: string[] = [];
  pisos: string[] = [];

  constructor(
    private location: Location,
    private pisoService: PisoService,
    private edificioService: EdificioService,
    private messageService: MessageService
  ) {
    this.edificioService.getEdificios().subscribe(edificios => this.edificios = edificios.map(edificio => edificio.codigoEdificio));
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
    this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
  }

  updatePiso() {
    let errorOrSuccess: any = this.pisoService.updatePiso(this.piso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
       alert("Success piso update!");
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