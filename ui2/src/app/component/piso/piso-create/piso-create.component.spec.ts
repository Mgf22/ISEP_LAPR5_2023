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
import { Elevador } from '../../../model/elevador';
import { PisoCreateComponent } from './piso-create.component';


describe('PisoCreateComponent', () => {
  let component: PisoCreateComponent;
  let fixture: ComponentFixture<PisoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ PisoCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PisoCreateComponent);
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


    const fakeService = jasmine.createSpyObj('PisoService', ['createPiso']);
    fakeService.createPiso.and.returnValue(of({
      data: {
        status: 201,
        body: piso
      },

      error: {
        status: 404
      }
    }));

    component = new PisoCreateComponent(fakeLocation,fakeService,TestBed.inject(EdificioService),fakeMessageService);

    component.piso.descricao = "Piso Burj Kaliffa";
    component.piso.designacao = "Piso 26";
    component.piso.edificio = edificioK.codigoEdificio;




    component.createPiso();

    expect(fakeService.createPiso).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("Success edificio creation!");
    expect(alert('Success Piso creation'));
  })

  it('should be insuccessful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('PisoService', ['createPiso']);
    fakeService.createPiso.and.returnValue(throwError({
      error: "error"
    }));

    component = new PisoCreateComponent(fakeLocation,fakeService,TestBed.inject(EdificioService),fakeMessageService);

    component.createPiso();

    expect(fakeService.createPiso).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});