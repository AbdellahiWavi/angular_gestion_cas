import { TestBed } from '@angular/core/testing';

import { OrgExterneService } from './org-externe.service';

describe('OrgExterneService', () => {
  let service: OrgExterneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgExterneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
