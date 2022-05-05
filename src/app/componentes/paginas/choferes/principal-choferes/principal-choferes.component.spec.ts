import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalChoferesComponent } from './principal-choferes.component';

describe('PrincipalChoferesComponent', () => {
  let component: PrincipalChoferesComponent;
  let fixture: ComponentFixture<PrincipalChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalChoferesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
