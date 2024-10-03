import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Robo } from '../../model/robo';

@Injectable({
  providedIn: 'root'
})
export class RoboService {
  private LogisticAPI_URL = 'http://localhost:3000/api/robo';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRobo(robo: Robo) {
    const headers = {'content-type': 'application/json',
    'authorization': 'Bearer '+ localStorage.getItem("token")};
    
    const body = JSON.stringify(robo);
    console.log(body);

    return this.http.post<Robo>(this.LogisticAPI_URL + "/createRobo", body, {'headers':headers , observe: 'response'})

  }

  getRobo(): Observable<Robo[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    return this.http.get<Robo[]>(this.LogisticAPI_URL+ "/listRobos",  {headers});
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

    updateRobo(robo: Robo) {

        const headers = { 'content-type': 'application/json' ,
        'authorization': 'Bearer '+ localStorage.getItem("token")};

        const body = JSON.stringify(robo);
        console.log(body);
       return this.http.put<Robo>(this.LogisticAPI_URL + "/updateRobo", body, { 'headers': headers, observe: 'response' })
    }

    inhibitRobo(codigo: string){
      const headers = { 'content-type': 'application/json',
      'authorization': 'Bearer '+ localStorage.getItem("token")};
      const body = JSON.stringify({codigo: codigo});
      return this.http.patch<Robo>(this.LogisticAPI_URL + "/inhibitRobo", body, { 'headers': headers, observe: 'response' });
    }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }


}
