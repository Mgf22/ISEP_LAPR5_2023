import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passagem } from '../../model/passagem';
import { Piso } from '../../model/piso';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {
  private LogisticAPI_URL = 'http://localhost:3000/api/passagem';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createPassagem(passagem: Passagem) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token")};
    
    const body = JSON.stringify(passagem);
    console.log(body);

    return this.http.post<Passagem>(this.LogisticAPI_URL + "/createPassagem", body, {'headers':headers , observe: 'response'})

  }

  private log(message: string) {
    this.messageService.add(`PassagemService: ${message}`);
  }

  getPassagens(): Observable<Passagem[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const edificios = this.http.get<Passagem[]>(this.LogisticAPI_URL+ "/listPassagens", {headers});

    return edificios;
  }

  updatePassagem(passagem: Passagem) {

    const updateURL = this.LogisticAPI_URL;

    const headers = { 'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token") };

    const body = JSON.stringify(passagem);
    console.log(body);
   return this.http.put<Passagem>(updateURL + "/updatePassagem", body, { 'headers': headers, observe: 'response' })
  }
  
   listPisos(codEdificio: string) : Observable<Piso[]>{
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const listPisos = this.LogisticAPI_URL + "/listPisosPassagens" + codEdificio;
    console.log(listPisos);
    const pisos =  this.http.get<Piso[]>(listPisos, {headers})!;
    return pisos;
   }
}

