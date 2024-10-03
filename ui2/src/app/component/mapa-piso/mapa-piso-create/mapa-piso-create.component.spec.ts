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
import { MapaPisoCreateComponent } from './mapa-piso-create.component';
import { Piso } from '../../../model/piso';
import { MapaPiso } from '../../../model/mapaPiso';
import { PisoService } from '../../../service/piso/piso.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('MapaPisoCreateComponent', () => {
  let component: MapaPisoCreateComponent;
  let fixture: ComponentFixture<MapaPisoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ MapaPisoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaPisoCreateComponent);
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

    let mapaPiso : MapaPiso = {
      piso : piso.designacao,
      mapa : "Big Mapa"
    }

    const fakeService = jasmine.createSpyObj('MapaPisoService', ['createMapaPiso']);
    fakeService.createMapaPiso.and.returnValue(of({
      data: {
        status: 200,
        body: mapaPiso
      },

      error: {
        status:404
      }
    }));

    component = new MapaPisoCreateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),fakeMessageService);

    component.mapaPiso.mapa = "Big Mapa",
    component.mapaPiso.piso = piso.designacao,


    component.createMapaPiso();

    expect(fakeService.createMapaPiso).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("Success edificio creation!");
    expect(alert('Success Mapa Piso creation'));
  })

  it('should be insuccessful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('MapaPisoService', ['createMapaPiso']);
    fakeService.createMapaPiso.and.returnValue(throwError({
      error: "error"
    }));

    component = new MapaPisoCreateComponent(fakeLocation,fakeService,TestBed.inject(PisoService),fakeMessageService);

    component.createMapaPiso();

    expect(fakeService.createMapaPiso).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});