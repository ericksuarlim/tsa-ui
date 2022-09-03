import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalAnunciosComponent } from './principal-anuncios.component';

describe('PrincipalAnunciosComponent', () => {
  let component: PrincipalAnunciosComponent;
  let fixture: ComponentFixture<PrincipalAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
