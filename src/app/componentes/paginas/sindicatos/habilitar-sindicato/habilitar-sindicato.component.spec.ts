import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarSindicatoComponent } from './habilitar-sindicato.component';

describe('HabilitarSindicatoComponent', () => {
  let component: HabilitarSindicatoComponent;
  let fixture: ComponentFixture<HabilitarSindicatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitarSindicatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarSindicatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
