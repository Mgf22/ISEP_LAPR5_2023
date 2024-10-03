import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Edificio } from '../../../model/edificio';
import { EdificioListComponent } from './edificio-list.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EdificioListComponent', () => {
  let component: EdificioListComponent;
  let fixture: ComponentFixture<EdificioListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],],
      declarations: [ EdificioListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdificioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list edificios', () => {
    const edificioService = TestBed.inject(EdificioService);
    const mockEdificios: Edificio[] = [{
      codigoEdificio: 'K',
      dimensaoMaximaPiso: '[200,200]',
      descricaoEdificio: 'Edificio de Magia',
      nomeOpcionalEdificio: 'Edificio Julio de Matos'
    }];
  
    spyOn(edificioService, 'getEdificios').and.returnValue(of(mockEdificios));
    
    component.listEdificios();
    
    expect(component.dataSource.data).toEqual(mockEdificios);
  })
});