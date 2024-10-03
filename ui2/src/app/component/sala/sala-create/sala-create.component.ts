import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { PisoService } from '../../../service/piso/piso.service';
import { SalaService } from '../../../service/sala/sala.service';
@Component({
  selector: 'app-sala-create',
  templateUrl: './sala-create.component.html',
  styleUrls: ['./sala-create.component.css']
})
export class SalaCreateComponent implements OnInit {

  sala = { descricao: "", categoria: "", designacao: "", piso: "" }
  pisos: string[] = [];

  constructor(
    private location: Location,
    private pisoService: PisoService,
    private salaService: SalaService,
    private messageService: MessageService
  ) {
    this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao));
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  createSala() {
    let errorOrSuccess: any = this.salaService.createSala(this.sala);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Sala criada");
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