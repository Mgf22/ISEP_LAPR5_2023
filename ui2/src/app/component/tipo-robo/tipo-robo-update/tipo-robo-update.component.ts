import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { TipoRoboService } from '../../../service/tipoRobo/tipoRobo.service';
@Component({
  selector: 'app-tipo-robo-update',
  templateUrl: './tipo-robo-update.component.html',
  styleUrls: ['./tipo-robo-update.component.css']
})
export class TipoRoboUpdateComponent implements OnInit {

  tipoRobo = {designacao: "", marca: "", modelo: "",  tarefas:[]}

  constructor(
    private location: Location,
    private TipoRoboService: TipoRoboService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updateTipoRobo() {
    let errorOrSuccess: any = this.TipoRoboService.updateTipoRobo(this.tipoRobo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Tipo Robo update!");
        this.finalMessage = "Success Tipo Robo update!";
        this.location.back();
      },

      (error: any) => {
        //error
        this.messageService.add(error.error);
        this.finalMessage = error.error;
      }
    );

    return errorOrSuccess;
  }

  goBack(): void {
    this.location.back();
  }
}