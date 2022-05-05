import { TestBed } from '@angular/core/testing';

import { ServicioConductoresService } from './servicio-conductores.service';

describe('ServicioConductoresService', () => {
  let service: ServicioConductoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioConductoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
