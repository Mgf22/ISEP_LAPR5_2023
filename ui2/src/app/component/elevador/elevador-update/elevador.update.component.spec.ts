import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { Edificio } from '../../../model/edificio';
import { MessageService } from '../../../service/message/message.service';
import { CodigoEdificio } from '../../../../../../src/domain/codigoEdificio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { ElevadorUpdateComponent } from './elevador-update.component';
import { Piso } from '../../../model/piso';
import { Elevador } from '../../../model/elevador';
import { Test } from 'mocha';
import { PisoService } from '../../../service/piso/piso.service';


describe('ElevadorUpdateComponent', () => {
  let component: ElevadorUpdateComponent;
  let fixture: ComponentFixture<ElevadorUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ ElevadorUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElevadorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful updated', () => {
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
    

    const fakeService = jasmine.createSpyObj('EdificioService', ['updateElevador']);
    fakeService.updateElevador.and.returnValue(of({
      data: {
        status: 200,
        body: elevador
      },

      error: {
        status:404
      }
    }));
    

    component = new ElevadorUpdateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),TestBed.inject(EdificioService),fakeMessageService);

    component.elevador.numeroIdentificativo = "122994";
    component.elevador.descricao = "Elevador Silencioso";
    component.elevador.modelo = "Orona Elevador 0101";
    component.elevador.marca = "Orona";
    component.elevador.pisosServidos = [piso.designacao];
    component.elevador.edificio = edificioK.codigoEdificio;


    component.updateElevador();

    expect(fakeService.updateElevador).toHaveBeenCalled();
  //  expect(component.finalMessage).toBe("Success edificio update!");
    expect(component.elevador.descricao = "Elevador Silencioso");
    expect(alert("Success elevador update!"));
  })

  it('should be insuccessful updated', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('EdificioService', ['updateElevador']);
    fakeService.updateElevador.and.returnValue(throwError({
      error: "error"
    }));

    component = new ElevadorUpdateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),TestBed.inject(EdificioService),fakeMessageService);

    component.updateElevador();

    expect(fakeService.updateElevador).toHaveBeenCalled();
  //  expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});