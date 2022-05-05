import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioChoferesComponent } from './formulario-choferes.component';

describe('FormularioChoferesComponent', () => {
  let component: FormularioChoferesComponent;
  let fixture: ComponentFixture<FormularioChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioChoferesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
