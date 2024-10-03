import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
import { PedidoService } from '../../../service/pedido/pedido.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  utente = { name: "", email: "", phoneNumber: "", nif: "", password: ""}
  consent=false 
  constructor(
    private snackBar: MatSnackBar,
    private location: Location,
    private pedidoService: PedidoService,
  ) {
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  
  ngOnInit(): void {
  }

  criarUtente() {
    console.log('Aqui: ' + this.consent);
    if (this.consent == false) {
      this.showSnackbar('Consinta com os termos antes de efetuar o pedido.');
      return;
    }

    let errorOrSuccess: any = this.pedidoService.criarPedido(this.utente);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.showNotification("Pedido efetuado com sucesso");
      },

      (error: any) => {
        console.log(error.error);
        this.showNotification(error.error);
      }
    );

    return errorOrSuccess;
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,  // Duration in milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
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
  goBack(): void {
    this.location.back();
  }
}