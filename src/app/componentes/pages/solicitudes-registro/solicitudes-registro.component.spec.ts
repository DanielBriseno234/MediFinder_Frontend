import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesRegistroComponent } from './solicitudes-registro.component';

describe('SolicitudesRegistroComponent', () => {
  let component: SolicitudesRegistroComponent;
  let fixture: ComponentFixture<SolicitudesRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudesRegistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudesRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
