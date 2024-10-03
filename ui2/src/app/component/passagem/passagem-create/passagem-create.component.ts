import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PassagemService } from '../../../service/passagem/passagem.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { Edificio } from '../../../model/edificio';
import { Subscription } from 'rxjs';
import { PisoService } from '../../../service/piso/piso.service';
@Component({
  selector: 'app-passagem-create',
  templateUrl: './passagem-create.component.html',
  styleUrls: ['./passagem-create.component.css']
})
export class PassagemCreateComponent implements OnInit {

  passagem = { designacao: "", edificioA: "", edificioB: "", pisoA: "", pisoB: "" };
  edificios: string[] = [];
  pisos: string[] = [];

  constructor(
    private location: Location,
    private passagemService: PassagemService,
    private edificioService: EdificioService,
    private pisoService: PisoService,
    private messageService: MessageService
  ) {
    this.edificioService.getEdificios().subscribe(edificios => this.edificios = edificios.map(edificio => edificio.codigoEdificio));
    this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  createPassagem() {
    let errorOrSuccess: any = this.passagemService.createPassagem(this.passagem);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Passagem criada");
      },

      (error: any) => {
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}