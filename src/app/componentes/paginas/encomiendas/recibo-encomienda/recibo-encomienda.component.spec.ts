import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciboEncomiendaComponent } from './recibo-encomienda.component';

describe('ReciboEncomiendaComponent', () => {
  let component: ReciboEncomiendaComponent;
  let fixture: ComponentFixture<ReciboEncomiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReciboEncomiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReciboEncomiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
