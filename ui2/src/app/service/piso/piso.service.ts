import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Piso } from '../../model/piso';

@Injectable({
    providedIn: 'root'
})
export class PisoService {
    private LogisticAPI_URL = 'http://localhost:3000/api/piso';  // URL to web api

    constructor(private http: HttpClient, private messageService: MessageService) { }

    //Metodo para criar piso
    createPiso(piso: Piso) {
        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(piso);
        console.log(body);

        return this.http.post<Piso>(this.LogisticAPI_URL + "/createPiso", body, { 'headers': headers, observe: 'response' })
    }

    //Metodo para listar pisos de um edificio
    listPisos(codigoEdificio: string): Observable<Piso[]> {
        const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
        const listPisosEdificio = this.LogisticAPI_URL + "/listPisos/" +codigoEdificio;
        const pisos =  this.http.get<Piso[]>(listPisosEdificio, {headers});
        return pisos;
    }

    //Metodo para atualizar piso
    updatePiso(piso: Piso) {
        const headers = { 'content-type': 'application/json' };

        const body = JSON.stringify(piso);
        console.log(body);
        return this.http.put<Piso>(this.LogisticAPI_URL + "/updatePiso", body, { 'headers': headers, observe: 'response' })
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    //Metodo para listar pisos geral
    listPisosGeral(): Observable<Piso[]> {
        const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
        const pisos = this.http.get<Piso[]>(this.LogisticAPI_URL + "/listPisosGeral2", {headers: headers});
        return pisos;
    } 

}