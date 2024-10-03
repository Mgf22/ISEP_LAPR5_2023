import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from '../message/message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../../model/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private LogisticAPI_URL = 'http://localhost:3000/api/roles';  // URL to web api

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getAllRoles(): Observable<Role[]> {
    const headers = {'authorization': 'Bearer '+ localStorage.getItem("token")};
    const roles= this.http.get<Role[]>(this.LogisticAPI_URL+ "/getAllRoles", {headers});

    return roles;
  }
}
