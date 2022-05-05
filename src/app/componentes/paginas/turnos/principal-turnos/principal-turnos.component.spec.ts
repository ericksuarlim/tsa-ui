import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalTurnosComponent } from './principal-turnos.component';

describe('PrincipalTurnosComponent', () => {
  let component: PrincipalTurnosComponent;
  let fixture: ComponentFixture<PrincipalTurnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalTurnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalTurnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
