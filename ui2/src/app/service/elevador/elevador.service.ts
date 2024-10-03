import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Elevador } from '../../model/elevador';

@Injectable({
  providedIn: 'root'
})
export class ElevadorService {
  private LogisticAPI_URL = 'http://localhost:3000/api/elevador';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createElevador(elevador: Elevador) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token")};
    
    const body = JSON.stringify(elevador);
    console.log(body);

    return this.http.post<Elevador>(this.LogisticAPI_URL + "/createElevador", body, {'headers':headers , observe: 'response'})

  }

  getElevadores(): Observable<Elevador[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const elevadores = this.http.get<Elevador[]>(this.LogisticAPI_URL+ "/listElevadores", {headers});

    return elevadores;
  }

  listElevadoresEdificio(codigoEdificio: string): Observable<Elevador[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const listElevadoresEdificio = this.LogisticAPI_URL + "/listElevadoresEdificio/" +codigoEdificio;
    const elevadores =  this.http.get<Elevador[]>(listElevadoresEdificio, {headers});
    return elevadores;
}
/*
  getTruckByID(idNumber: string): Observable<Truck> {
    const truckById = this.LogisticAPI_URL + "/" + idNumber;
    const truck = this.http.get<Truck>(truckById)!;
 
    return truck;
  }

    getTruckByDistance(name: string): Observable<Truck[]> {
        const truckByName = this.LogisticAPI_URL + "/name/" + name;
        const truck = this.http.get<Truck[]>(truckByName)!;

        return truck;
    }
    */

    updateElevador(elevador: Elevador) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json',
        'authorization': 'Bearer '+ localStorage.getItem("token") };

        const body = JSON.stringify(elevador);
        console.log(body);
       return this.http.put<Elevador>(updateURL + "/updateElevador", body, { 'headers': headers, observe: 'response' })
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
