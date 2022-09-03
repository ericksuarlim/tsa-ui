import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEncomiendaComponent } from './detalle-encomienda.component';

describe('DetalleEncomiendaComponent', () => {
  let component: DetalleEncomiendaComponent;
  let fixture: ComponentFixture<DetalleEncomiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleEncomiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
