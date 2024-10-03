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
import { RoboUpdateComponent } from './robo-update.component';
import { Piso } from '../../../model/piso';
import { Elevador } from '../../../model/elevador';
import { Test } from 'mocha';
import { PisoService } from '../../../service/piso/piso.service';
import { TipoRobo } from '../../../model/tipoRobo';
import { Robo } from '../../../model/robo';
import { RoboCreateComponent } from '../robo-create/robo-create.component';
import { TipoRoboService } from '../../../service/tipoRobo/tipoRobo.service';


describe('RoboUpdateComponent', () => {
  let component: RoboUpdateComponent;
  let fixture: ComponentFixture<RoboUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ RoboUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be successful updated', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    let tipoRobo : TipoRobo = {
        tarefas : ["limpeza"],
        designacao : "designacao",
        marca : "marca",
        modelo : "modelo",
    }

    let robo : Robo = {
        nickname : "nickname",
        marca : "marcola",
        numeroSerie : "12214",
        codigo : "XCV",
        tipoRobo : tipoRobo.designacao
	}

    const fakeService = jasmine.createSpyObj('RoboService', ['updateRobo']);
    fakeService.updateRobo.and.returnValue(of({
      data: {
        status: 200,
        body: robo
      },

      error: {
        status:404
      }
    }));
    

    component = new RoboUpdateComponent(fakeLocation,fakeService,fakeMessageService);

    component.robo.codigo = "XCV",
    component.robo.tipoRobo = tipoRobo.designacao,
    component.robo.numeroSerie = "12214" ,
    component.robo.marca = "marcola";
    component.robo.nickname = "nickname";


    component.updateRobo();

	expect(fakeService.updateRobo).toHaveBeenCalled();
	// expect(component.finalMessage).toBe("Success edificio creation!");
	 expect(alert('Success Robo update!'));
  })

  it('should be insuccessful created', () => {
    let fakeLocation = TestBed.inject(Location);
    let fakeMessageService = TestBed.inject(MessageService);

    const fakeService = jasmine.createSpyObj('RoboService', ['updateRobo']);
    fakeService.updateRobo.and.returnValue(throwError({
      error: "error"
    }));

    component = new RoboUpdateComponent(fakeLocation,fakeService,fakeMessageService);

    component.updateRobo();

    expect(fakeService.updateRobo).toHaveBeenCalled();
   // expect(component.finalMessage).toBe("error");
    expect(alert("error"));
  })

});