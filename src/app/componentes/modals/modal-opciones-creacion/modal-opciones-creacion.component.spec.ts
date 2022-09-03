import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOpcionesCreacionComponent } from './modal-opciones-creacion.component';

describe('ModalOpcionesCreacionComponent', () => {
  let component: ModalOpcionesCreacionComponent;
  let fixture: ComponentFixture<ModalOpcionesCreacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalOpcionesCreacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOpcionesCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
