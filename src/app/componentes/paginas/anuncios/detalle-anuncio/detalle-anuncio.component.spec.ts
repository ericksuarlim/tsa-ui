import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAnuncioComponent } from './detalle-anuncio.component';

describe('DetalleAnuncioComponent', () => {
  let component: DetalleAnuncioComponent;
  let fixture: ComponentFixture<DetalleAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
