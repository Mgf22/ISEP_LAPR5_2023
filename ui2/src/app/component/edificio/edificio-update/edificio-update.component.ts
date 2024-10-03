import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-edificio-update',
  templateUrl: './edificio-update.component.html',
  styleUrls: ['./edificio-update.component.css']
})
export class EdificioUpdateComponent implements OnInit {
  edificios: string[] = [];

  edificio = { codigoEdificio: "", dimensaoMaximaPiso: "", descricaoEdificio: "", nomeOpcionalEdificio: "" }

  constructor(
    private location: Location,
    private edificioService: EdificioService,
    private messageService: MessageService
  ) {
    
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
    this.edificioService.getEdificios().subscribe(edificiosX => this.edificios = edificiosX.map(edificioP => edificioP.codigoEdificio));
  }

  updateEdificio() {
    let errorOrSuccess: any = this.edificioService.updateEdificio(this.edificio);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success edificio update!");
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