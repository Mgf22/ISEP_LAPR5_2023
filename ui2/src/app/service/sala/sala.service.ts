import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sala } from '../../model/sala';
import { Piso } from '../../model/piso';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private LogisticAPI_URL = 'http://localhost:3000/api/sala';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createSala(sala: Sala) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*', // Este cabeçalho pode ser ajustado conforme necessário
  };
    
    const body = JSON.stringify(sala);
    console.log(body);
    return this.http.post<Sala>(this.LogisticAPI_URL + "/createSala", body, {'headers':headers , observe: 'response'})

  }
  
  getSalasPiso(pisoInicial: string): Observable<Sala[]> {
    //const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const body = {pisoInicial}
    const salas = this.http.get<Sala[]>(this.LogisticAPI_URL+ "/listSalasPiso" + pisoInicial);

    return salas;
  }
  
  getSalas(): Observable<Sala[]> {
    //const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const salas = this.http.get<Sala[]>(this.LogisticAPI_URL+ "/listSalas");

    return salas;
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}