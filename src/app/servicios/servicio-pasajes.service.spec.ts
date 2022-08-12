import { TestBed } from '@angular/core/testing';

import { ServicioPasajesService } from './servicio-pasajes.service';

describe('ServicioPasajesService', () => {
  let service: ServicioPasajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPasajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
