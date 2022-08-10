import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpcionesReservasComponent } from './modal-opciones-reservas.component';

describe('ModalOpcionesReservasComponent', () => {
  let component: ModalOpcionesReservasComponent;
  let fixture: ComponentFixture<ModalOpcionesReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpcionesReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpcionesReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
