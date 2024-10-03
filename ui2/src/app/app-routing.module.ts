import { NgModule, ɵsetInjectorProfilerContext } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Edificio
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';

import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';
import { EdificioUpdateComponent } from './component/edificio/edificio-update/edificio-update.component';
import { TarefaCreateComponent } from './component/tarefa/tarefa-create/tarefa-create.component';
import { TarefaGeralComponent } from './component/tarefa/tarefa-geral/tarefa-geral.component';
import { TipoRoboGeralComponent } from './component/tipo-robo/tipo-robo-geral/tipo-robo-geral.component';
import { TipoRoboCreateComponent } from './component/tipo-robo/tipo-robo-create/tipo-robo-create.component';
import { RoboGeralComponent } from './component/robo/robo-geral/robo-geral.component';
import { RoboCreateComponent } from './component/robo/robo-create/robo-create.component';
import { TipoRoboListComponent } from './component/tipo-robo/tipo-robo-list/tipo-robo-list.component';
import { RoboListComponent } from './component/robo/robo-list/robo-list.component';
import { TipoRoboUpdateComponent } from './component/tipo-robo/tipo-robo-update/tipo-robo-update.component';
import { RoboUpdateComponent } from './component/robo/robo-update/robo-update.component';
import { RoboInhibitComponent } from './component/robo/robo-inhibit/robo-inhibit.component';

//Piso
import { PisoGeralComponent } from './component/piso/piso-geral/piso-geral.component';
import { PisoListComponent } from './component/piso/piso-list/piso-list.component';
import { PisoCreateComponent } from './component/piso/piso-create/piso-create.component';
import { PisoUpdateComponent } from './component/piso/piso-update/piso-update.component';

//Passagem
import { PassagemGeralComponent } from './component/passagem/passagem-geral/passagem-geral.component';
import { PassagemCreateComponent } from './component/passagem/passagem-create/passagem-create.component';

//Elevador
import { ElevadorGeralComponent } from './component/elevador/elevador-geral/elevador-geral.component';
import { ElevadorUpdateComponent } from './component/elevador/elevador-update/elevador-update.component';
import { ElevadorListComponent } from './component/elevador/elevador-list/elevador-list.component';
import { ElevadorCreateComponent } from './component/elevador/elevador-create/elevador-create.component';

import { LoginComponent } from './component/login/login.component';
import { MapaPisoCreateComponent } from './component/mapa-piso/mapa-piso-create/mapa-piso-create.component';
import { MapaPisoUpdateComponent } from './component/mapa-piso/mapa-piso-update/mapa-piso-update.component';
import { AboutUsComponent } from './component/info/aboutus/aboutus.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { PassagemListComponent } from './component/passagem/passagem-list/passagem-list.component';
import { PassagemUpdateComponent } from './component/passagem/passagem-update/passagem-update.component';
import { SalaCreateComponent } from './component/sala/sala-create/sala-create.component';
import { PlanningComponent } from './component/planeamento/planning.component';
import { VisualizacaoComponent } from './component/visualizacao/visualizacao.component';
import { MbcoComponent } from './component/asist/mbco/mbco.component';
import { RgpdComponent } from './component/info/rgpd/rgpd.component';
import { BackupComponent } from './component/asist/backup/backup.component';

//User
import { RegistarUserComponent } from './component/user/registarUser/registar-user.component';
import { PedidoUserComponent } from './component/user/pedidoUser/pedido-user.component';
import { SignUpComponent } from './component/user/signUp/sign-up.component';
import { DeleteUserComponent } from './component/user/deleteUser/delete-user.component';
import { UpdateUserComponent } from './component/user/updateUser/update-user.component';
import { DownloadInfoComponent } from './component/user/downloadInfo/download-info.component';
import { TarefaGestaoRequisicaoComponent } from './component/tarefa/tarefa-gestao-requisicao/tarefa-gestao-requisicao.component';
import { TarefaNaoAprovadaComponent } from './component/tarefa/tarefa-nao-aprovada/tarefa-nao-aprovada.component';
import { TarefaListComponent } from './component/tarefa/tarefa-list/tarefa-list.component';
import { SequenciaTarefasComponent } from './component/tarefa/sequencia-tarefas/sequencia-tarefas.component';
import { UtilizadorGuard } from './guard/users.guard';
import { UtenteGuard } from './guard/utentes.guard';
import { TarefaGuard } from './guard/tarefas.guard';
import { FrotaGuard } from './guard/frotas.guard';
import { CampusGuard } from './guard/campus.guard';
import { GeralGuard } from './guard/geral.guard';

const routes: Routes = [

  // Edificio
  { path: 'edificios', component: EdificioGeralComponent },
  { path: 'edificioCreate', component: EdificioCreateComponent },
  { path: 'edificioList', component: EdificioListComponent },
  { path: "edificioUpdate", component: EdificioUpdateComponent },

  //Tarefa
  { path: 'tarefas', component: TarefaGeralComponent },
  { path: 'tarefaCreate', component: TarefaCreateComponent },
  
  //TipoRobo
  { path: 'tiposRobo', component: TipoRoboGeralComponent },
  { path: 'tipoRoboCreate', component: TipoRoboCreateComponent },
  { path: 'tipoRoboUpdate', component: TipoRoboUpdateComponent },
  { path: 'tipoRoboList', component: TipoRoboListComponent },


  //Robo
  { path: "robos", component: RoboGeralComponent },
  { path: "roboCreate", component: RoboCreateComponent },
  { path: "roboList", component: RoboListComponent },
  { path: "roboUpdate", component: RoboUpdateComponent },
  { path: "inhibitRobo", component: RoboInhibitComponent },


  //Piso
  { path: 'pisos', component: PisoGeralComponent },
  { path: 'pisoList', component: PisoListComponent },
  { path: 'pisoCreate', component: PisoCreateComponent },
  { path: "pisoUpdate", component: PisoUpdateComponent },

  //Passagem
  { path: 'passagens', component: PassagemGeralComponent },
  { path: 'passagemCreate', component: PassagemCreateComponent },
  { path: 'passagemList', component: PassagemListComponent },
  { path: 'passagemUpdate', component: PassagemUpdateComponent },

  //Elevador
  { path: 'elevadores', component: ElevadorGeralComponent },
  { path: "elevadorUpdate", component: ElevadorUpdateComponent },
  { path: "elevadorList", component: ElevadorListComponent },
  { path: "elevadorCreate", component: ElevadorCreateComponent },

  //MapaPiso
  //{ path: 'mapasPisos', component: MapaPisoGeralComponent},
  { path: 'mapaPisoCreate', component: MapaPisoCreateComponent },
  { path: 'mapaPisoUpdate', component: MapaPisoUpdateComponent },


  //Tarefa
  { path: 'tarefas', component: TarefaGeralComponent },
  { path: 'tarefaCreate', component: TarefaCreateComponent },
  { path: 'tarefaGestaoRequisicao', component: TarefaGestaoRequisicaoComponent},
  { path: 'listarTarefasNaoAprovadas', component: TarefaNaoAprovadaComponent},
  { path: 'listarTarefas', component: TarefaListComponent},
  { path: 'sequenciaTarefas', component: SequenciaTarefasComponent},
  
  //Sala
  { path: 'salaCreate', component: SalaCreateComponent },

  { path: 'login', component: LoginComponent },
  { path: 'aboutUs', component: AboutUsComponent/*, canActivate: [GeralGuard] */},
  { path: 'mainMenu', component: MainMenuComponent },

  { path: 'planning', component: PlanningComponent },
  { path: 'view', component: VisualizacaoComponent },
  { path: 'mbco', component: MbcoComponent },
  { path: 'rgpd', component: RgpdComponent },
  { path: 'backup', component: BackupComponent },

  //User
  { path: 'criarUser', component: RegistarUserComponent },
  { path: 'pedidoUser', component: PedidoUserComponent },
  { path: 'signUp', component: SignUpComponent },
  { path: 'deleteUser', component: DeleteUserComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'downloadInfo', component: DownloadInfoComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
