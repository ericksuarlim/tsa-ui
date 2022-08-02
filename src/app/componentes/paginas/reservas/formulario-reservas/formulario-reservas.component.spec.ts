import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioReservasComponent } from './formulario-reservas.component';

describe('FormularioReservasComponent', () => {
  let component: FormularioReservasComponent;
  let fixture: ComponentFixture<FormularioReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
