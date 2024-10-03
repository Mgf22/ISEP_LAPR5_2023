import { Component, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Edificio } from '../../../model/edificio';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-edificio-list',
  templateUrl: './edificio-list.component.html',
  styleUrls: ['./edificio-list.component.css']
})
export class EdificioListComponent {
  @Input() min: string = '';
  @Input() max: string = '';
  selectOption: number = 0;

  displayedColumns: string[] = ['Codigo', 'Dimensao Maxima Piso', 'Descricao', 'Nome Opcional'];
  dataSource: MatTableDataSource<Edificio> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private edificioService: EdificioService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit(): void {
  }

  listEdificios() {
    this.selectOption = 1;
    let errorOrSuccess = this.edificioService.getEdificios();
    errorOrSuccess.subscribe(
      edificios => {
        this.dataSource = new MatTableDataSource(edificios);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert(error.error);
      });
  }

  listMinMax() {
    this.selectOption = 2;
  }

  submitMinMax() {
    this.edificioService.listMinMax(this.min, this.max)
      .subscribe(edificios => {
        this.dataSource = new MatTableDataSource(edificios);
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