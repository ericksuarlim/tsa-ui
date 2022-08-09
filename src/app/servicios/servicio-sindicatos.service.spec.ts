import { TestBed } from '@angular/core/testing';

import { ServicioSindicatosService } from './servicio-sindicatos.service';

describe('ServicioSindicatosService', () => {
  let service: ServicioSindicatosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioSindicatosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
