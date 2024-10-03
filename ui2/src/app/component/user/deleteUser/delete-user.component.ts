import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(
    private location: Location,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private messageService: MessageService,
  ) { 
  }

  ngOnInit(): void {
  }

  deleteUser() {
    let errorOrSuccess: any = this.userService.deleteUser();
    errorOrSuccess.subscribe(
      (data: any) => {
        this.showNotification("User Eliminado!");
        this.automaticallyRefresh();
      },

      (error: any) => {
        this.showNotification('Falha ao eliminar User');
      }
    );

    return errorOrSuccess;
  }
  
  showNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Adjust the duration as needed
      horizontalPosition: 'center', // Position of the snackbar
      verticalPosition: 'top',
      panelClass: ['snackbar-success', 'mat-elevation-z6'], // Optional: Add custom styling classes
    });
  }
  
  automaticallyRefresh(){
    window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }
}