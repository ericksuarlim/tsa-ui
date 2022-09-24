import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioSindicatoComponent } from './formulario-sindicato.component';

describe('FormularioSindicatoComponent', () => {
  let component: FormularioSindicatoComponent;
  let fixture: ComponentFixture<FormularioSindicatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioSindicatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioSindicatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
