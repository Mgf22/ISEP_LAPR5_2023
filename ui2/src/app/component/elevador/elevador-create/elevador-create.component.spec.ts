import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { Edificio } from '../../../model/edificio';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { CodigoEdificio } from '../../../../../../src/domain/codigoEdificio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Piso } from '../../../model/piso';
import { MapaPiso } from '../../../model/mapaPiso';
import { PisoService } from '../../../service/piso/piso.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElevadorCreateComponent } from './elevador-create.component';
import { Elevador } from '../../../model/elevador';


describe('ElevadorCreateComponent', () => {
  let component: ElevadorCreateComponent;
  let fixture: ComponentFixture<ElevadorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ ElevadorCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevadorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let edificioK: Edificio = {
      codigoEdificio : "K",
      dimensaoMaximaPiso : "[200, 200]",
      descricaoEdificio : "Edificio de Magia",
      nomeOpcionalEdificio : "Edificio Julio de Matos"
    }

    let piso : Piso = {
      designacao : "Piso 26",
      descricao : "Piso Burj Kaliffa",
      edificio : edificioK.codigoEdificio,
    }

    let elevador : Elevador = {
        numeroIdentificativo : "122994",
        descricao : "Elevador Bombastico",
        numeroSerie : "24433",
        modelo : "Orona Elevador 3000",
        marca : "Orona",
        pisosServidos : [piso.designacao],
        edificio : edificioK.codigoEdificio
    }

    const fakeService = jasmine.createSpyObj('ElevadorService', ['createElevador']);
    fakeService.createElevador.and.returnValue(of({
      data: {
        status: 201,
        body: elevador
      },

      error: {
        status: 404
      }
    }));

    component = new ElevadorCreateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),TestBed.inject(EdificioService),fakeMessageService);

    component.elevador.numeroIdentificativo = "122994";
    component.elevador.descricao = "Elevador Bombastico";
    component.elevador.modelo = "Orona Elevador 3000";
    component.elevador.marca = "Orona";
    component.elevador.pisosServidos = [piso.designacao];
    component.elevador.edificio = edificioK.codigoEdificio;




    component.createElevador();

    expect(fakeService.createElevador).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("Success edificio creation!");
    expect(alert('Success Elevador creation'));
  })

  it('should be insuccessful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('ElevadorService', ['createElevador']);
    fakeService.createElevador.and.returnValue(throwError({
      error: "error"
    }));

    component = new ElevadorCreateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),TestBed.inject(EdificioService),fakeMessageService);

    component.createElevador();

    expect(fakeService.createElevador).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});