import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-edificio-create',
  templateUrl: './edificio-create.component.html',
  styleUrls: ['./edificio-create.component.css']
})
export class EdificioCreateComponent implements OnInit {

  edificio = {codigoEdificio: "", dimensaoMaximaPiso: "", descricaoEdificio: "",  nomeOpcionalEdificio:""}

  constructor(
    private location: Location,
    private EdificioService: EdificioService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createEdificio() {
    let errorOrSuccess: any = this.EdificioService.createEdificio(this.edificio);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("Edificio criado");
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