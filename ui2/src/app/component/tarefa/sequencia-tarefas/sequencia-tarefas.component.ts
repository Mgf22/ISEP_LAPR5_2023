import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { Aprovacao } from '../../../model/aprovacao';
import { AprovacaoService } from '../../../service/aprovacao/aprovacao.service';
import ISequencia from '../../../model/ISequencia';

@Component({
  selector: 'app-sequencia-tarefas',
  templateUrl: './sequencia-tarefas.component.html',
  styleUrls: ['./sequencia-tarefas.component.css']
})
export class SequenciaTarefasComponent {

  displayedColumns: string[] = ['designacao', 'pontoInicio', 'pontoTermino'];
  dataSource: MatTableDataSource<Aprovacao> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private aprovacaoService: AprovacaoService, private location: Location) { }

  ngOnInit(): void {
  }

  listSequencia() {
    
    let errorOrSuccess = this.aprovacaoService.gerarSequencia();
    errorOrSuccess.subscribe(
      (sequencia : ISequencia) => {
        window.alert('Plano gerado: ' + sequencia.plano + '\nTempo: ' + sequencia.tempo);
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
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