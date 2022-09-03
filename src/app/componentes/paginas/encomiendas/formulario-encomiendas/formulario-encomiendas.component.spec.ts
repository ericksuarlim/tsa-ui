import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEncomiendasComponent } from './formulario-encomiendas.component';

describe('FormularioEncomiendasComponent', () => {
  let component: FormularioEncomiendasComponent;
  let fixture: ComponentFixture<FormularioEncomiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioEncomiendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioEncomiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
