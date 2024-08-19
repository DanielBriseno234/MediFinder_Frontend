import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorLoginComponent } from './administrador-login.component';

describe('AdministradorLoginComponent', () => {
  let component: AdministradorLoginComponent;
  let fixture: ComponentFixture<AdministradorLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradorLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdministradorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
