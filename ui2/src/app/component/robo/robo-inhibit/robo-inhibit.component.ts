import { Component, OnInit, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { RoboService } from '../../../service/robo/robo.service';
import { MessageService } from '../../../service/message/message.service';

@Component({
  selector: 'app-robo-inhibit',
  templateUrl: './robo-inhibit.component.html',
  styleUrls: ['./robo-inhibit.component.css']
})
export class RoboInhibitComponent implements OnInit {
  robos: string[] = [];
  constructor(private roboService: RoboService, private location: Location, private messageService: MessageService) {
    this.roboService.getRobo().subscribe(robos => this.robos = robos.map(robo => robo.codigo));
  }

  ngOnInit(): void {
  }

  codigo: string = '';
  @Output() finalMessage: string = '';

  inhibitRobo() {
    let errorOrSuccess: any = this.roboService.inhibitRobo(this.codigo);

    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        alert("Success Robo inhibition!");
      },

      (error: any) => {
        //error
        alert(error.error);
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}