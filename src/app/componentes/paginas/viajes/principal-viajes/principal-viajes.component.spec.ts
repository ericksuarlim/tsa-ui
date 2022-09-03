import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalViajesComponent } from './principal-viajes.component';

describe('PrincipalViajesComponent', () => {
  let component: PrincipalViajesComponent;
  let fixture: ComponentFixture<PrincipalViajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalViajesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalViajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
