import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpcionesViajesComponent } from './modal-opciones-viajes.component';

describe('ModalOpcionesViajesComponent', () => {
  let component: ModalOpcionesViajesComponent;
  let fixture: ComponentFixture<ModalOpcionesViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpcionesViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpcionesViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
