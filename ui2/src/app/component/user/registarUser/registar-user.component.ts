import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { UserService } from '../../../service/user/user.service';
import { RoleService } from '../../../service/role/role.service';
import { Role } from '../../../model/role';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-registar-user',
  templateUrl: './registar-user.component.html',
  styleUrls: ['./registar-user.component.css']
})
export class RegistarUserComponent implements OnInit {

  user = {name: "", email: "", phoneNumber: "", password:"", roleId:0}
  roles: Role[] = [];

  constructor(
    private location: Location,
    private userService: UserService,
    private roleService : RoleService,
    private snackBar: MatSnackBar
  ) { 
    this.roleService.getAllRoles().subscribe(roles => this.roles = roles.filter(role => role.name !== 'Utente'));
  }

  ngOnInit(): void {
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  criarUser() {
    let errorOrSuccess: any = this.userService.criarUser(this.user);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.showNotification("User criado");
      },

      (error: any) => {
        this.showNotification("Falha na criação do User!");
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
  
  goBack(): void {
    this.location.back();
  }
}