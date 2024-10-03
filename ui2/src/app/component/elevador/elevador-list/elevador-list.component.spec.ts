import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ElevadorListComponent } from './elevador-list.component';
import { ElevadorService } from '../../../service/elevador/elevador.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Elevador } from '../../../model/elevador';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';

describe('ElevadorListComponent', () => {
  let component: ElevadorListComponent;
  let fixture: ComponentFixture<ElevadorListComponent>;
  const spy = jasmine.createSpyObj('ElevadorService', ['listElevadoresEdificio']);
  
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
      declarations: [ ElevadorListComponent ],
        providers: [
        { provide: ElevadorService, useValue: spy },
      ],
    })
    .compileComponents();


    fixture = TestBed.createComponent(ElevadorListComponent);
    component = fixture.componentInstance;
    component.codigoEdificio = 'A'; 
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list elevadores', () => {
    const elevadorService = TestBed.inject(ElevadorService);
    const mockELevadores: Elevador[] = [
      {
        descricao: 'Elevador passageiros',
        numeroSerie: '34830294',
        marca: 'Otis',
        modelo: 'Alabama',
        pisosServidos: ['A1', 'A2'],
        numeroIdentificativo: '310',
        edificio: 'B',
      },
    ];
    spy.listElevadoresEdificio.and.returnValue(of(mockELevadores));

    component.listElevadores();

    expect(component.dataSource.data).toEqual(mockELevadores);
  });
});