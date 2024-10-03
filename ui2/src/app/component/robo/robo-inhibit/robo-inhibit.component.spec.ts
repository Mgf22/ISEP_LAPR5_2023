import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoboInhibitComponent } from './robo-inhibit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';


describe('RoboInhibitComponent', () => {
  let component: RoboInhibitComponent;
  let fixture: ComponentFixture<RoboInhibitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule, MatToolbarModule, MatFormFieldModule, ReactiveFormsModule, MatSelectModule, BrowserAnimationsModule],
      declarations: [ RoboInhibitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoboInhibitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});