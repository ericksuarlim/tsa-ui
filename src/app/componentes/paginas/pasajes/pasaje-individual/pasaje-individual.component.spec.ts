import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajeIndividualComponent } from './pasaje-individual.component';

describe('PasajeIndividualComponent', () => {
  let component: PasajeIndividualComponent;
  let fixture: ComponentFixture<PasajeIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajeIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajeIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
