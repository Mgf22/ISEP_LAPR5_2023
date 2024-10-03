import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { Passagem } from '../../../model/passagem';
import { PassagemService } from '../../../service/passagem/passagem.service';
import { Piso } from '../../../model/piso';
@Component({
  selector: 'app-passagem-list',
  templateUrl: './passagem-list.component.html',
  styleUrls: ['./passagem-list.component.css']
})
export class PassagemListComponent {

  //passagem
  displayedColumns: string[] = ['Designacao', 'EdificioA', 'EdificioB', 'PisoA','PisoB'];
  dataSource: MatTableDataSource<Passagem> = new MatTableDataSource();
  
  //pisos com passagens
  displayedColumns2: string[] = ['Descricao', 'Designacao', 'Edificio'];
  dataSource2: MatTableDataSource<Piso> = new MatTableDataSource();
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private passagemService: PassagemService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
    this.listPassagens();
  }
  selectOption: number = 0;
  codEdificio: string = '';
  listPassagens() {
  this.selectOption = 1;
    let errorOrSuccess = this.passagemService.getPassagens();
    errorOrSuccess.subscribe(
      passagens => {
        this.dataSource = new MatTableDataSource(passagens);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        alert(error.error);
      });
  }
  listPisos(){
    this.selectOption = 2;
  }
  
  submitCodigo(){
    this.passagemService.listPisos(this.codEdificio)
      .subscribe(pisos => {
        this.dataSource2 = new MatTableDataSource(pisos);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      (error: any) => {
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