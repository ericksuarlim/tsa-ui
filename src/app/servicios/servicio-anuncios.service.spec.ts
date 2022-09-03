import { TestBed } from '@angular/core/testing';

import { ServicioAnunciosService } from './servicio-anuncios.service';

describe('ServicioAnunciosService', () => {
  let service: ServicioAnunciosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAnunciosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
