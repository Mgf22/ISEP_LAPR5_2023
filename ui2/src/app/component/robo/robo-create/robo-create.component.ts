import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { RoboService } from '../../../service/robo/robo.service';
import { MessageService } from '../../../service/message/message.service';
import { TipoRoboService } from '../../../service/tipoRobo/tipoRobo.service';
@Component({
  selector: 'app-robo-create',
  templateUrl: './robo-create.component.html',
  styleUrls: ['./robo-create.component.css']
})
export class RoboCreateComponent implements OnInit {

  robo = { marca: "", codigo: "", numeroSerie: "", nickname: "", tipoRobo: "" }
  tipoRobos: string[] = [];
  constructor(
    private location: Location,
    private RoboService: RoboService,
    private tipoRoboService: TipoRoboService,
    private messageService: MessageService
  ) {
    this.tipoRoboService.getTipoRobo().subscribe(tipoRobos => this.tipoRobos = tipoRobos.map(tipoRobo => tipoRobo.designacao));
  }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  createRobo() {
    let errorOrSuccess: any = this.RoboService.createRobo(this.robo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success Robo creation!");
      },

      (error: any) => {
        //error
        console.error(error.error);
        alert(error.error);
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}