import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { TarefaService } from '../../../service/tarefa/tarefa.service';
import { SalaService } from '../../../service/sala/sala.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Edificio } from '../../../model/edificio';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { PisoService } from '../../../service/piso/piso.service';
import { Piso } from '../../../model/piso';

@Component({
  selector: 'app-tarefa-create',
  templateUrl: './tarefa-create.component.html',
  styleUrls: ['./tarefa-create.component.css']
})
export class TarefaCreateComponent implements OnInit {

  requisicao = {tipoDispositivo: "", user:"", estado:"pendente", tarefa:""}
  tarefa = {tipoTarefa: "", origem: "", destino: "", requisicao:this.requisicao, remetente: "", destinatario: "", descricao: ""}
  
  options = ["pick up & delivery", "vigilância", "limpeza"];
  
  origens: string[] = [];
  destinos: string[] = [];
  edificios: string[] = [];
  pisoInicials: string[] = []; 
  pisoFinals: string[] = []; 
  
  semDestino = false;
  semDestinatario = false;
  constructor(
    private location: Location,
    private TarefaService: TarefaService,
    private messageService: MessageService,
    private salaService: SalaService,
    private edificioService: EdificioService,
    private pisoService: PisoService,
    private snackBar: MatSnackBar
  ) { 
    this.salaService.getSalas().subscribe(salas => this.origens = salas.map(sala => sala.designacao));
    this.salaService.getSalas().subscribe(salas => this.destinos = salas.map(sala => sala.designacao));
  }


  @Output() finalMessage: string ='';
  
  

  ngOnInit(): void {
  }
  
  showPontoTerminoField(): boolean {
    const cond = this.tarefa.tipoTarefa === this.options[0]
    this.semDestino = cond;
    return cond;
  }
  
  showDestinatarioField(): boolean {
    const cond = this.tarefa.tipoTarefa === this.options[0]
    this.semDestinatario = cond;
    return cond;
  }

  createTarefa() {

    if(!this.semDestino)
      this.tarefa.destino = this.tarefa.origem;
    
    if(!this.semDestinatario)
      this.tarefa.destinatario = this.tarefa.remetente;

    let errorOrSuccess: any = this.TarefaService.createTarefa(this.tarefa);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success tarefa creation!");
        this.finalMessage = "Success tarefa creation!";
        this.showNotification('Tarefa requisitada com sucesso!');
        this.goBack();
      },

      (error: any) => {
        //error
        this.messageService.add(error.error);
        this.finalMessage = error.error;
        this.showNotification('Erro ao requisitar tarefa!');
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-success', 'mat-elevation-z6'], // Optional: Add custom styling classes
    });
  }

}