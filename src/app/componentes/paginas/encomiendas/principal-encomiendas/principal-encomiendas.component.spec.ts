import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalEncomiendasComponent } from './principal-encomiendas.component';

describe('PrincipalEncomiendasComponent', () => {
  let component: PrincipalEncomiendasComponent;
  let fixture: ComponentFixture<PrincipalEncomiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalEncomiendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalEncomiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
