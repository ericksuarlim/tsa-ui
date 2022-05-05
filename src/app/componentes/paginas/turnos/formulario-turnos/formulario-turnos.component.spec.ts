import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTurnosComponent } from './formulario-turnos.component';

describe('FormularioTurnosComponent', () => {
  let component: FormularioTurnosComponent;
  let fixture: ComponentFixture<FormularioTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
