import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Pedido } from '../../../model/pedido';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../../../service/pedido/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pedido-user',
  templateUrl: './pedido-user.component.html',
  styleUrls: ['./pedido-user.component.css']
})
export class PedidoUserComponent implements OnInit {

  displayedColumns: string[] = ['Name', 'Email', 'Numero de telemovel', 'NIF', 'Estado', 'Data Pedido', 'Resposta'];
  dataSource: MatTableDataSource<Pedido> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  
  constructor(private location: Location,private pedidoService: PedidoService, private snackBar: MatSnackBar) { 
  }

  async ngOnInit(): Promise<void> {
    this.loadPendingRequests();
  }


  loadPendingRequests(): void {
    this.pedidoService.getPedidosPendentes().subscribe(utentes => {
      this.dataSource = new MatTableDataSource(utentes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  aceitarPedido(pedido: Pedido){
    let errorOrSuccess: any = this.pedidoService.aprovarPedido(pedido);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.showNotification("Pedido aceite");
        this.loadPendingRequests(); // Refresh the table after accepting the request
      },

      (error: any) => {
        this.showNotification("Falha na aceitação do pedido!");
      }
    );
  }

  recusarPedido(pedido: Pedido){
    let errorOrSuccess: any = this.pedidoService.recusarPedido(pedido);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.showNotification("Pedido recusado");
        this.loadPendingRequests(); // Refresh the table after accepting the request
      },

      (error: any) => {
        this.showNotification("Falha ao recusar o pedido!");
      }
    );
  }
  
  showNotification(message: string): void {
      this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-success', 'mat-elevation-z6'], // Optional: Add custom styling classes
    });
  }
  
  filterData($event: any) {
    this.dataSource.filter = $event.target.value;
  }

  goBack(): void {
    this.location.back();
  }
}