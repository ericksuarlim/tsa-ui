import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpcionesAdministradorComponent } from './modal-opciones-administrador.component';

describe('ModalOpcionesAdministradorComponent', () => {
  let component: ModalOpcionesAdministradorComponent;
  let fixture: ComponentFixture<ModalOpcionesAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpcionesAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpcionesAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
