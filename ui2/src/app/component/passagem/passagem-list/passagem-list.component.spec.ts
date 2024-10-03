import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Edificio } from '../../../model/edificio';
import { PassagemListComponent } from './passagem-list.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Passagem } from '../../../model/passagem';
import { PassagemService } from '../../../service/passagem/passagem.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

describe('PassagemListComponent', () => {
  let component: PassagemListComponent;
  let fixture: ComponentFixture<PassagemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[[HttpClientTestingModule,
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
        MatInputModule,],],
      declarations: [ PassagemListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassagemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list passagens', () => {
    const passagemService = TestBed.inject(PassagemService);
    const mockPassagens: Passagem[] = [{
      designacao: 'A1_B1',
      edificioA: 'A',
      edificioB: 'B',
      pisoA: 'A1',
      pisoB: 'B1'
    }];
  
    spyOn(passagemService, 'getPassagens').and.returnValue(of(mockPassagens));
    
    component.listPassagens();
    
    expect(component.dataSource.data).toEqual(mockPassagens);
  })
});