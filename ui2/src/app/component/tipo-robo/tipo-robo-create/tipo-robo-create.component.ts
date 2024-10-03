import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { TipoRoboService } from '../../../service/tipoRobo/tipoRobo.service';
import { TarefaService } from '../../../service/tarefa/tarefa.service';
@Component({
  selector: 'app-tipo-robo-create',
  templateUrl: './tipo-robo-create.component.html',
  styleUrls: ['./tipo-robo-create.component.css']
})
export class TipoRoboCreateComponent implements OnInit {

  tipoRobo = { tarefas: [], designacao: "", marca: "", modelo: "" };
  tarefas: string[] = [];

  constructor(
    private location: Location,
    private TipoRoboService: TipoRoboService,
    private messageService: MessageService,
    private tarefaService: TarefaService
  ) { this.tarefaService.getTarefas().subscribe(tarefas => this.tarefas = tarefas.map(tarefa => tarefa.tipoTarefa)); }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  createTipoRobo() {
    let errorOrSuccess: any = this.TipoRoboService.createTipoRobo(this.tipoRobo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success Tipo Robo creation!");
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