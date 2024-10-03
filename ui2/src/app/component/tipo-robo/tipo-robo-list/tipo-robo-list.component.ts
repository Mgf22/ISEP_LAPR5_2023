import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TipoRobo } from '../../../model/tipoRobo';
import { TipoRoboService } from '../../../service/tipoRobo/tipoRobo.service';

@Component({
  selector: 'app-tipo-robo-list',
  templateUrl: './tipo-robo-list.component.html',
  styleUrls: ['./tipo-robo-list.component.css']
})
export class TipoRoboListComponent {

  displayedColumns: string[] = ['Designacao', 'Marca', 'Modelo', 'Tarefas'];
  dataSource: MatTableDataSource<TipoRobo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private tipoRoboService: TipoRoboService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    this.tipoRoboService.getTipoRobo()
      .subscribe(tiposRobo => {
        this.dataSource = new MatTableDataSource(tiposRobo);
        this.dataSource.paginator = this.paginator;
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