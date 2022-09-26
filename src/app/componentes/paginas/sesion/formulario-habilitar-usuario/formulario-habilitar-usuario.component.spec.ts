import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHabilitarUsuarioComponent } from './formulario-habilitar-usuario.component';

describe('FormularioHabilitarUsuarioComponent', () => {
  let component: FormularioHabilitarUsuarioComponent;
  let fixture: ComponentFixture<FormularioHabilitarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioHabilitarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioHabilitarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
