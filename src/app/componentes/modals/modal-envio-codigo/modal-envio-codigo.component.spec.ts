import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEnvioCodigoComponent } from './modal-envio-codigo.component';

describe('ModalEnvioCodigoComponent', () => {
  let component: ModalEnvioCodigoComponent;
  let fixture: ComponentFixture<ModalEnvioCodigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEnvioCodigoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEnvioCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
