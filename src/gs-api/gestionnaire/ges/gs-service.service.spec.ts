import { TestBed } from '@angular/core/testing';

import { GsServiceService } from './gs-service.service';

describe('GsServiceService', () => {
  let service: GsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
