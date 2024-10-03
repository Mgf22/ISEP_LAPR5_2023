import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../service/user/user.service';
import { User } from '../../../model/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
}) 
export class UpdateUserComponent implements OnInit {

  utente = { name: "", phoneNumber: "", nif: "", password: ""}
  data : User

  constructor(
    private location: Location,
    private userService: UserService,
  ) {
  }
  
  ngOnInit(): void {
    this.getUserInfo(); 
  }

  getUserInfo() : void {
    let userinfo : any = this.userService.getUserInfo();
    userinfo.subscribe(
      (user: User) => {  
          this.data = user;
          this.utente.name = user.Name;
          this.utente.phoneNumber = user.PhoneNumber;
          this.utente.nif = user.NIF;
      },
      (error: any) => { 
        alert("Não foi possível retornar a infomração do User!");
      }
    );
  }

  updateUser() {
    let errorOrSuccess: any = this.userService.atualizarUser(this.utente);
    errorOrSuccess.subscribe(
      (data: any) => {
        alert("User atualizado com sucesso");
      },

      (error: any) => {
        alert("Erro! Não foi possível atualizar o User!");
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}