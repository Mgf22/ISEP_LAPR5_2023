import { LiveAnnouncer } from '@angular/cdk/a11y';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Edificio } from '../../../model/edificio';
import { RoboListComponent } from './robo-list.component';
import { of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { EdificioService } from '../../../service/edificio/edificio.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoboService } from '../../../service/robo/robo.service';
import { Robo } from '../../../model/robo';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

describe('RoboListComponent', () => {
  let component: RoboListComponent;
  let fixture: ComponentFixture<RoboListComponent>;

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
      declarations: [ RoboListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list robos', () => {
    const roboService = TestBed.inject(RoboService);
    
    const mockRobo: Robo[] = [{
      marca: 'samsung',
      codigo: '2039',
      numeroSerie: '2039-1zy0',
      nickname: "O guna",
      tipoRobo: "Roborock NSX"
    }];
  
    spyOn(roboService, 'getRobo').and.returnValue(of(mockRobo));
    
    component.ngOnInit();
    
    expect(component.dataSource.data).toEqual(mockRobo);
  })
});