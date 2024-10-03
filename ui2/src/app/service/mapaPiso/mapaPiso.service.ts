import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapaPiso } from '../../model/mapaPiso';
import { SolucaoCaminho } from '../../model/solucaoCaminho';
import { CaminhoEntrePisos } from '../../model/caminhoEntrePisos';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MapaPisoService {
  private LogisticAPI_URL = 'http://localhost:3000/api/mapaPiso';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createMapaPiso(mapaPiso: MapaPiso) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token"),
    'Access-Control-Allow-Origin': '*', // Este cabeçalho pode ser ajustado conforme necessário
  };
    
    const body = JSON.stringify(mapaPiso);
    console.log(body);

    return this.http.post<MapaPiso>(this.LogisticAPI_URL + "/createMapaPiso", body, {'headers':headers , observe: 'response'})

  }

  getMapasPiso(): Observable<MapaPiso[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const mapas = this.http.get<MapaPiso[]>(this.LogisticAPI_URL+ "/listMapasPiso", {headers});
    return mapas;
  }

  /*
  async getMapaPorPiso(piso: string): Promise<MapaPiso | undefined> {
    const mapas = await this.getMapasPiso().toPromise();
    console.log('Aqui: ' + mapas);
    if(mapas == undefined)
      return;
    return mapas.find(mapa => mapa.piso === piso);
  }
  */

  /*
  getMapaPorPiso(piso: string) : MapaPiso | undefined {
    
    let res;
    this.getMapasPiso().subscribe(mapas => {
      mapas.forEach(mapa => {
        if(mapa.piso === piso){
          res = mapa;
          return;
        }
      })
    });

    return res;
  }*/

  
getMapaPorPiso(piso: string): Observable<MapaPiso | undefined> {
  return this.getMapasPiso().pipe(
    map(mapas => mapas.find(mapa => mapa.piso === piso))
  );
}
  

    updateMapaPiso(mapaPiso: MapaPiso) {

        const updateURL = this.LogisticAPI_URL;

        const headers = { 'content-type': 'application/json',
        'authorization': 'Bearer '+ localStorage.getItem("token") };

        const body = JSON.stringify(mapaPiso);
        console.log(body);
       return this.http.put<MapaPiso>(updateURL + "/updateMapaPiso", body, { 'headers': headers, observe: 'response' })
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  calcularCaminho(caminhoEntrePisos: CaminhoEntrePisos): Observable<SolucaoCaminho> {
    const solucao = this.http.get<SolucaoCaminho>(this.LogisticAPI_URL+ "/caminhoEntrePisos/"+caminhoEntrePisos.origem+"/"+caminhoEntrePisos.destino);
    return solucao;
  }


}
