import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalReservasComponent } from './principal-reservas.component';

describe('PrincipalReservasComponent', () => {
  let component: PrincipalReservasComponent;
  let fixture: ComponentFixture<PrincipalReservasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalReservasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
