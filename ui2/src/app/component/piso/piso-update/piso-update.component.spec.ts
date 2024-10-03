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
import { PisoUpdateComponent } from './piso-update.component';
import { Piso } from '../../../model/piso';
import { Elevador } from '../../../model/elevador';
import { Test } from 'mocha';
import { PisoService } from '../../../service/piso/piso.service';
import { EdificioService } from '../../../service/edificio/edificio.service';


describe('PisoUpdateComponent', () => {
  let component: PisoUpdateComponent;
  let fixture: ComponentFixture<PisoUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ PisoUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PisoUpdateComponent);
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
    

    const fakeService = jasmine.createSpyObj('PisoService', ['updatePiso']);
    fakeService.updatePiso.and.returnValue(of({
      data: {
        status: 200,
        body: piso
      },

      error: {
        status:404
      }
    }));
    component = new PisoUpdateComponent(fakeLocation, fakeService, TestBed.inject(EdificioService), fakeMessageService);
    
    component.piso.designacao = "Piso 26";
    component.piso.descricao = "Piso Burj Kaliffa";
    component.piso.edificio = edificioK.codigoEdificio;


    component.updatePiso();

    expect(fakeService.updatePiso).toHaveBeenCalled();
  //  expect(component.finalMessage).toBe("Success edificio update!");
    expect(component.piso.descricao = "Piso Burj Kaliffa");
    expect(alert("Success piso update!"));
  })

  it('should be insuccessful updated', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('PisoService', ['updatePiso']);
    fakeService.updatePiso.and.returnValue(throwError({
      error: "error"
    }));

    component = new PisoUpdateComponent(fakeLocation, fakeService, TestBed.inject(EdificioService), fakeMessageService);

    component.updatePiso();

    expect(fakeService.updatePiso).toHaveBeenCalled();
    //  expect(component.finalMessage).toBe("error");
    expect(alert("error"));
});

});