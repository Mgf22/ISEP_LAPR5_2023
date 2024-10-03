import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import { Aprovacao } from '../../../model/aprovacao';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-tarefa-gestao-requisicao',
  templateUrl: './tarefa-gestao-requisicao.component.html',
  styleUrls: ['./tarefa-gestao-requisicao.component.css']
})
export class TarefaGestaoRequisicaoComponent {

  displayedColumns: string[] = ['tipoDispositivo', 'requisitante', 'estado', 'tarefa', 'Resposta'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aprovacaoService: AprovacaoService, private location: Location, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  last = false;


  loadPendingRequests(): void {
    if(this.last){
      const a : Aprovacao[] = [];
      this.dataSource = new MatTableDataSource(a);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      return;
    }
    this.aprovacaoService.getAprovacao().subscribe(utentes => {
      this.last = false;
      if(utentes.length == 1)
        this.last = true;
      this.dataSource = new MatTableDataSource(utentes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  listAprovacao() {
    let errorOrSuccess : any = this.aprovacaoService.getAprovacao();
    errorOrSuccess.subscribe(
      (aprovacao : any) => {/*
        this.dataSource = new MatTableDataSource(aprovacao);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;*/
        this.loadPendingRequests();
      },
      (error : any) => {
        alert(error.error); 
      });
  }
  
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  aceitarRequisicao(aprovacao: Aprovacao): void {
    this.aprovacaoService.aceitarRequisicao(aprovacao).subscribe(
      (data: any) => {
        this.showNotification('Requisição aceite!');
        this.loadPendingRequests(); // Refresh data
      },
      (error: any) => {
        console.error('Error:', error);
        this.showNotification('Erro ao aceitar tarefa: ' + error);
      }
    );
  }

  recusarRequisicao(aprovacao: Aprovacao): void {
    this.aprovacaoService.recusarRequisicao(aprovacao).subscribe(
      (data: any) => {
        this.showNotification('Requisição recusada!');
        this.loadPendingRequests(); // Refresh data
      },
      (error: any) => {
        this.showNotification('Erro ao recusar tarefa: ' + error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-success', 'mat-elevation-z6'], // Optional: Add custom styling classes
    });
  }
}