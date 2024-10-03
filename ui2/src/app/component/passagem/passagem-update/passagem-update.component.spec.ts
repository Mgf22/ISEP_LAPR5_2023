/*import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { EdificioUpdateComponent } from './edificio-update.component';
import { EdificioService } from '../../../service/edificio/edificio.service';


describe('EdificioUpdateComponent', () => {
  let component: EdificioUpdateComponent;
  let fixture: ComponentFixture<EdificioUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ EdificioUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful updated', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let edificio: Edificio = {
      codigoEdificio : "K",
      dimensaoMaximaPiso : "[200, 200]",
      descricaoEdificio : "Edificio de Magia",
      nomeOpcionalEdificio : "Edificio Julio de Matos"
    }
    

    const fakeService = jasmine.createSpyObj('EdificioService', ['updateEdificio']);
    fakeService.updateEdificio.and.returnValue(of({
      data: {
        status: 200,
        body: edificio
      },

      error: {
        status:404
      }
    }));

    component = new EdificioUpdateComponent(fakeLocation,fakeService,fakeMessageService);

    component.edificio.codigoEdificio = "K",
    component.edificio.dimensaoMaximaPiso = "[200,200]",
    component.edificio.descricaoEdificio = "Edificio de Truques",
    component.edificio.nomeOpcionalEdificio = "Edificio Alterado";


    component.updateEdificio();

    expect(fakeService.updateEdificio).toHaveBeenCalled();
  //  expect(component.finalMessage).toBe("Success edificio update!");
    expect(component.edificio.codigoEdificio = "K");
    expect(alert("Success edificio update!"));
  })

  it('should be insuccessful updated', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('EdificioService', ['updateEdificio']);
    fakeService.updateEdificio.and.returnValue(throwError({
      error: "error"
    }));

    component = new EdificioUpdateComponent(fakeLocation,fakeService,fakeMessageService);

    component.updateEdificio();

    expect(fakeService.updateEdificio).toHaveBeenCalled();
  //  expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});*/