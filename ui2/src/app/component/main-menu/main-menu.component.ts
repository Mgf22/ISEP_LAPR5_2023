import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainMenuService } from '../../service/main-menu/mainMenu.service';
import { UserService } from '../../service/user/user.service';
import { IRole } from '../../model/IRole';

@Component({
  selector: 'app-main.menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  constructor(private router: Router, private userService: UserService,) {}

  ngOnInit(): void {
    this.checkRole();
  }

  role : String = "";

  checkRole(){
    this.userService.getCurrentUserRole().subscribe( (loggedRole : IRole) => {
      console.log('Role: ' + loggedRole.role);
      this.role = loggedRole.role;
    });
  }

  openAboutUs(){
    this.router.navigate(['/aboutUs']);
  }
  //Edificio
  createEdificio(){
    this.router.navigate(['edificioCreate']);
  }
  listEdificios(){
    this.router.navigate(['edificioList']);
  }
  updateEdificio(){
    this.router.navigate(['edificioUpdate']);
  }
  //Piso
  createPiso(){
    this.router.navigate(['pisoCreate']);
  }
  listPisos(){
    this.router.navigate(['pisoList']);
  }
  updatePiso(){
    this.router.navigate(['pisoUpdate']);
  }
  //Passagem
  createPassagem(){
    this.router.navigate(['passagemCreate']);
  }
  listPassagens(){
    this.router.navigate(['passagemList']);
  }
  updatePassagem(){
    this.router.navigate(['passagemUpdate']);
  }
  //Elevador
  createElevador(){
    this.router.navigate(['elevadorCreate']);
  }
  listElevadores(){
    this.router.navigate(['elevadorList']);
  }
  updateElevador(){
    this.router.navigate(['elevadorUpdate']);
  }
  //MapaPiso
  createMapaPiso(){
    this.router.navigate(['mapaPisoCreate']);
  }
  //TipoRobo
  createTipoRobo(){
    this.router.navigate(['tipoRoboCreate']);
  }
  //Robo
  createRobo(){
    this.router.navigate(['roboCreate']);
  }
  listRobos(){
    this.router.navigate(['roboList']);
  }
  inibirRobo(){
    this.router.navigate(['inhibitRobo']);
  }
  updateRobo(){
    this.router.navigate(['updateRobo']);
  }
  //Sala
  createSala(){
    this.router.navigate(['salaCreate']);
  }
  
  //Tarefas
  tarefaCreate(){
    this.router.navigate(['tarefaCreate']);
  }
  
  gerirRequisicao(){
    this.router.navigate(['tarefaGestaoRequisicao']);
  }
  
  listarTarefasNaoAprovadas(){
    this.router.navigate(['listarTarefasNaoAprovadas']);
  }
  listarTarefas(){
    this.router.navigate(['listarTarefas']);
  }
  
  sequenciaTarefas(){
    this.router.navigate(['sequenciaTarefas']);
  } 
  
  //Obter caminho
  calcularCaminho(){
    this.router.navigate(['planning']);
  }

  //Visualizacao
  view(){
    this.router.navigate(['view']);
  }

  mbco(){
    this.router.navigate(['mbco']);
  }

  rgpd(){
    this.router.navigate(['rgpd']);
  }

  backup(){
    this.router.navigate(['backup']);
  }

  criarUser(){
    this.router.navigate(['criarUser']);
  }

  pedidoUser(){
    this.router.navigate(['pedidoUser']);
  }

  deleteUser(){
    this.router.navigate(['deleteUser']);
  }

  updateUser(){
    this.router.navigate(['updateUser']);
  }

  downloadInfo(){
    this.router.navigate(['downloadInfo']);
  }

  logout(){
    window.location.reload();
  }
}
