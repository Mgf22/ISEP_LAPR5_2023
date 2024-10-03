import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { MapaPisoService } from '../../../service/mapaPiso/mapaPiso.service';
@Component({
  selector: 'app-mapa-piso-update',
  templateUrl: './mapa-piso-update.component.html',
  styleUrls: ['./mapa-piso-update.component.css']
})
export class MapaPisoUpdateComponent implements OnInit {

  mapaPiso = {piso : "", mapa : JSON}

  constructor(
    private location: Location,
    private MapaPisoService: MapaPisoService,
    private messageService: MessageService
  ) { }


  @Output() finalMessage: string ='';


  ngOnInit(): void {
  }

  updateMapaPiso() {
    let errorOrSuccess: any = null;//this.MapaPisoService.updateMapaPiso(this.mapaPiso);
    errorOrSuccess.subscribe(
      (data: any) => {
        //success
        this.messageService.add("Success Mapa Piso update!");
        this.finalMessage = "Success Mapa Piso update!";
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