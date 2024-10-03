import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Robo } from '../../../model/robo';
import { RoboService } from '../../../service/robo/robo.service';
@Component({
  selector: 'app-robo-list',
  templateUrl: './robo-list.component.html',
  styleUrls: ['./robo-list.component.css']
})
export class RoboListComponent {

  displayedColumns: string[] = ['Nickname', 'Estado', 'Codigo', 'Marca', 'Numero Serie', 'Tipo Robo'];
  dataSource: MatTableDataSource<Robo> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(private roboService: RoboService, private location: Location, private _liveAnnouncer: LiveAnnouncer) { }

  async ngOnInit(): Promise<void> {
    this.roboService.getRobo()
      .subscribe(robos => {
        this.dataSource = new MatTableDataSource(robos);
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