import { TestBed } from '@angular/core/testing';

import { WithRoleService } from './with-role.service';

describe('WithRoleService', () => {
  let service: WithRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WithRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
