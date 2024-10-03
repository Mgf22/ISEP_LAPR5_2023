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
export class MainMenuService {
  private LogisticAPI_URL = 'http://localhost:3000/api/user'; 

  constructor(private http: HttpClient, private messageService: MessageService) { }


}
