import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCodigoReservaComponent } from './modal-codigo-reserva.component';

describe('ModalCodigoReservaComponent', () => {
  let component: ModalCodigoReservaComponent;
  let fixture: ComponentFixture<ModalCodigoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCodigoReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCodigoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
