import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosSindicatosComponent } from './servicios-sindicatos.component';

describe('ServiciosSindicatosComponent', () => {
  let component: ServiciosSindicatosComponent;
  let fixture: ComponentFixture<ServiciosSindicatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiciosSindicatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosSindicatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
