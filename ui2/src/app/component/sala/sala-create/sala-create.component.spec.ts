/*import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { of, throwError } from 'rxjs';
import { EdificioCreateComponent } from './edificio-create.component';
import { Edificio } from '../../../model/edificio';
import { MessageService } from '../../../service/message/message.service';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { CodigoEdificio } from '../../../../../../src/domain/codigoEdificio';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';


describe('EdificioCreateComponent', () => {
  let component: EdificioCreateComponent;
  let fixture: ComponentFixture<EdificioCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule],
      declarations: [ EdificioCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let edificio: Edificio = {
      codigoEdificio : "K",
      dimensaoMaximaPiso : "[200, 200]",
      descricaoEdificio : "Edificio de Magia",
      nomeOpcionalEdificio : "Edificio Julio de Matos"
    }

    const fakeService = jasmine.createSpyObj('EdificioService', ['createEdificio']);
    fakeService.createEdificio.and.returnValue(of({
      data: {
        status: 200,
        body: edificio
      },

      error: {
        status:404
      }
    }));

    component = new EdificioCreateComponent(fakeLocation,fakeService,fakeMessageService);

    component.edificio.codigoEdificio = "K",
    component.edificio.dimensaoMaximaPiso = "[200,200]",
    component.edificio.descricaoEdificio = "Edificio de Magia",
    component.edificio.nomeOpcionalEdificio = "Edificio Julio de Matos";


    component.createEdificio();

    expect(fakeService.createEdificio).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("Success edificio creation!");
    expect(alert('Success edificio creation'));
  })

  it('should be insuccessful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('EdificioService', ['createEdificio']);
    fakeService.createEdificio.and.returnValue(throwError({
      error: "error"
    }));

    component = new EdificioCreateComponent(fakeLocation,fakeService,fakeMessageService);

    component.createEdificio();

    expect(fakeService.createEdificio).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});*/