import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ElevadorService } from '../../service/elevador/elevador.service';
import { PassagemService } from '../../service/passagem/passagem.service';
import { MapaPisoService } from '../../service/mapaPiso/mapaPiso.service';
import { SalaService } from '../../service/sala/sala.service';
import { SolucaoCaminho } from '../../model/solucaoCaminho';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {

  selectedType: string;
  selectedType2: string;
  salas: string[] = [];
  elevadores: string[] = [];
  corredores: string[] = [];
  caminhoEntrePisos = { origem: "", destino: "" };
  resultMessage : string[] = [];

  constructor(
    private location: Location,
    private salaService: SalaService,
    private corredorService: PassagemService,
    private elevadorService: ElevadorService,
    private mapaPisoService: MapaPisoService,
  ) {
    this.salaService.getSalas().subscribe(salas => this.salas = salas.map(sala => sala.designacao));
    this.elevadorService.getElevadores().subscribe(elevadores => this.elevadores = elevadores.map(elevador => elevador.numeroIdentificativo));
    this.corredorService.getPassagens().subscribe(corredores => this.corredores = corredores.map(corredor => corredor.designacao));
    this.selectedType = "Sala";
    this.selectedType2 = "Sala";
  }

  getOptions(): string[] {
    if (this.selectedType === 'Sala') {
      return this.salas;
    } else if (this.selectedType === 'Elevador') {
      return this.elevadores;
    } else if (this.selectedType === 'Corredor') {
      return this.corredores;
    } else {
      return [];
    }
  }

  getOptions2(): string[] {
    if (this.selectedType2 === 'Sala') {
      return this.salas;
    } else if (this.selectedType2 === 'Elevador') {
      return this.elevadores;
    } else if (this.selectedType2 === 'Corredor') {
      return this.corredores;
    } else {
      return [];
    }
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  calcularCaminho() {
    let errorOrSuccess: any = this.mapaPisoService.calcularCaminho(this.caminhoEntrePisos);
    errorOrSuccess.subscribe(
      (data: SolucaoCaminho) => {
        this.resultMessage = [
          "" + data.props.caminhoEntrePisos,
          "" + data.props.caminhoPorPiso
        ];
        // alert("Caminho entre pisos: " + data.caminhoEntrePisos + "\nCaminho por piso: " + data.caminhoPorPiso);
      },

      (error: any) => {
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}