import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MessagesComponent } from './component/messages/messages.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './component/appcomponent/app.component';
import { AboutUsComponent } from './component/info/aboutus/aboutus.component';
import { EdificioGeralComponent } from './component/edificio/edificio-geral/edificio-geral.component';
import { EdificioCreateComponent } from './component/edificio/edificio-create/edificio-create.component';
import { EdificioListComponent } from './component/edificio/edificio-list/edificio-list.component';
import { EdificioUpdateComponent } from './component/edificio/edificio-update/edificio-update.component';

import { TarefaGeralComponent } from './component/tarefa/tarefa-geral/tarefa-geral.component';
import { TarefaCreateComponent } from './component/tarefa/tarefa-create/tarefa-create.component';
import { TipoRoboGeralComponent } from './component/tipo-robo/tipo-robo-geral/tipo-robo-geral.component';
import { TipoRoboCreateComponent } from './component/tipo-robo/tipo-robo-create/tipo-robo-create.component';
import { TipoRoboListComponent } from './component/tipo-robo/tipo-robo-list/tipo-robo-list.component';
import { TipoRoboUpdateComponent } from './component/tipo-robo/tipo-robo-update/tipo-robo-update.component';
import { RoboGeralComponent } from './component/robo/robo-geral/robo-geral.component';
import { RoboCreateComponent } from './component/robo/robo-create/robo-create.component';
import { RoboListComponent } from './component/robo/robo-list/robo-list.component';
import { RoboUpdateComponent } from './component/robo/robo-update/robo-update.component';
import { RoboInhibitComponent } from './component/robo/robo-inhibit/robo-inhibit.component';

//Tarefa

//Piso
import { PisoCreateComponent } from './component/piso/piso-create/piso-create.component';
import { PisoGeralComponent } from './component/piso/piso-geral/piso-geral.component';
import { PisoListComponent } from './component/piso/piso-list/piso-list.component';
import { PisoUpdateComponent } from './component/piso/piso-update/piso-update.component';

//Passagem
import { PassagemGeralComponent } from './component/passagem/passagem-geral/passagem-geral.component';
import { PassagemCreateComponent } from './component/passagem/passagem-create/passagem-create.component';

//Elevador
import { ElevadorUpdateComponent } from './component/elevador/elevador-update/elevador-update.component';
import { ElevadorGeralComponent } from './component/elevador/elevador-geral/elevador-geral.component';
import { ElevadorListComponent } from './component/elevador/elevador-list/elevador-list.component';
import { ElevadorCreateComponent } from './component/elevador/elevador-create/elevador-create.component';
import { LoginComponent } from './component/login/login.component';
import { MapaPisoCreateComponent } from './component/mapa-piso/mapa-piso-create/mapa-piso-create.component';
import { MapaPisoUpdateComponent } from './component/mapa-piso/mapa-piso-update/mapa-piso-update.component';
import { MainMenuComponent } from './component/main-menu/main-menu.component';
import { PassagemListComponent } from './component/passagem/passagem-list/passagem-list.component';
import { PassagemUpdateComponent } from './component/passagem/passagem-update/passagem-update.component';
import { SalaCreateComponent } from './component/sala/sala-create/sala-create.component';
import { PlanningComponent } from './component/planeamento/planning.component';
import { VisualizacaoComponent } from './component/visualizacao/visualizacao.component';
import { MbcoComponent } from './component/asist/mbco/mbco.component';
import { RgpdComponent } from './component/info/rgpd/rgpd.component';
import { BackupComponent } from './component/asist/backup/backup.component';
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


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatCheckboxModule
    
  ],
  declarations: [
    AppComponent,
    MessagesComponent,

    //Edificio
    EdificioGeralComponent,
    EdificioCreateComponent,
    EdificioListComponent,
    EdificioUpdateComponent,

    //Tarefa
    TarefaGeralComponent,
    TarefaCreateComponent,
    TarefaGestaoRequisicaoComponent,
    TarefaNaoAprovadaComponent,
    TarefaListComponent,
    SequenciaTarefasComponent,

    //TipoRobo
    TipoRoboGeralComponent,
    TipoRoboCreateComponent,
    TipoRoboListComponent,
    TipoRoboUpdateComponent,

    //Robo
    RoboGeralComponent,
    RoboCreateComponent,
    RoboListComponent,
    RoboUpdateComponent,
    RoboInhibitComponent,

    //Piso
    PisoGeralComponent,
    PisoListComponent,
    PisoCreateComponent,
    PisoUpdateComponent,

    //Passagem
    PassagemGeralComponent,
    PassagemCreateComponent,
    PassagemListComponent,
    PassagemUpdateComponent,

    //Elevador
    ElevadorGeralComponent,
    ElevadorUpdateComponent,
    ElevadorListComponent,
    ElevadorCreateComponent,

    //Sala
    SalaCreateComponent,

    //MapaPiso
    MapaPisoCreateComponent,
    MapaPisoUpdateComponent,

    LoginComponent,
    AboutUsComponent,
    MainMenuComponent,
    PlanningComponent,
    VisualizacaoComponent,
    MbcoComponent,
    RgpdComponent,
    BackupComponent,

    //User
    RegistarUserComponent,
    PedidoUserComponent,
    SignUpComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    DownloadInfoComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
