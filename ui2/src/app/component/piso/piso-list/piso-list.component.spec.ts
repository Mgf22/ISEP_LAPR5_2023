import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { PisoListComponent } from './piso-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { PisoService } from '../../../service/piso/piso.service';
import { Piso } from '../../../model/piso';

describe('PisoListComponent', () => {
  let component: PisoListComponent;
  let fixture: ComponentFixture<PisoListComponent>;
  const spy = jasmine.createSpyObj('PisoService', ['listPisos']);
  
  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule,
        FormsModule,
        MatToolbarModule,
        MatInputModule,
        MatFormFieldModule, 
        ReactiveFormsModule, 
        MatSelectModule,
        BrowserAnimationsModule,
        MatPaginatorModule, 
        MatTableModule,
        MatSortModule,
        MatInputModule,
      ],
      declarations: [ PisoListComponent ],
        providers: [
        { provide: PisoService, useValue: spy },
      ],
    })
    .compileComponents();


    fixture = TestBed.createComponent(PisoListComponent);
    component = fixture.componentInstance;
    component.codigoEdificio = 'A'; 
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list pisos', () => {
    const pisoService = TestBed.inject(PisoService);
    const mockPisos: Piso[] = [
      {
        descricao: 'Elevador passageiros',
        designacao: 'B1',
        edificio: 'B',
      },
    ];
    spy.listPisos.and.returnValue(of(mockPisos));

    component.listPisos();

    expect(component.dataSource.data).toEqual(mockPisos);
  });
});