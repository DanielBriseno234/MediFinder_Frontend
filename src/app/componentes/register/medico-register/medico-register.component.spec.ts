import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoRegisterComponent } from './medico-register.component';

describe('MedicoRegisterComponent', () => {
  let component: MedicoRegisterComponent;
  let fixture: ComponentFixture<MedicoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicoRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
