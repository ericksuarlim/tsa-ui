import { TestBed } from '@angular/core/testing';

import { ServicioAutenticacionService } from './servicio-autenticacion.service';

describe('ServicioAutenticacionService', () => {
  let service: ServicioAutenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioAutenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
