import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasajesPrincipalComponent } from './pasajes-principal.component';

describe('PasajesPrincipalComponent', () => {
  let component: PasajesPrincipalComponent;
  let fixture: ComponentFixture<PasajesPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasajesPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasajesPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
