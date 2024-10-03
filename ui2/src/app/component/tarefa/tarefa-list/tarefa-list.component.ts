import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import { Aprovacao } from '../../../model/aprovacao';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.component.html',
  styleUrls: ['./tarefa-list.component.css']
})
export class TarefaListComponent implements OnInit{
  @Input() utente: string = '';
  @Input() tipoDispositivo: string = '';
  selectOption: number = 0;
  requisicao = {estado: ""};
  options = ["aceite", "não aceite", "pendente", "executado"];
  
  displayedColumns: string[] = ['tipoDispositivo', 'requisitante', 'estado', 'tarefa'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(
    private aprovacaoService: AprovacaoService, 
    private location: Location, 
    private _liveAnnouncer: LiveAnnouncer,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
  ) { }
  @Output() finalMessage: string ='';
  ngOnInit(): void {
  }
  
  tarefaEstado(){
    this.selectOption = 1;
  }
  tarefaUtente(){
    this.selectOption = 2;
  }
  tarefaTipoDispositivo(){
    this.selectOption = 3;
  }

  listAprovacaoEstado() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoEstado(this.requisicao.estado);
    errorOrSuccess.subscribe(
      aprovacao => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.messageService.add(error.error);
        this.finalMessage = error.error;
        this.showNotification('Erro ao listar tarefa!');
        alert(error.error);
      });
  }
  
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-success', 'mat-elevation-z6'], // Optional: Add custom styling classes
    });
  }
  
  listAprovacaoUtente() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoUtente(this.utente);
    errorOrSuccess.subscribe(
      aprovacao => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.messageService.add(error.error);
        this.finalMessage = error.error;
        this.showNotification('Erro ao listar tarefa!');
        alert(error.error);
      });
  }
  
  listAprovacaoTipoDispositivo() {
    let errorOrSuccess = this.aprovacaoService.getAprovacaoTipoDispositivo(this.tipoDispositivo);
    errorOrSuccess.subscribe(
      (aprovacao: Aprovacao[]) => {
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        this.messageService.add(error.error);
        this.finalMessage = error.error;
        this.showNotification('Erro ao listar tarefa!');
        alert(error.error);
      });
  }

  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  goBack(): void {
    this.location.back();
  }
}