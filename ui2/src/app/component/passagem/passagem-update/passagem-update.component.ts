import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PassagemService } from '../../../service/passagem/passagem.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { PisoService } from '../../../service/piso/piso.service';
@Component({
  selector: 'app-passagem-update',
  templateUrl: './passagem-update.component.html',
  styleUrls: ['./passagem-update.component.css']
})
export class PassagemUpdateComponent implements OnInit {
  passagens: string[] = [];
  edificios: string[] = [];
  pisos: string[] = [];

  passagem = { designacao: "", edificioA: "", edificioB: "", pisoA: "",pisoB:"" };

  constructor(
    private location: Location,
    private passagemService: PassagemService,
    private edificioService: EdificioService,
    private pisoService: PisoService
  ) {
    this.passagemService.getPassagens().subscribe(passagens => this.passagens = passagens.map(passagem => passagem.designacao));
    this.edificioService.getEdificios().subscribe(edificios => this.edificios = edificios.map(edificio => edificio.codigoEdificio));
    this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  updatePassagem() {
    let errorOrSuccess: any = this.passagemService.updatePassagem(this.passagem);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success passagem update!");
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