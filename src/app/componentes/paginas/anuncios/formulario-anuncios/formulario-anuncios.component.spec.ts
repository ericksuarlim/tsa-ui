import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAnunciosComponent } from './formulario-anuncios.component';

describe('FormularioAnunciosComponent', () => {
  let component: FormularioAnunciosComponent;
  let fixture: ComponentFixture<FormularioAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
