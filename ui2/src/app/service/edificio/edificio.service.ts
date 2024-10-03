import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Edificio } from '../../model/edificio';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {
  private LogisticAPI_URL = 'http://localhost:3000/api/edificio';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createEdificio(edificio: Edificio) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*', // Este cabeçalho pode ser ajustado conforme necessário
  };
    
    const body = JSON.stringify(edificio);
    console.log(body);
    return this.http.post<Edificio>(this.LogisticAPI_URL + "/createEdificio", body, {'headers':headers , observe: 'response'})

  }

  getEdificios(): Observable<Edificio[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const edificios = this.http.get<Edificio[]>(this.LogisticAPI_URL+ "/listEdificios", {headers});

    return edificios;
  }

  listMinMax(min: string, max: string): Observable<Edificio[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const listEdificiosMinMax = this.LogisticAPI_URL + "/listMinMax/" + min+ "/" +max;
    console.log(listEdificiosMinMax);
    const pisos = this.http.get<Edificio[]>(listEdificiosMinMax, {headers})!;
    return pisos;
}

    updateEdificio(edificio: Edificio) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json',
        'authorization': 'Bearer '+ localStorage.getItem("token") };

        const body = JSON.stringify(edificio);
        console.log(body);
       return this.http.put<Edificio>(updateURL + "/updateEdificio", body, { 'headers': headers, observe: 'response' })
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
