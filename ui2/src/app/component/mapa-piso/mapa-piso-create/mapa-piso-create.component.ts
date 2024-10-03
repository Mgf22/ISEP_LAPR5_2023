import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from '../../../service/message/message.service';
import { MapaPisoService } from '../../../service/mapaPiso/mapaPiso.service';
import { PisoService } from '../../../service/piso/piso.service';
@Component({
  selector: 'app-mapa-piso-create',
  templateUrl: './mapa-piso-create.component.html',
  styleUrls: ['./mapa-piso-create.component.css']
})
export class MapaPisoCreateComponent implements OnInit {

  mapaPiso = {piso : "", mapa : JSON}
  pisos: string[] = [];

  constructor(
    private location: Location,
    private MapaPisoService: MapaPisoService,
    private pisoService: PisoService,
    private messageService: MessageService,
  ) { this.pisoService.listPisosGeral().subscribe(pisos => this.pisos = pisos.map(piso => piso.designacao)); }


  @Output() finalMessage: string = '';


  ngOnInit(): void {
  }

  @ViewChild('fileInput') fileInput: any;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  
    if (file) {
      this.readFile(file);
    }
  }
  
  openFileExplorer(): void {
    this.fileInput.nativeElement.click();
  }
  
  private readFile(file: File): void {
    const reader: FileReader = new FileReader();
  
    reader.onload = (e: any) => {
      const fileContent: string = e.target.result;
      // Handle the file content (e.g., parse JSON)
      console.log(fileContent);
      // Assuming you want to assign it to the 'mapa' variable
      this.mapaPiso.mapa = JSON.parse(fileContent);
    };
  
    reader.readAsText(file);
  }

  
  createMapaPiso() {
      let errorOrSuccess: any = null;//this.MapaPisoService.createMapaPiso();
      errorOrSuccess.subscribe(
        (data: any) => {
          alert("Success Mapa Piso creation!");
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