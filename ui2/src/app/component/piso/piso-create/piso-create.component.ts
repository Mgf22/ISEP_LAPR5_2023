import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { PisoService } from '../../../service/piso/piso.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
@Component({
  selector: 'app-piso-create',
  templateUrl: './piso-create.component.html',
  styleUrls: ['./piso-create.component.css']
})
export class PisoCreateComponent implements OnInit {

  edificios: string[] = [];
  piso = {designacao: "", descricao: "", edificio:""}

  constructor(
    private location: Location,
    private PisoService: PisoService,
    private edificioService: EdificioService,
    private messageService: MessageService
  ) { this.edificioService.getEdificios().subscribe(edificios => this.edificios = edificios.map(edificio => edificio.codigoEdificio));}


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  createPiso() {
    let errorOrSuccess: any = this.PisoService.createPiso(this.piso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success piso creation!");
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