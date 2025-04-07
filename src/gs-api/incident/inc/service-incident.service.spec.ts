import { TestBed } from '@angular/core/testing';

import { ServiceIncidentService } from './service-incident.service';

describe('ServiceIncidentService', () => {
  let service: ServiceIncidentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceIncidentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
