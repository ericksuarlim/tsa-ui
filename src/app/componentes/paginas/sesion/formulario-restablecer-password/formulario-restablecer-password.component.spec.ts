import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRestablecerPasswordComponent } from './formulario-restablecer-password.component';

describe('FormularioRestablecerPasswordComponent', () => {
  let component: FormularioRestablecerPasswordComponent;
  let fixture: ComponentFixture<FormularioRestablecerPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRestablecerPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioRestablecerPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
