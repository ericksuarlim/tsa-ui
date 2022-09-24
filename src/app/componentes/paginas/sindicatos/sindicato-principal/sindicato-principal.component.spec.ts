import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SindicatoPrincipalComponent } from './sindicato-principal.component';

describe('SindicatoPrincipalComponent', () => {
  let component: SindicatoPrincipalComponent;
  let fixture: ComponentFixture<SindicatoPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SindicatoPrincipalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SindicatoPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
