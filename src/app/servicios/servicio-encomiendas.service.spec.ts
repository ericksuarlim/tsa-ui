import { TestBed } from '@angular/core/testing';

import { ServicioEncomiendasService } from './servicio-encomiendas.service';

describe('ServicioEncomiendasService', () => {
  let service: ServicioEncomiendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioEncomiendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
