import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { ElevadorService } from '../../../service/elevador/elevador.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
import { Elevador } from '../../../model/elevador';
@Component({
  selector: 'app-elevador-list',
  templateUrl: './elevador-list.component.html',
  styleUrls: ['./elevador-list.component.css']
})
export class ElevadorListComponent {
  @Input() codigoEdificio: string = '';

  displayedColumns: string[] = ['Numero Identificativo', 'Descricao', 'Numero Serie','Modelo','Marca','Pisos Servidos','Edificio'];
  dataSource: MatTableDataSource<Elevador> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private elevadorService: ElevadorService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }
  
  
  ngOnInit(): void {
  }

  listElevadores() {
    this.elevadorService.listElevadoresEdificio(this.codigoEdificio)
        .subscribe(elevadores => {
          this.dataSource = new MatTableDataSource(elevadores);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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