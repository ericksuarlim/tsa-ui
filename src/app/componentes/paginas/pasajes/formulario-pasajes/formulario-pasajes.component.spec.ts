import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPasajesComponent } from './formulario-pasajes.component';

describe('FormularioPasajesComponent', () => {
  let component: FormularioPasajesComponent;
  let fixture: ComponentFixture<FormularioPasajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioPasajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioPasajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
