import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { RoboService } from '../../../service/robo/robo.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-robo-update',
  templateUrl: './robo-update.component.html',
  styleUrls: ['./robo-update.component.css']
})
export class RoboUpdateComponent implements OnInit {

  robo = {estado: "", marca: "", codigo: "",  numeroSerie:"", nickname: "", tipoRobo: ""}

  constructor(
    private location: Location,
    private RoboService: RoboService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updateRobo() {
    let errorOrSuccess: any = this.RoboService.updateRobo(this.robo);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Robo update!");
        this.finalMessage = "Success Robo update!";
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