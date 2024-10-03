import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tarefa } from '../../model/tarefa';
import { Aprovacao } from '../../model/aprovacao';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private LogisticAPI_URL = 'http://localhost:3000/api/tarefaAprovacao';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createTarefa(tarefa: Tarefa) {
    const headers = { 'content-type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem("token") };

    const body = {tarefa: tarefa.requisicao.tarefa, tipoDispositivo: "Polivalente", tipoTarefa: tarefa.tipoTarefa, pontoInicio: tarefa.origem, pontoTermino: tarefa.destino}
    console.log(body);

    return this.http.post<Tarefa>("http://localhost:3500/api/tarefas" + "/requisitar", body, {'headers':headers , observe: 'response'})

  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getTarefas(): Observable<Tarefa[]> {
    const edificios = this.http.get<Tarefa[]>(this.LogisticAPI_URL+ "/listTarefas");

    return edificios;
  }
  
  
  
  


}
